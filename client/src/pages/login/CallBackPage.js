import React from 'react';
import { useHistory } from 'react-router';
import { getToken } from '../../utils/fetch';

import LoadingCircle from '../../components/common/LoadingCircle';
import * as colors from '../../constants/colors';

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

  getToken(tokenObject).then(response => {
    if (response.isSuccess) {
      history.push({
        pathname: '/host/room/select',
      });
    } else {
      history.push({
        pathname: loginPageUrl,
      });
    }
  });

  return <LoadingCircle color={colors.PRIMARY_DEEP_GREEN} />;
}

export default LoginPage;
