import { Component } from 'react';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

var extendStatics = function(d, b) {
  extendStatics =
    Object.setPrototypeOf ||
    ({ __proto__: [] } instanceof Array &&
      function(d, b) {
        d.__proto__ = b;
      }) ||
    function(d, b) {
      for (const p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };
  return extendStatics(d, b);
};

function __extends(d, b) {
  extendStatics(d, b);
  function __() {
    this.constructor = d;
  }
  d.prototype =
    b === null ? Object.create(b) : ((__.prototype = b.prototype), new __());
}

const NAVER_ID_SDK_URL =
  'https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.0.js';
/**
 * 이 함수는 브라우저 환경에서만 호출이 되야 한다. window 객체에 직접 접근한다.
 * @param props
 */
const initLoginButton = function(props) {
  if (!('browser' in process)) {
    return;
  }
  const { clientId } = props;
  const { callbackUrl } = props;
  const { onSuccess } = props;
  const { onFailure } = props;
  const { location } = { ...window };
  const { naver } = window;
  const naverLogin = new naver.LoginWithNaverId({
    callbackUrl,
    clientId,
    isPopup: false,
    loginButton: { color: 'green', type: 3, height: 60 },
  });
  naverLogin.init();
  if (!window.opener) {
    naver.successCallback = function(data) {
      return onSuccess(data);
    };
    naver.FailureCallback = onFailure;
  } else {
    naverLogin.getLoginStatus(function(status) {
      if (!status || location.hash.indexOf('#access_token') === -1) {
        return;
      }
      window.opener.naver.successCallback(naverLogin.user);
      window.close();
      // clearInterval(initLoop);
    });
  }
};
const appendNaverButton = function() {
  if (document && document.querySelectorAll('#naverIdLogin').length === 0) {
    const naverId = document.createElement('div');
    naverId.id = 'naverIdLogin';
    naverId.style.position = 'absolute';
    naverId.style.top = '-10000px';
    document.body.appendChild(naverId);
  }
};
const loadScript = function(props) {
  if (document && document.querySelectorAll('#naver-login-sdk').length === 0) {
    const script = document.createElement('script');
    script.id = 'naver-login-sdk';
    script.src = NAVER_ID_SDK_URL;
    script.onload = function() {
      return initLoginButton(props);
    };
    document.head.appendChild(script);
  }
};
const LoginNaver = /** @class */ (function(_super) {
  __extends(LoginNaver, _super);
  function LoginNaver() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  LoginNaver.prototype.componentDidMount = function() {
    if (!('browser' in process)) {
      return;
    }
    // 네이버 로그인 버튼을 먼저 붙인 후 스크립트 로드하고 초기화를 해야 한다.
    appendNaverButton();
    loadScript(this.props);
  };
  LoginNaver.prototype.render = function() {
    const { render } = this.props;
    return render({
      onClick() {
        if (!document || !document.querySelector('#naverIdLogin').firstChild)
          return;
        const naverLoginButton = document.querySelector('#naverIdLogin')
          .firstChild;
        naverLoginButton.click();
      },
    });
  };
  return LoginNaver;
})(Component);

export default LoginNaver;
