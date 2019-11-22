# Week 3 review 요청

## 파일 설명

```sh
code 폴더 구조
|-- NaverLogin.js
|-- apiAddresses.js
|-- apis
|   `-- login.js
`-- images
    |-- naverLoginButton.PNG
    `-- naverLoginButton_long.PNG
```

NaverLogin.js : 네이버 로그인 버튼 컴포넌트
apiAddresses.js : 사용하는 API 주소를 한꺼번에 관리하는 상수
login.js : 네이버 아이디로 로그인 후 받아온 access token으로 프로필 조회 API를 호출, jwt로 생성 후 쿠키에 설정해주는 API

naverLoginButton.PNG : 네이버에서 제공한 로그인 버튼 이미지
naverLoginButton_long.PNG : 로그인 버튼 background-image로 사용되는 이미지

## 코드 리뷰 요청 내용

### request로 프로필 API 조회 후 작업 진행을 위핸 Promise 사용 - login.js

request.get으로 프로필 정보를 받아온 다음 이후 작업을 실행해야 하는데,
request.get이 비동기적으로 실행되어 Promise로 감싸 동기처리 시켰습니다.

이 부분을 처리하는데 더 좋은 방법이 있는지 궁금합니다.

### 네이버 로그인 버튼 (이미지파일)으로 버튼 만들기 - NaverLogin.js

네이버 로그인 버튼을 이미지로 가져와 사용하고 있습니다.
현재 button 태그 안에 background-image로 설정하는 방법을 사용하고 있습니다.

네이버에서 제공하는 데모는 img 태그를 이용해서 버튼을 설정하던데,
이렇게 디자인 가이드라인을 준수해야 하는 버튼의 경우 어떻게 처리하는지 궁금합니다.

### 요청 URL 상수로 관리 - apiAddresses.js

개발중에 URL이 빈번하게 바뀔 수 있어 (특히 API 호출시)
이 부분을 따로 constant로 빼서 관리하고 있습니다.

현재 조금 난잡하다는 생각이 드는데, 이 부분을 관리하는 좋은 방법이 있을까요?
