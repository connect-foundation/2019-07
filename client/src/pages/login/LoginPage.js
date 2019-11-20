import React from 'react';
import styled from 'styled-components';
import NaverLogin from '../../utils/naverLoginSdk';
import loginImage from '../../assets/images/login.PNG';

const ButtonNoStyle = styled.button`
  width: 8rem;
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
    <div className="App">
      <NaverLogin
        clientId="UuzGjP3W5wERxwznlaYv"
        callbackUrl={callbackUrl}
        render={(props) => (
          <ButtonNoStyle onClick={props.onClick} type="button">
            <img src={loginImage} height="60" />
          </ButtonNoStyle>
        )}
        onSuccess={(result) => console.log(result)}
        onFailure={(result) => console.error(result)}
      />
    </div>
  );
}

export default LoginPage;
