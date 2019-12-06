import React, { useCallback, useState, useContext, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';
import emptyImage from '../../assets/images/emptyImage.png';
import * as colors from '../../constants/colors';
import { EditContext } from './EditContextProvider';

const Container = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90%;
  height: 90%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 2px dashed black;
`;

const UploadGuide = styled.span`
  position: absolute;
  text-align: center;
  font-size: 10vmin;
`;

const EmptyImage = styled.img.attrs({
  src: emptyImage,
})`
  width: 10vmin;
  height: 10vmin;
`;

const DropHereContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  z-index: 2;
`;

const DropHereBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: ${colors.PRIMARY_DEEP_GREEN};
  opacity: 0.8;
`;

const DropHereText = styled.span`
  position: absolute;
  z-index: 3;
  font-size: 5vw;
  font-weight: bold;
  color: white;
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

function ImageField() {
  const { quizsetState, dispatch, actionTypes } = useContext(EditContext);
  const { quizset, currentIndex } = quizsetState;
  const [file, setFile] = useState(undefined);

  useEffect(() => {
    setFile(quizset[currentIndex].image);
  }, [currentIndex]);

  const onDrop = useCallback(acceptedFiles => {
    try {
      const image = URL.createObjectURL(acceptedFiles[0]);
      dispatch({ type: actionTypes.CHANGE_IMAGE, image });
      setFile(image);
    } catch (error) {
      //error
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'image/*',
    onDrop,
  });

  return (
    <Container {...getRootProps()}>
      <UploadGuide>
        <EmptyImage />
      </UploadGuide>
      {<input {...getInputProps()} />}

      {file && <UploadedImage url={file}></UploadedImage>}
      {isDragActive && (
        <DropHereContainer>
          <DropHereBackground />
          <DropHereText>Drop Here</DropHereText>
        </DropHereContainer>
      )}
    </Container>
  );
}

export default ImageField;
