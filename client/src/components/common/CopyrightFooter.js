import React from 'react';
import styled from 'styled-components';

const FOOTER_MARGIN_BOTTOM = '1.5rem';

const FooterStyle = styled.footer`
  justify-self: flex-end;
  flex: 0 0 auto;
  font-size: 2vmin;
  margin-bottom: ${FOOTER_MARGIN_BOTTOM};
`;

const Contact = styled.a.attrs({
  href: 'https://github.com/connect-foundation/2019-07',
  target: '_blank',
})`
  ::before {
    content: '👉 ';
  }

  text-decoration: none;
  &:visited,
  &:link {
    color: black;
  }
`;

function Footer() {
  return (
    <FooterStyle>
      <div>
        <span>Create your own pickyforky for FREE</span>
      </div>
      <div>
        <Contact>Contact Us!</Contact>
      </div>
    </FooterStyle>
  );
}

export default Footer;
