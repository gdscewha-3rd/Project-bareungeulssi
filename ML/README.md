이 폴더는 알바트로스 팀원 중 한명인 고주은이 개발하였습니다.

## 딥러닝 기반 글씨 검사 기능을 탑재한 태블릿 PC용 글씨 연습 어플 '바른 글씨'

## 딥러닝

## 📌 음절 영역 추출 - CRAFT

: CRAFT(Character Region Awareness for Text Detection)를 사용하여 줄 글씨 이미지에서 한글 음절 영역 추출

clovaai에서 제공하는 General 모델 사용

<img width="385" alt="스크린샷 2022-05-25 오후 7 25 29" src="https://user-images.githubusercontent.com/86579242/170241632-cba313c7-a96a-4173-87d1-1525f90e9251.png">

## 📌 음소 영역 추출 - FPN

### Dataset

<img width="422" alt="image" src="https://user-images.githubusercontent.com/86579242/170242914-d4b87fdc-a952-4333-9a3f-053c91b0ad9b.png">

음소 단위로 라벨링된 한글 음절 이미지 57,979장 생성

(1) 모음 모양, 받침 유무 등에 따른 케이스 분류 후 자음, 모음, 받침 요소 이미지 및 마스크 생성

(2) 이미지 처리 후 요소 이미지를 조합하여 음절 이미지 생성

### Segmentation
<img width="561" alt="image" src="https://user-images.githubusercontent.com/86579242/170247493-61d99e35-2479-4140-915e-985e0fc50c65.png">


- 한글 음절에서 자음, 모음, 받침 3개의 클래스 분류
- 정확도: mdice 0.9645
- 훈련결과:

<img width="716" alt="image" src="https://user-images.githubusercontent.com/86579242/170244167-9bf1cb01-a6fd-42ff-9410-f621e9919aef.png">

- 손글씨에 대한 예측 결과:

<img width="474" alt="image" src="https://user-images.githubusercontent.com/86579242/170242447-73592908-595a-4b8a-b47f-de91783ed65f.png">


- 학습코드: [깃허브](https://github.com/0ju-un/pytorch-fpn-segmentation) 참조


## 📌  Code

### requirements

- bentoml 0.13.1
- PyTorch ≥ 0.2.1, torchvision ≥ 0.5.0
- opencv-python 4.5.6

### layout
<img width="806" alt="image" src="https://user-images.githubusercontent.com/86579242/170248467-7feab6ca-3fbd-4b9c-93d7-29f903e81fc4.png">


### sample

모델 패킹 및 저장

```python
python3 main.py
```

모델 서빙

```python
bentoml serve-gunicorn $(bentoml get HangeulDetector:latest --print-location --quiet) --port=5000 --disable-microbatch --timeout=200
```

## 📌 Reference

- CRAFT: [paper](https://arxiv.org/abs/1904.01941) | [repo](https://github.com/clovaai/CRAFT-pytorch)
- segmentation: [repo](https://github.com/qubvel/segmentation_models.pytorch)
- bentoml: [docs](https://docs.bentoml.org/en/v0.13.1/) | [gallery](https://github.com/bentoml/gallery)
