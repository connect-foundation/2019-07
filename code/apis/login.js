const express = require("express");
const jwt = require("jsonwebtoken");
const request = require("request");

require("dotenv").config();

const router = express.Router();

const jwtObj = {};
jwtObj.secret = process.env.JWT_SECRET;

/**
 * @api {post} /login/setJWT 네이버 프로필 조회 후 쿠키에 jwt로 설정하는 API.
 * @apiName setJWT
 * @apiGroup Login
 *
 * @apiParam {string} access_token 네이버 로그인 후 제공한 적근 토큰
 */
router.post("/setJWT", async (req, res) => {
  const accessToken = req.body.data.access_token;
  const header = `Bearer ${accessToken}`; // Bearer 다음에 공백을 추가해야함
  const apiUrl = "https://openapi.naver.com/v1/nid/me";

  const options = {
    url: apiUrl,
    headers: { Authorization: header }
  };
  let profileObject;
  let getNidSuccess = false;
  let errorCode = "unknown";

  /**
   * request.get으로 프로필 정보를 받아온 다음
   * 이후 작업을 실행해야 하는데,
   * request.get이 비동기적으로 실행되어 Promise로 감싸 동기처리 시켰습니다.
   *
   * 이 부분을 처리하는데 더 좋은 방법이 있는지 궁금합니다.
   */
  await new Promise(resolve => {
    request.get(options, async (error, response, body) => {
      if (error || response.statusCode !== 200) {
        getNidSuccess = false;

        if (response != null) {
          errorCode = `${response.statusCode}`;
        }

        resolve();
        return;
      }

      const profile = JSON.parse(body);

      profileObject = profile.response;
      getNidSuccess = true;
      resolve();
    });
  });

  if (!getNidSuccess) {
    res.json({
      isError: true,
      isSuccess: false,
      message: `네이버 프로필 API를 호출할 수 없습니다. 에러코드 : ${errorCode}`
    });
    return;
  }

  /**
   * 여기서 프로필 조회 API에서 받아온 정보를 DB에 저장해야함.
   */

  /**
   * 프로필객체 예시
   * profileObject : {
   *   "email": "openapi@naver.com",
   *   "nickname": "OpenAPI",
   *   "profile_image": "https://ssl.pstatic.net/static/pwe/address/nodata_33x33.gif",
   *   "age": "40-49",
   *   "gender": "F",
   *   "id": "32742776",
   *   "name": "오픈 API",
   *   "birthday": "10-01"
   * }
   */

  const token = jwt.sign(
    {
      email: profileObject.email,
      name: profileObject.name
    },
    jwtObj.secret,
    {
      expiresIn: "1h"
    }
  );

  res.cookie("jwt", token);
  res.json({
    isSuccess: true
  });
});

module.exports = router;
