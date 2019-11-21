import React from 'react';
import PropTypes from 'prop-types';
import { fetchToken } from '../../utils/fetch';
import * as address from '../../constants/apiAddresses';

const { roomListUrl } = address;
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

function LoginPage({ history }) {
  const { hash } = window.location;

  const tokenObject = splitHash(hash);

  fetchToken(tokenObject).then(response => {
    if (response.isSuccess) {
      history.push({
        pathname: roomListUrl,
      });
    } else {
      history.push({
        pathname: loginPageUrl,
      });
    }
  });

  return <></>;
}

LoginPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    location: PropTypes.shape({
      state: PropTypes.shape({
        roomNumber: PropTypes.string.isRequired,
      }),
    }),
  }).isRequired,
};

export default LoginPage;
