import argparse

from service import HangeulDetector
from service import CraftMain
from service import SegmentationMain


import torch

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument("--cuda", default=False, help='enable CUDA')
    parser.add_argument("--craft_model", default="./craft_mlt_25k.pth", help='text detection model path')
    parser.add_argument("--seg_model", default="./seg_model.pth", help='segmentation model path')

    args = parser.parse_args()

    device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")
    print(f'device: {device}')

    craft = CraftMain()
    seg = SegmentationMain()

    # load model
    craft_model = craft.load_model(args.craft_model, device)
    segmentation_model = seg.load_model(args.seg_model, device)

    detector_service = HangeulDetector()
    detector_service.pack('craft_model', craft_model)
    detector_service.pack('fpn_model', segmentation_model)


    saved_path = detector_service.save()

