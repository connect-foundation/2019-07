import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import NaverLogin from '../../utils/naverLoginSdk';
import loginImage from '../../assets/images/naverLoginButton_long.PNG';
import * as address from '../../constants/apiAddresses';

const { callbackPageFullUrl } = address;
const { roomListUrl } = address;
const clientId = 'UuzGjP3W5wERxwznlaYv';

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

function checkValidToken(cookie) {
  const [key] = cookie.split('=');

  if (key === 'jwt') {
    return true;
  }
  return false;
}

function LoginPage({ history }) {
  const { cookie } = document;

  if (checkValidToken(cookie)) {
    history.push({
      pathname: roomListUrl,
    });
  }

  return (
    <NaverLogin
      clientId={clientId}
      callbackUrl={callbackPageFullUrl}
      render={props => <NoStyleButton onClick={props.onClick} type="button" />}
    />
  );
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
  onClick: PropTypes.func.isRequired,
};

export default LoginPage;
