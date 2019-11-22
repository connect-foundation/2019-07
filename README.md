# Week 3 review 요청

리뷰 요청합니다!

### client side directory tree

<details>

<summary>디렉토리 트리</summary>

```
client
├── README.md
├── dev.env
├── package-lock.json
├── package.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── static-logo.png
├── src
│   ├── App.js
│   ├── Router.js
│   ├── assets
│   │   └── images
│   │       ├── checkMark.png
│   │       ├── naverLoginButton.PNG
│   │       └── naverLoginButton_long.PNG
│   ├── components
│   │   ├── common
│   │   │   ├── Buttons.js
│   │   │   ├── CopyrightFooter.js
│   │   │   ├── FlexibleInput.js
│   │   │   ├── Header.js
│   │   │   └── ToastProvider.js
│   │   ├── detailRoom
│   │   │   ├── RoomInformation.js
│   │   │   └── TabContents.js
│   │   ├── edit
│   │   │   ├── ItemCard.js *
│   │   │   ├── ScorePicker.js *
│   │   │   └── TimeLimitPicker.js *
│   │   ├── inGame
│   │   │   ├── HostFooter.js
│   │   │   ├── PlayerFooter.js
│   │   │   └── ProgressBar.js
│   │   ├── logo
│   │   │   ├── Logo.css
│   │   │   └── Logo.js
│   │   └── mainPage
│   │       ├── EnterNickname.js
│   │       ├── EnterRoomNumber.js
│   │       └── NaverLogin.js
│   ├── constants
│   │   ├── apiAddresses.js
│   │   ├── colors.js
│   │   ├── domain.js
│   │   └── media.js
│   ├── index.css
│   ├── index.js
│   ├── pages
│   │   ├── MainPage.js
│   │   ├── host
│   │   │   ├── EditPage.js *
│   │   │   ├── HostDetailRoom.js
│   │   │   └── HostWaitingRoom.js
│   │   ├── login
│   │   │   └── CallBackPage.js
│   │   └── player
│   │       └── PlayerWaitingRoom.js
│   ├── styles
│   │   └── common.js
│   └── utils
│       ├── fetch.js
│       └── naverLoginSdk.js
└── yarn.lock
```

</details>

### 구현한 기능

- client side의 퀴즈 편집 페이지 UI 작업 60% 완료

### 실행 흐름

1. `src/pages/editPage.js`에서
2. `src/components/ItemCard.js`, `src/components/TimeLimitPicker.js`, `src/components/ScorePicker.js` 컴포넌트를 생성

### 파일 설명

- `src/pages/host/editPage.js` : 퀴즈 편집 페이지
- `src/components/edit/ItemCard.js` : 퀴즈의 n지선다 항목 아이템이 되는 n개의 컴포넌트
- `src/components/edit/TimeLimitPicker.js` : 퀴즈의 제한시간을 선택할 수 있는 컴포넌트
- `src/components/edit/ScorePicker.js` : 퀴즈의 점수를 선택할 수 있는 컴포넌트

### 질문

- UI 동작을 구현할 때 라이브러리를 많이 사용하는지, 직접 구현하는 일이 많은지 궁금합니다.
  - 현재 퀴즈 편집 페이지에서 `TimeLimitPicker`, `ScorePicker`를 바닐라로 구현해보았는데 코드가 지저분해지는 것 같아 고민입니다.
  - 애니메이션을 구현하다 보면 리액트의 state를 1px 단위로 update하는 일이 많은 듯 합니다. 이때 렌더링이 너무 많이 일어나면 성능에 영향이 클 것 같은데 어떻게 처리하는 것이 좋은지 궁금합니다.
