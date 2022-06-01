import os

from PIL import Image
import numpy as np
import cv2

from torch.autograd import Variable

import torch
from torchvision import transforms

import bentoml
from bentoml.frameworks.pytorch import PytorchModelArtifact
from bentoml.adapters import FileInput

import utils

##
from collections import OrderedDict
from craft_model import CRAFT
import segmentation_models_pytorch as smp


trans = transforms.Compose([
  transforms.ToTensor(),
  transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225]) # imagenet
])

# root_dir = ('./out')
# out_dir = os.path.join(root_dir,'test')

device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")

@bentoml.env(requirements_txt_file="./requirements.txt")
@bentoml.artifacts([PytorchModelArtifact('craft_model'), PytorchModelArtifact('fpn_model')])
class HangeulDetector(bentoml.BentoService):

    @bentoml.api(input=FileInput())
    def predict(self, img):
        file = {}
        # print(f'fs {image_array}')
        image=Image.open(img).convert('RGB')
        image = np.array(image)
        # print(f'image w h: {w} {h} numpy: {image.shape[0]} {image.shape[1]}')
        # preprocessing
        height = (image.shape[0]) // 12
        images = []  # 줄 단위 이미지
        border = 5
        for i in range(0, 10, 3):
            usr = image[height * (i+2) + border : height * (i + 3) - border, :].copy()
            images.append(usr)

        # 음절 분리
        syllable_boxes = {}
        character_boxes = {}
        num = 1
        # print('start')
        for k, img in enumerate(images):
            img_ = img.copy()  # bbox 확인용
            image = utils.imgproc(img)  # resize image and nomalization
            x = torch.from_numpy(image).permute(2, 0, 1)  # [h, w, c] to [c, h, w]
            x = Variable(x.unsqueeze(0))
            x = x.to(device)
            pred, feature = self.artifacts.craft_model(x)
            # print(f'text detection done')
            score_text = pred[0, :, :, 0].cpu().data.numpy()
            det = utils.getDetBoxes(score_text)

            cropped_img = []
            bbox = []
            color = [(0, 255, 0), (0, 0, 255)]  # bbox 확인용
            # print(f'음절 개수: {len(det)}')
            # print(f'det 개수: {len(det)}')
            if len(det) == 0:
                syllable_boxes[k] = []
                character_boxes[k] = []
                continue
            for i in range(len(det) - 1):
                # print(f'det {i}')
                x, y, w, h, cy = det[i]
                x_next = det[i + 1][0]
                if (x + w) > x_next: w -= (x + w - x_next) // 2
                det[i][2] = w
                size = max(w, height)
                crop, b = utils.crop_img(img, size, width=w, height=height, x=x)
                if not b:
                    continue
                bbox.append(b)
                cropped_img.append(crop)
            if len(det) >= 2:
                x, y, w, h, cy = det[-1]
                size = max(w, height)
                crop, b = utils.crop_img(img, size, width=w, height=height, x=x)
                if b:
                    cropped_img.append(crop)
                    bbox.append(b)

            # draw rectangle
            for i, box in enumerate(bbox):
                x, y, w, h, cy = box
                cv2.rectangle(img_, (x, y), (x + w, y + h), color[i % 2], 2)  # bbox 확인용

            syllables_img = np.array(cropped_img)
            syllable_boxes[k] = bbox

            # cv2.imwrite(os.path.join('./bbox', f'img_{k}.png'), img_)

            # 음소 분리
            syllables = np.where(syllables_img < 170, 1, 0).astype(np.float32)  # threshold = 200
            character_in_line = []
            for idx, syllable in enumerate(syllables):
                img_ = cropped_img[idx].copy()
                x = trans(syllable)
                x = Variable(x.unsqueeze(0))
                X = x.to(device)
                y = self.artifacts.fpn_model(X)
                y = torch.sigmoid(y)
                seg = y[0].cpu().data.numpy()

                # print(f'seg{seg.shape}')
                seg_result = utils.masks_to_colorimg(seg)  # 확인용
                bbox = utils.getDetBoxes_from_seg(syllable, seg)
                colors = [(255, 0, 0), (0, 0, 255), (0, 255, 0)]
                character_in_line.append(bbox)
                # 보정 후 - concat
                syllable_ = syllable.copy() * 255
                for i, box in enumerate(bbox):
                    x, y, w, h = box
                    cv2.rectangle(seg_result, (x, y), (x + w, y + h), colors[i], 4)  # bbox 확인용
                    cv2.rectangle(img_, (x, y), (x + w, y + h), colors[i], 4)  # bbox 확인용

                # cv2.imwrite(os.path.join('./bbox',f'seg{str(num)}.png'),seg_result)
                # cv2.imwrite(os.path.join('./bbox',f'crop{str(num)}.png'),img_)

                num += 1
            # print(f'segmentation done')
            character_boxes[k] = character_in_line

        file['syllable'] = syllable_boxes
        file['character'] = character_boxes

        return file

class CraftMain():
    def __init__(self):
        self.model = CRAFT(pretrained=True) # initialize

    def load_model(self, checkpoint, device='cpu'):
        self.model = self.model.to(device)
        if device == torch.device('cpu') :
            self.model.load_state_dict(self.copyStateDict(torch.load(checkpoint, map_location=torch.device('cpu') )))
        else:
            self.model.load_state_dict(self.copyStateDict(torch.load(checkpoint)))

        return self.model

    def copyStateDict(self,state_dict):
        if list(state_dict.keys())[0].startswith("module"):
            start_idx = 1
        else:
            start_idx = 0
        new_state_dict = OrderedDict()
        for k, v in state_dict.items():
            name = ".".join(k.split(".")[start_idx:])
            new_state_dict[name] = v
        return new_state_dict

class SegmentationMain():
    def __init__(self):
        self.model = smp.FPN(encoder_name="resnext50_32x4d", classes=3)

    def load_model(self, checkpoint, device='cpu'):
        self.model = self.model.to(device)
        if device==torch.device('cpu') :
            state = torch.load(checkpoint, map_location=torch.device('cpu'))
        else:
            state = torch.load(checkpoint)

        self.model.load_state_dict(state['model_state_dict'])

        return self.model