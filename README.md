# 딥러닝 기반 글씨 검사 기능을 탑재한 태블릿 PC용 글씨 연습 어플, 바른 글씨

### 📁 디렉토리 소개
- Backend : 앱의 서버 
- Frontend : 앱의 프론트
- ML : 앱 내 딥러닝 기술 

### :movie_camera: 시연영상 링크(Youtube)
알바트로스-바른글씨 UI 프로토타입 링크: https://youtu.be/PXyZEEkt-OQ  
알바트로스-바른글씨 시연영상 링크: https://youtu.be/vZpOjUITChw    
알바트로스-포스터세션 발표영상 링크: https://youtu.be/TbxrhyyXWp4     
알바트로스-한국정보처리학회 2022 ASK 참여-논문 게재 및 학술발표대회 참여: https://youtu.be/5G6AKJ6-9jo 

## 프로젝트 소개

### :pushpin: 프로젝트의 필요성 & 목적
태블릿 PC 보급이 활성화되면서 모바일 필기를 하는 인구가 증가하고 있습니다.
종이에 하는 필기와 태블릿에 하는 필기는 펜의 형태, 종이와 전자기기의 차이 등 여러모로 차이점이 존재합니다.  
하지만 현재 어플 시장에서는 모바일 필기를 위한 어플은 존재하지 않습니다.  
사용자들이 보다 예쁜 글씨, 깔끔한 모바일 필기를 하는 것을 돕기 위해서 이 프로젝트를 시작하였습니다.  


### :pushpin: 프로젝트의 타겟층
 1) 악필인 사용자
    : 악필인 사용자는 악필을 교정할 수 있습니다.
 2) 원하는 글씨체를 가지고 싶은 사용자
    : 악필이 아니더라도 예쁜 글씨체를 가지고 싶은 사용자는 자신이 원하는 글씨체를 선택해서 해당 글씨체를 학습할 수         있습니다.
 3) 한글 글씨 연습이 필요한 아동 및 학생
    : 요즘 학교에 1인 1태블릿을 보급하는 등 전자기기 보급이 증가하고 있습니다. 따라서 전자 필기 연습이 필요한 학생들에게 도움을 줄 수 있습니다. 

### 📱미리보기
<hr/>
<img src="https://user-images.githubusercontent.com/76611903/170242040-d4187334-4fe0-404b-88f9-fb7e9be8abf1.png" align="left" width="30%" height="30%"/>
<img width="30%" alt="image" src="https://user-images.githubusercontent.com/86579242/170249351-4d0513fe-ba8c-4d6b-849f-0879f405000f.png" align="left">
<img src="https://user-images.githubusercontent.com/76611903/170242713-6e49a9e9-3693-4110-8092-d811e81b5424.png"  width="30%" height="30%"/> 
<div style="margin-bottom:50px">
 </div>
 
<img src="https://user-images.githubusercontent.com/76611903/170242737-9e477887-b6d5-4c3e-8f72-bd9f0c273e70.png" align="left" width="30%" height="30%"/>
<img src="https://user-images.githubusercontent.com/76611903/170242756-06468441-2027-4108-b38a-98bc1519ec1a.png" align="left" width="30%" height="30%"/>
<img src="https://user-images.githubusercontent.com/76611903/170242836-334acdfb-d0b2-43bb-acd5-ed8eec7a972e.png" width="30%" height="30%"/> 
<hr/>



### ✏️ 제품 설명서

[지원 url](https://cactus-thorn-d3e.notion.site/58d5a8ef2eb64b5297f2bf359f643db5)

1. 메인 화면의 줄긋기 연습 버튼 / 자음모음 연습 버튼을 누르면 기초적인 연습이 가능합니다. 
2. 설정에서 사용자가 원하는 글씨체를 선택하고 메인 화면에서 작품 선택을 합니다. 그리고 문학작품을 쓸 수 있는 화면으로 이동합니다.
3. 첫 번째 칸은 검은 글씨, 두 번째 칸은 회색 글씨, 세 번째 칸은 빈칸으로 구성된 화면이 나타납니다.
4. 검은 글씨를 보고 빈칸에 글씨를 따라 쓴 후 검사하기 버튼을 누르면 사용자 글씨에 대한 검사가 진행됩니다.
5. 검사가 진행된 후 교정이 필요한 부분에 느낌표 버튼을 표시하고 오른쪽 상단에 점수를 표시합니다.
6. 다운로드 버튼을 누르면 사용자의 갤러리에 글씨 이미지를 저장할 수 있다.
7. 검사하기 버튼을 누르면 사용자의 점수, 사용자의 글씨 이미지는 자동으로 저장되므로 사용자가 본인의 진행 상황 및 발전 정도 등을 파악할 수 있습니다.


### :house_with_garden: 프로젝트 개발환경
<img width="803" alt="image" src="https://user-images.githubusercontent.com/86579242/170445659-e8d0e410-8db4-4e4a-9a09-995061054ec2.png">

프론트엔드: React Native  
딥러닝: PyTorch, OpenCV, BentoML, Docker   
백엔드: SpringBoot, MariaDB, AWS EC2, AWS S3, AWS RDS  

### 🦅 팀 알바트로스
|💛 오지은|💙 민경원|🖤 고주은|
|:------:|:------:|:------:|
|Frontend|Backend|AI|
|[@0909oje](https://github.com/0909oje)|[@mkwkw](https://github.com/mkwkw)|[@0ju-un](https://github.com/0ju-un)|


