import React, { useCallback, useState, useContext, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';

import emptyImage from '../../assets/images/emptyImage.png';
import trash from '../../assets/images/trash.png';
import * as colors from '../../constants/colors';
import { EditContext } from './EditContextProvider';

const Container = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  left: 50%;
  transform: translateX(-50%);
  box-sizing: border-box;
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
  user-select: none;
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

const DeleteButton = styled.div`
  position: absolute;
  bottom: 2vmin;
  right: 2vmin;
  width: 10vmin;
  height: 10vmin;
  background-color: white;
  border-radius: 50%;
  box-shadow: 0 2px 2px 1px gray;
  background-image: url(${trash});
  opacity: 0.5;
  background-size: 70%;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
  transition: opacity 0.2s;
  z-index: 999;

  &:hover {
    opacity: 1;
  }
`;

function ImageField() {
  const { quizsetState, dispatch, actionTypes } = useContext(EditContext);
  const { quizset, currentIndex } = quizsetState;
  const [imagePath, setImagePath] = useState(null);

  useEffect(() => {
    setImagePath(quizset[currentIndex].imagePath);
  }, [currentIndex]);

  const onDrop = useCallback(acceptedFiles => {
    try {
      const [imageFile] = acceptedFiles;
      const newImagePath = URL.createObjectURL(imageFile);
      dispatch({
        type: actionTypes.UPDATE_IMAGE,
        imagePath: newImagePath,
        imageFile,
      });
      setImagePath(newImagePath);
    } catch (error) {
      //error
    }
  }, []);

  function deleteImage() {
    dispatch({
      type: actionTypes.UPDATE_IMAGE,
      imagePath: null,
      imageFile: null,
    });
    setImagePath(null);
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'image/*',
    onDrop,
  });

  return (
    <Container {...getRootProps()}>
      <UploadGuide>
        {!imagePath && <EmptyImage />}
        <input {...getInputProps()} />
      </UploadGuide>

      {imagePath && <UploadedImage url={imagePath} />}
      {isDragActive && (
        <DropHereContainer>
          <DropHereBackground />
          <DropHereText>Drop Here</DropHereText>
        </DropHereContainer>
      )}
      {imagePath && (
        <DeleteButton
          onClick={event => {
            event.stopPropagation();
            deleteImage();
          }}
        />
      )}
    </Container>
  );
}

export default ImageField;
