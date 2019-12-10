const express = require('express');
const jwt = require('jsonwebtoken');
const rp = require('request-promise');

const dbManager = require('../../models/database/dbManager');

require('dotenv').config();

const router = express.Router();

const jwtObj = {
  secret: process.env.JWT_SECRET,
};

/**
 * @api {get} /login/token/:accessToken 네이버 프로필 조회 후 쿠키에 jwt로 설정하는 API.
 * @apiName setToken
 * @apiGroup login
 *
 * @apiParam {String} accessToken 네이버 로그인 후 제공한 접근 토큰
 */
router.get('/token/:accessToken', async (req, res) => {
  const { accessToken } = req.params;
  const header = `Bearer ${accessToken}`; // Bearer 다음에 공백을 추가해야함
  const apiUrl = 'https://openapi.naver.com/v1/nid/me';

  const options = {
    method: 'GET',
    uri: apiUrl,
    headers: {
      Authorization: header,
    },
  };
  let profileObject;
  let getProfileSuccess = false;
  let errorCode = 'unknown';

  await rp(options).then((body) => {
    /**
     * body의 형태
     * resultcode: '00',
     * message: 'success',
     * response: {
     *   id: '',
     * }
     */
    const { resultcode, message, response } = JSON.parse(body);

    if (message !== 'success') {
      getProfileSuccess = false;
      errorCode = `${resultcode}`;
      return;
    }

    profileObject = response;
    getProfileSuccess = true;
  });

  if (!getProfileSuccess) {
    res.json({
      isError: true,
      isSuccess: false,
      message: `네이버 프로필 API를 호출할 수 없습니다. 에러코드 : ${errorCode}`,
    });
    return;
  }

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

  /**
   * 최초의 사용자 로그인 시 프로필객체의 id를 저장하고,
   * 이미 저장된 사용자가 로그인 시 다음과 같은 객체를 return함
   * {
   *   isError: true,
   *   message: "Duplicate entry '프로필객체의 숫자 id' for key 'naver_id_UNIQUE'"
   * }
   */
  await dbManager.user.insertUser(profileObject);

  const token = jwt.sign(
    {
      naverId: profileObject.id,
    },
    jwtObj.secret,
    {
      expiresIn: '1h',
    },
  );

  /**
   * 쿠키에 정보 추가
   */
  res.cookie('naverId', profileObject.id, {
    maxAge: 60 * 60 * 1000, // 60분 * 60초 * 1000 ms
  });
  res.cookie('jwt', token, {
    maxAge: 60 * 60 * 1000, // 60분 * 60초 * 1000 ms
  });

  res.json({
    isSuccess: true,
  });
});

/**
 * @api {get} /login/token/check 설정된 jwt가 유효한지 검사하는 API
 * @apiName checkJWT
 * @apiGroup login
 *
 * @apiParam {String} accessToken 네이버 로그인 후 제공한 접근 토큰
 */
router.get('/check/token', async (req, res) => {
  const { cookies } = req;
  let decodedJWT;

  try {
    decodedJWT = jwt.verify(cookies.jwt, jwtObj.secret);
    res.json({
      isSuccess: true,
      naverId: decodedJWT.naverId,
    });
    return;
  } catch (error) {
    res.json({
      isSuccess: false,
      message: error.message,
    });
  }
});

module.exports = router;
