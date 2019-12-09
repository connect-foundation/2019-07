import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import NaverLogin from '../../utils/naverLoginSdk';
import loginImage from '../../assets/images/naverLoginButton_long.PNG';
import * as apiAddresses from '../../constants/apiAddresses';

const { callbackPageFullUrl } = apiAddresses;
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
      // eslint-disable-next-line react/prop-types
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
};

export default LoginPage;
