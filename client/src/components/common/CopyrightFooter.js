import React from 'react';
import styled from 'styled-components';
import { FOOTER_MARGIN_BOTTOM } from '../../constants/components/main';

const FooterStyle = styled.footer`
  justify-self: flex-end;
  flex: 0 0 auto;
  margin-bottom: ${FOOTER_MARGIN_BOTTOM};
`;

function Footer() {
  return (
    <FooterStyle>
      <div>
        <span>Create your own kahoot for FREE at kahoot.com</span>
      </div>
      <div>
        <span>Terms | Privacy</span>
      </div>
    </FooterStyle>
  );
}

export default Footer;
