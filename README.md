# Week 2 review 요청
리뷰 요청합니다!

### server side directory tree
<details>
<summary>디렉토리 트리</summary>

```
server
├── app.js
├── bin
│   └── www
├── deploy
│   └── initInMemory.js
├── models
│   ├── inMemory.js
│   └── templates.js
├── package-lock.json
├── package.json
├── public
├── routes
│   ├── api.js
│   └── apis
│       ├── room.js *
│       └── user.js *
├── socket.js
├── utils
│   └── checkJsonHasKeys.js
└── yarn.lock
```
</details>

### 구현한 기능
- server side의 방 입장, 닉네임 생성에 대한 라우팅 처리(유효성 체크) 및 응답

### 실행 흐름
1. 클라이언트에서 사용자의 방 번호 입력
2. 서버에서 방 번호 유효성 체크 및 응답
3. 클라이언트에서 사용자의 닉네임 입력
4. 서버에서 닉네임 유효성 체크 및 응답
5. 클라이언트에서 성공 응답을 받아 방 입장 요청

### 파일 설명
- inMemory.js : 게임 실행 중(열려 있는 방)에 사용될 인메모리를 다루기 위한 파일
- templates.js : 인메모리 데이터 생성을 위한 객체 템플릿 반환 메서드 파일
- room.js : api 라우터로, room에 접근하는 동작에 대한 라우팅 처리
- user.js : api 라우터로, user에 접근하는 동작에 대한 라우팅 처리

### 질문
- server side 디렉토리 구조가 더 좋은 방법이 있을까요?
- 현재 게임 실행 중(방이 열려있을 때)에만 서버의 인메모리를 사용하도록 했는데 이렇게 client side에 serving해주어야 할 데이터를 인메모리로 사용하는 것이 괜찮은가요?
  - 이런 부분도 DB에 저장해서 사용해야 하는 걸까요?
  - 서버가 꺼지면 실행 중인 게임도 의미가 없어서 일단 인메모리를 사용하는 쪽으로 선택했습니다.
- res.json 응답 양식을 `{isError, isSuccess, message, data, ...}`로 정했는데 더 많이 사용되는 방법이 있을까요?
