import styled from 'styled-components';

import * as colors from '../../constants/colors';

const VERTICAL_PADDING = '1.5vh';
const HORIZONTAL_PADDING = '1.5vw';
const BUTTON_MARGIN = '0.4rem';

const Background = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 100%;
  background-color: ${colors.BACKGROUND_DEEP_GRAY};
`;

const TitleContainer = styled.div`
  position: relative;
  flex: none;
  background-color: ${colors.BACKGROUND_LIGHT_WHITE};
  width: 100%;
  box-shadow: 0 5px 5px -4px ${colors.TEXT_GRAY};
`;

const Title = styled.div`
  font-size: 3vmin;
  font-weight: bold;
  text-align: center;
  padding: ${VERTICAL_PADDING} ${HORIZONTAL_PADDING};
  color: black;
`;

const Center = styled.div`
  position: relative;
  flex: 1.5;
`;

const Bottom = styled.div`
  position: relative;
  flex: 1;
`;

const CenterContentContainer = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  top: calc(${VERTICAL_PADDING} * 2);
  bottom: ${VERTICAL_PADDING};
  left: ${HORIZONTAL_PADDING};
  right: ${HORIZONTAL_PADDING};
`;

const NextButtonWrapper = styled.div`
  align-self: flex-start;
  div.buttonWrapper {
    position: absolute;
    right: 0;
    flex: none;
    display: inline-block;
  }
  button {
    font-size: 1.5vw;
    padding: 0.4vh 0.75vw;
  }
`;

const CenterLeftPanel = styled.div`
  display: flex;
  flex-direction: column;
  width: 15vw;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

const CenterRightPanel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 15vw;
  height: 100%;
`;

const RemainPeople = styled.span`
  font-size: 2vw;
  font-weight: bold;
  text-align: center;
  justify-self: center;
  margin: auto;
  user-select: none;

  &::before {
    content: '✍';
    font-size: 5vw;
  }
`;

const ImagePanel = styled.div`
  position: relative;
  flex: 1;
  height: 100%;
  margin: 0 2vw;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const ItemContainer = styled.div`
  position: absolute;
  top: ${VERTICAL_PADDING};
  bottom: ${VERTICAL_PADDING};
  left: ${HORIZONTAL_PADDING};
  right: ${HORIZONTAL_PADDING};
  display: flex;
  flex-wrap: wrap;
`;

const Item = styled.div`
  position: relative;
  display: flex;
  min-height: calc(50% - ${BUTTON_MARGIN} * 2);
  flex: 1 0 calc(50% - ${BUTTON_MARGIN} * 2);
  margin: ${BUTTON_MARGIN};

  div.buttonWrapper {
    flex: 1;
  }

  button {
    font-size: 2.25vmin;
    padding: 0.4vmin;
  }
`;

export {
  Background,
  TitleContainer,
  Title,
  Center,
  Bottom,
  CenterContentContainer,
  NextButtonWrapper,
  CenterLeftPanel,
  CenterRightPanel,
  RemainPeople,
  ImagePanel,
  ItemContainer,
  Item,
};
