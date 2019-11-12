import { css } from 'styled-components';
import * as colors from '../constants/colors';

const ButtonStyle = css`
  background-color: ${colors.PRIMARY_DEEP_YELLOW};
  border-radius: 0.5rem;
  border: none;
  color: ${colors.TEXT_BLACK};
  font-weight: bold;
  font-size: 2rem;
`;

const InGameFooterStyle = css`
  position: relative;
  justify-self: flex-end;
  height: 4rem;
  border-top: 1px solid ${colors.BORDER_LIGHT_GRAY};
`;

const InGameFooterTextStyle = css`
  position: absolute;
  font-size: 2rem;
  font-weight: bold;
  top: 50%;
  transform: translateY(-50%);
  vertical-align: middle;
`;

export { ButtonStyle, InGameFooterStyle, InGameFooterTextStyle };
