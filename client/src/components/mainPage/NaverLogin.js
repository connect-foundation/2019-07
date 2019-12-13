import React from 'react';
import styled from 'styled-components';

import NaverLogin from '../../utils/naverLoginSdk';
import loginImage from '../../assets/images/naverLoginButton_long.PNG';

const callbackPageFullUrl = `${process.env.REACT_APP_HOST}/callback`;
const clientId = process.env.REACT_APP_NAVER_LOGIN_API_CLIENT_ID;

const NoStyleButton = styled.button`
  background: none;
  cursor: pointer;
  color: #fff;
  border: none;
  margin: 0;
  padding: 0;

  height: 6rem;
  background-image: url(${loginImage});
  background-repeat: no-repeat;
  background-size: contain;
`;

function LoginPage() {
  return (
    <NaverLogin
      clientId={clientId}
      callbackUrl={callbackPageFullUrl}
      render={({ onClick }) => (
        <NoStyleButton type="button" onClick={onClick} />
      )}
    />
  );
}

export default LoginPage;
