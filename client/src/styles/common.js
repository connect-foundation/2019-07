import { css } from 'styled-components';
import * as colors from '../constants/colors';

const ButtonStyle = css`
  border-radius: 0.5rem;
  border: none;
  font-weight: bold;
  font-size: 2rem;
`;

const YellowButtonStyle = css`
  background-color: ${colors.PRIMARY_DEEP_YELLOW};
  color: ${colors.TEXT_BLACK};
  ${ButtonStyle}
`;

const GreenButtonStyle = css`
  background-color: ${colors.PRIMARY_DEEP_GREEN};
  color: ${colors.TEXT_WHITE};
  ${ButtonStyle}
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

const InputStyle = css`
  color: ${colors.TEXT_BLACK};
  font-size: 2rem;
  border-radius: 0.5rem;
  text-align: center;
  border: 1px solid ${colors.BORDER_DARK_GRAY};
`;

export {
  ButtonStyle,
  GreenButtonStyle,
  YellowButtonStyle,
  InGameFooterStyle,
  InGameFooterTextStyle,
  InputStyle,
};
