import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { getToken } from '../../utils/fetch';

import Loading from '../../components/common/Loading';

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
  const history = useHistory();
  const { hash } = window.location;

  const tokenObject = splitHash(hash);

  useEffect(() => {
    getToken(tokenObject).then(response => {
      if (response.isSuccess) {
        history.replace({
          pathname: '/host/room/select',
        });
      } else {
        history.push({
          pathname: loginPageUrl,
        });
      }
    });
  }, [history]);

  return (
    <Loading message="로그인 중... 이 페이지에서 벗어나지 않으면 새로고침을 시도하세요" />
  );
}

export default LoginPage;
