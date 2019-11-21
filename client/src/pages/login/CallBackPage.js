import React from 'react';
import { fetchToken } from '../../utils/fetch';

const roomListUrl = '/host/select-room';
const loginPageUrl = '/login';

function splitHash(rawHash) {
  // hash는 #access_token=....... 의 형태로 이루어 지기 때문에 앞의 # 제거
  const hash = rawHash.replace('#', '');
  const object = {};

  const hashParams = hash.split('&');

  hashParams.forEach(element => {
    const [key, value] = element.split('=');
    object[key] = value;
  });

  return object;
}

function LoginPage() {
  const { hash } = window.location;

  const tokenObject = splitHash(hash);

  fetchToken(tokenObject).then(response => {
    if (response.success) {
      window.location.href = roomListUrl;
    } else {
      window.location.href = loginPageUrl;
    }
  });

  return <></>;
}

export default LoginPage;
