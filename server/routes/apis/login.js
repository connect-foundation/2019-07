const express = require('express');
const jwt = require('jsonwebtoken');
const request = require('request');

require('dotenv').config();

const router = express.Router();

let jwtObj = {};
jwtObj.secret = 'apple';

router.post('/callback', async function(req, res) {
  const accessToken = req.body.data.access_token;
  const header = 'Bearer ' + accessToken; // Bearer 다음에 공백 추가
  const api_url = 'https://openapi.naver.com/v1/nid/me';

  const options = {
    url: api_url,
    headers: { Authorization: header },
  };
  let profileObject;
  let isSuccess = false;

  await new Promise(resolve => {
    request.get(options, async (error, response, body) => {
      if (error || response.statusCode != 200) {
        console.log('error');
        isSuccess = false;
        if (response != null) {
          console.log('error code : ' + response.statusCode);
        }
        resolve();
        return;
      }

      let profile = JSON.parse(body);

      profileObject = profile.response;
      isSuccess = true;
      resolve();
    });
  });

  if (!isSuccess) {
    res.json({
      success: false,
    });
    return;
  }

  console.log(profileObject);
  let token = jwt.sign(
    {
      email: profileObject.email,
      name: profileObject.name,
    },
    jwtObj.secret,
    {
      expiresIn: '1h',
    },
  );

  res.cookie('jwt', token);
  res.json({
    success: true,
  });
});

module.exports = router;
