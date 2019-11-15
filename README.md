# 7조 피키포키 리뷰 요청합니다

## 간단한 서비스 소개

- 소켓 통신을 사용한 실시간 퀴즈 서비스

## Client Proxy 설정 상황

- client react port는 3000번이고, server express port는 3001번입니다.
- 현재 proxy 설정은 client 디렉토리의 package.json에 다음과 같이 작성하여서 proxy 설정을 하였습니다.
  ```
  "proxy": "https://localhost:3001/"
  ```
- 이 방법 말고도 setProxy.js와 같이 파일을 새로 만들어서 proxy 설정 하는 방법이 있던데, 어떤 방법이 더 나을지 궁금합니다.

## Socket 상황

- 데모를 위해서 단일 방을 만들어서 소켓 통신을 테스트 중입니다.
- 아직 socket에 대한 기능이 별로 없지만, socket.io을 통해 방 입장을 구현했는데 socket.io에 대한 구조를 어떤 식으로 잡는 것이 보통인가요? 더 나은 방법이 있을까요?
