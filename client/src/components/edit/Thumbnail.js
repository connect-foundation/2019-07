import React, { useContext } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { EditContext } from './EditContextProvider';
import * as colors from '../../constants/colors';
import * as ingameLayout from '../inGame/Layout';
import emptyImage from '../../assets/images/emptyImage.png';

const SIDE_BAR_SIZE = '20vmin';
const PADDING = '1vmin';
const MARGIN_RIGHT = '0.5vmin';

const ThumbnailBackground = styled.div`
  position: relative;
  flex: none;

  background-color: ${props => (props.isActive ? 'cyan' : 'white')};
  width: 100%;
  height: calc(${SIDE_BAR_SIZE} / 1.5);

  @media (orientation: portrait) {
    height: 100%;
    width: calc(${SIDE_BAR_SIZE} * 1.5);
  }
`;

const PaddingArea = styled.div`
  position: absolute;
  display: flex;
  top: ${PADDING};
  bottom: ${PADDING};
  left: ${PADDING};
  right: ${PADDING};

  pointer-events: none;
`;

const Index = styled.span`
  font-size: 1.5vmin;
  font-weight: bold;
  margin-right: ${MARGIN_RIGHT};
`;

const Content = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: ${colors.BACKGROUND_DEEP_GRAY};
  border-radius: 5px;
  height: 100%;
  width: 100%;
  margin-right: ${MARGIN_RIGHT};
  overflow: hidden;
`;

const Title = styled.div`
  display: inline-block;
  width: 100%;
  font-size: 2.5vmin;
  height: 3vmin;
  font-weight: bold;
  text-align: center;
  padding: 0 0.5vmin;
  color: black;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const ImageField = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80%;
  height: 60%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  border: 1px dashed black;
  ${props => props.isEmpty && `border-width: 0`};
`;

const UploadedImage = styled.div`
  background-image: url(${props => props.url});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

function Thumbnail({ index }) {
  const { quizsetState, dispatch, actionTypes } = useContext(EditContext);
  const { quizset, currentIndex } = quizsetState;
  const { title, imagePath } = quizset[index];
  function selectQuiz() {
    dispatch({ type: actionTypes.UPDATE_CURRENT_INDEX, currentIndex: index });
  }

  return (
    <ThumbnailBackground isActive={currentIndex === index} onClick={selectQuiz}>
      <PaddingArea>
        <Index>{index + 1}</Index>
        <Content>
          <ingameLayout.Background>
            <ingameLayout.TitleContainer>
              <Title>{title}</Title>
            </ingameLayout.TitleContainer>
            <ingameLayout.Center>
              <ImageField isEmpty={imagePath !== null}>
                <UploadedImage
                  url={imagePath === null ? emptyImage : imagePath}
                />
              </ImageField>
            </ingameLayout.Center>
          </ingameLayout.Background>
        </Content>
      </PaddingArea>
    </ThumbnailBackground>
  );
}

Thumbnail.propTypes = {
  index: PropTypes.number.isRequired,
};

export default Thumbnail;
