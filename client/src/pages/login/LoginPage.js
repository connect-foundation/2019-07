import React from 'react';
import styled from 'styled-components';
import NaverLogin from '../../utils/naverLoginSdk';
import loginImage from '../../assets/images/login.PNG';
import CopyrightFooter from '../../components/common/CopyrightFooter';
import { PRIMARY_LIGHT_YELLOW } from '../../constants/colors';

const Background = styled.div`
  position: relative;
  display: flex;
  height: 100%;
  flex-direction: column;
  background-color: ${PRIMARY_LIGHT_YELLOW};
  overflow-x: hidden;
`;

const ContentSection = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1 1 0%;
  padding: 5rem 0;
  width: 100%;
`;

const ButtonNoStyle = styled.button`
  background: none;
  cursor: pointer;
  color: #fff;
  border: none;
  margin: 0px;
  padding: 0px;
`;

const callbackUrl = 'http://localhost:3000/callback';

function LoginPage() {
  return (
    <Background>
      <ContentSection>
        <MainContainer>
          <NaverLogin
            clientId="UuzGjP3W5wERxwznlaYv"
            callbackUrl={callbackUrl}
            render={props => (
              <ButtonNoStyle onClick={props.onClick} type="button">
                <img src={loginImage} height="60" />
              </ButtonNoStyle>
            )}
            onSuccess={result => console.log(result)}
            onFailure={result => console.error(result)}
          />
        </MainContainer>
        <CopyrightFooter />
      </ContentSection>
    </Background>
  );
}

export default LoginPage;
