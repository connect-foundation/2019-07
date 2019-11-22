const checkRoomNumber = "/room/checkRoomNumber";
const setNickname = "user/setNickname";
const setJWT = "login/setJWT";
const callbackPageUrl = "callback";
const currentHost = "http://localhost:3000/";
const callbackPageFullUrl = `${currentHost}${callbackPageUrl}`;
const roomListUrl = "/host/detail";

/**
 * 개발중에 URL이 빈번하게 바뀔 수 있어 (특히 API 호출시)
 * 이 부분을 따로 constant로 빼서 관리하고 있습니다.
 *
 * 현재 조금 난잡하다는 생각이 드는데, 이 부분을 관리하는 좋은 방법이 있을까요?
 */

export {
  checkRoomNumber,
  setNickname,
  setJWT,
  callbackPageUrl,
  callbackPageFullUrl,
  roomListUrl
};
