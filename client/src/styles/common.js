import { css } from 'styled-components';
import * as colors from '../constants/colors';

const InGameFooterStyle = css`
  position: relative;
  flex: none;
  justify-self: flex-end;
  height: 5vmin;
  border-top: 1px solid ${colors.BORDER_LIGHT_GRAY};
  box-sizing: border-box;
  background-color: ${colors.BACKGROUND_LIGHT_WHITE};
`;

const InGameFooterTextStyle = css`
  position: absolute;
  font-size: 2.5vmin;
  font-weight: bold;
  top: 50%;
  transform: translateY(-50%);
  vertical-align: middle;
`;

const InputStyle = css`
  color: ${colors.TEXT_BLACK};
  font-size: 2rem;
  border-radius: 0.5rem;
  text-align: center;
  border: 1px solid ${colors.BORDER_DARK_GRAY};
`;

export { InGameFooterStyle, InGameFooterTextStyle, InputStyle };
