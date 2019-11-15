# Week 2 review 요청

<details><summary> 프로젝트 구조 </summary>

### server side directory tree

```sh
server
├── app.js
├── bin
│   └── www
├── deploy
│   └── initInMemory.js
├── models
│   ├── inMemory.js *
│   └── templates.js *
├── package-lock.json
├── package.json
├── public
├── routes
│   ├── api.js
│   └── apis
│       ├── room.js *
│       └── user.js *
├── socket.js *
├── utils
│   └── checkJsonHasKeys.js *
└── yarn.lock
```

### 실행 흐름

1. 클라이언트에서 사용자의 방 번호 입력
2. 서버에서 방 번호 유효성 체크 및 응답
3. 클라이언트에서 사용자의 닉네임 입력
4. 서버에서 닉네임 유효성 체크 및 응답
5. 클라이언트에서 성공 응답을 받아 방 입장 요청
6. 소켓을 통한 방 입장

### 파일 설명

- inMemory.js : 게임 실행 중(열려 있는 방)에 사용될 인메모리를 다루기 위한 파일
- templates.js : 인메모리 데이터 생성을 위한 객체 템플릿 반환 메서드 파일
- room.js : api 라우터로, room에 접근하는 동작에 대한 라우팅 처리
- user.js : api 라우터로, user에 접근하는 동작에 대한 라우팅 처리
- checkJsonHasKeys.js : client side에서 넘어온 body에 대해 메모리 접근하기 전 safe guard
- socket.js : 방 입장 처리

</details>

## 코드 리뷰 요청 내용

### checkJsonHasKeys를 통한 safe guard

```javascript
router.post('/...', (req, res) => {
  const keys = ['roomNumber'];

  if (!checkJsonHasKeys(req.body, keys)) {
    res.json({
      isError: true,
      isSuccess: false,
      message: 'req.body에 roomNumber가 없습니다.',
    });
    return;
  }
```

현재 이런 식으로 req.body를 검사해 주고 있습니다.
이 방법이 괜찮은 방법인지 궁금합니다.

### inMemory를 이용해 데이터를 저장하는 하나의 객체를 만듬

```javascript
const inMemory = new InMemory();

module.exports = inMemory;
```

InMemory 객체를 new로 만들고 exports 해서, 간단한 데이터 저장용으로 사용하고 있습니다.

저희가 만드려는 프로젝트에서, 게임 진행시 정보는 inMemory로 관리하기 위함인데 inMemory를 사용하고 싶을 때 더 좋은 방법이 있는지 궁금합니다.
