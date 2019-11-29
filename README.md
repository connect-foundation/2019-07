# Week 4 review 요청

리뷰 요청합니다!

</details>

### 구현한 기능

- 퀴즈 편집 페이지 UI 구현

### 실행 흐름

- `src/pages/host/EditPage.js` 페이지에서 `src/components/common/Header.js`, `src/components/edit/EditBody.js` 컴포넌트 호출
- `src/components/edit/EditBody.js` -> `src/components/edit/SideBar.js`, `src/components/edit/Template.js`
- `src/components/edit/SideBar.js` -> `src/components/edit/Preview.js`
- `src/components/edit/Template.js` -> `src/components/edit/TimeLimitPicker.js`, `src/components/edit/ScorePicker.js`, `src/components/edit/ItemCard.js`

### 파일 설명

- `src/pages/host/EditPage.js` : 퀴즈 편집 페이지
- `src/components/common/Header.js` : 페이지의 헤더 컴포넌트
- `src/components/edit/EditBody.js` : 페이지의 바디 컴포넌트
  - `src/components/edit/SideBar.js` : 왼쪽 사이드바 컴포넌트
    - `src/components/edit/Preview.js` : 사이드바의 미리보기 컴포넌트
  - `src/components/edit/Template.js` : 오른쪽 퀴즈 편집 컴포넌트
    - `src/components/edit/TimeLimitPicker.js` : 퀴즈 제한 시간 설정 컴포넌트
    - `src/components/edit/ScorePicker.js` : 퀴즈 스코어 설정 컴포넌트
    - `src/components/edit/ItemCard.js` : 퀴즈의 4지선다 항목 아이템 카드 컴포넌트

### 질문

- react를 사용하는 개발자들이 통상적으로 `src/components`외에도 `src/pages`를 두던데 컴포넌트와 페이지의 구분은 무엇일까요? 이해하기로는 state를 가지면 컴포넌트로 두려고 했으나 페이지에서도 불가피하게 state를 사용할 수 밖에 없었습니다.
- 객체를 state로 사용할 때, immutable하게 update하려다 보니 렌더링이 두 번, 세 번씩 일어나는 경우가 있습니다. 객체를 state로 관리하는 팁이 있을까요?
- 현재, 서버로 전송해야 하는 `quizSet`이라는 객체 데이터 하나를 state로 두고 각 컴포넌트의 state 수정이 실시간으로 `quizSet`를 update하도록 되어 있습니다. `useEffect`와 리렌더링이 엉켜있는 느낌이고, 렌더링도 세 번, 네 번씩 일어날 때가 있는 것 같습니다. 비효율적으로 구현되어 있는지 조언부탁드리겠습니다.
- **마지막으로 이전 두 번의 코드리뷰에 감사 인사를 어떻게 드려야 할지 모르겠습니다. 리뷰 감사드립니다!!**
