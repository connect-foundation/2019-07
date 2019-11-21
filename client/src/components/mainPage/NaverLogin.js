import React from 'react';
import styled from 'styled-components';
import NaverLogin from '../../utils/naverLoginSdk';
import loginImage from '../../assets/images/naverLoginButton_long.PNG';

const ButtonNoStyle = styled.button`
  background: none;
  cursor: pointer;
  color: #fff;
  border: none;
  margin: 0px;
  padding: 0px;

  height: 6rem;
  background-image: url(${loginImage});
  background-repeat: no-repeat;
  background-size: contain;
`;

const callbackUrl = 'http://localhost:3000/callback';
const roomListUrl = '/host/select-room';
const clientId = 'UuzGjP3W5wERxwznlaYv';

function checkJWT(cookie) {
  const [key] = cookie.split('=');

  if (key === 'jwt') {
    return true;
  }
  return false;
}

function LoginPage() {
  const { cookie } = document;

  if (checkJWT(cookie)) {
    window.location.href = roomListUrl;
  }

  return (
    <NaverLogin
      clientId={clientId}
      callbackUrl={callbackUrl}
      render={props => <ButtonNoStyle onClick={props.onClick} type="button" />}
      onSuccess={result => console.log(result)}
      onFailure={result => console.error(result)}
    />
  );
}

export default LoginPage;
