import React from 'react';
import styled from 'styled-components';

import { PRIMARY_LIGHT_YELLOW } from '../constants/colors';

const Background = styled.div`
  height: 100vmin;

  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: ${PRIMARY_LIGHT_YELLOW};
`;

const GameOver = styled.div`
  font-size: 20rem;
  font-family: 'CookieRunOTF-Bold';

  @font-face {
    font-family: 'CookieRunOTF-Bold';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_twelve@1.0/CookieRunOTF-Bold00.woff')
      format('woff');
    font-weight: normal;
    font-style: normal;
  }
`;

const ErrorCode = styled.div`
  font-size: 10rem;
  font-family: 'CookieRunOTF-Bold';

  @font-face {
    font-family: 'CookieRunOTF-Bold';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_twelve@1.0/CookieRunOTF-Bold00.woff')
      format('woff');
    font-weight: normal;
    font-style: normal;
  }
`;

function ErrorPage() {
  return (
    <Background>
      <GameOver>GAME OVER</GameOver>
      <ErrorCode>Error : 404</ErrorCode>
    </Background>
  );
}

export default ErrorPage;
