import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import NaverLogin from "../../utils/naverLoginSdk";
import loginImage from "../../assets/images/naverLoginButton_long.PNG";
import * as address from "../../constants/apiAddresses";

const { callbackPageFullUrl } = address;
const { roomListUrl } = address;
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

function checkValidToken(cookie) {
  const [key] = cookie.split("=");

  if (key === "jwt") {
    return true;
  }
  return false;
}

function LoginPage({ history }) {
  const { cookie } = document;

  if (checkValidToken(cookie)) {
    history.push({
      pathname: roomListUrl
    });
  }
  /**
   * 네이버 로그인 버튼을 이미지로 가져와 사용하고 있습니다.
   * 현재 button 태그 안에 background-image로 설정하는 방법을 사용하고 있습니다.
   *
   * 네이버에서 제공하는 데모는 img 태그를 이용해서 버튼을 설정하던데,
   * 이렇게 디자인 가이드라인을 준수해야 하는 버튼의 경우
   * 보통 어떻게 처리하는지 궁금합니다.
   */
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
        roomNumber: PropTypes.string.isRequired
      })
    })
  }).isRequired
};

export default LoginPage;
