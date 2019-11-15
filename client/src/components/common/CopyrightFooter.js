import React from 'react';
import styled from 'styled-components';

const FOOTER_MARGIN_BOTTOM = '1.5rem';

const FooterStyle = styled.footer`
  justify-self: flex-end;
  flex: 0 0 auto;
  margin-bottom: ${FOOTER_MARGIN_BOTTOM};
`;

function Footer() {
  return (
    <FooterStyle>
      <div>
        <span>Create your own pickyforky for FREE</span>
      </div>
      <div>
        <span>Terms | Privacy</span>
      </div>
    </FooterStyle>
  );
}

export default Footer;
