import { css } from 'styled-components';
import * as colors from '../constants/colors';
import DESKTOP_MIN_WIDTH from '../constants/media';

const InGameFooterStyle = css`
  position: relative;
  flex: none;
  justify-self: flex-end;
  height: 10vmin;
  border-top: 1px solid ${colors.BORDER_LIGHT_GRAY};
  box-sizing: border-box;
  background-color: ${colors.BACKGROUND_LIGHT_WHITE};

  @media (min-width: ${DESKTOP_MIN_WIDTH}) {
    height: 5vmin;
  }
`;

const InGameFooterTextStyle = css`
  position: absolute;
  font-size: 5vmin;
  font-weight: bold;
  top: 50%;
  transform: translateY(-50%);
  vertical-align: middle;

  @media (min-width: ${DESKTOP_MIN_WIDTH}) {
    font-size: 2.5vmin;
  }
`;

const InputStyle = css`
  color: ${colors.TEXT_BLACK};
  font-size: 2rem;
  border-radius: 0.5rem;
  text-align: center;
  border: 1px solid ${colors.BORDER_DARK_GRAY};
`;

export { InGameFooterStyle, InGameFooterTextStyle, InputStyle };
