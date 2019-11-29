# Week 4 review 요청

## 파일 설명

```sh
code 폴더 구조
|-- PlayerGameRoom.js
|-- PlayerQuiz.js
`-- PlayerQuizLoading.js
```

PlayerGameRoom.js :
플레이어가 입장 후부터 게임이 끝날 때까지 머무르는 view(SPA)
컴포넌트들을 포함하는 최 상단의 page 입니다.

PlayerQuizLoading.js :
host가 게임 시작 버튼을 누르면 나오는 로딩창 입니다.
이 페이지에서 퀴즈 세트를 받아와 PlayerGameRoom의 state로 퀴즈 세트를 저장합니다.

## 코드 리뷰 요청 내용

### SPA 구조에 따른 게임 상태 (하위 컴포넌트 보여주는 여부) 관리

소켓의 연결이 끊어지지 않게 하기 위해 게임 진행의 경우 SPA로 제작하고 있습니다.

게임 진행 창에는

1. 대기화면
2. 로딩화면
3. 게임화면
4. 중간결과화면

으로 이루어져있고,
다른 상태로 넘어가는데 useState로 상황별 변수를 두어 넘어가고 있습니다.

앞으로 각 상황별로 state를 두기보다, 하나의 state에서
상황별로 문자열로 'waiting', 'loading', 'quiz', 'subresult' 로 상태를 변화시켜
각 화면을 설정하려고 하는데, 이 방법이 괜찮은지 궁금합니다.
