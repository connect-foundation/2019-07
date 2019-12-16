import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import * as colors from '../../constants/colors';
import DESKTOP_MIN_WIDTH from '../../constants/media';
import { fetchRoomTitle, updateRoomTitle } from '../../utils/fetch';
import Modal from '../common/Modal';
import FlexibleInput from '../common/FlexibleInput';
import { ModalContext } from '../common/ModalProvider';
import editRoomImage from '../../assets/images/edit_room.png';

const RoomInformationContainer = styled.div`
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  span {
    color: ${colors.TEXT_WHITE};
    font-weight: bold;
    font-size: 2rem;
    text-shadow: 1px 1px 3px ${colors.TEXT_BLACK};
    margin-left: 1rem;
  }
`;

const EditRoomNameImage = styled.img.attrs({
  src: editRoomImage,
})`
  width: 2.5rem;
  cursor: pointer;
  opacity: 0.6;
  margin-left: 1rem;
  &:hover {
    text-decoration: underline;
    opacity: 1;
  }
`;

const Notify = styled.div`
  margin-top: 0.5rem;
  padding: 0.5rem;
  background-color: #ffc6c6;
  border-radius: 5px;
  color: white;
  text-align: center;
  font-weight: bold;
  @media (min-width: ${DESKTOP_MIN_WIDTH}) {
    font-size: 2rem;
  }
`;

function RoomInformation({ roomId }) {
  const [roomName, setRoomName] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [message, setMessage] = useState('');
  const { openModal } = useContext(ModalContext);

  useEffect(() => {
    if (roomName) return;

    async function getRoomTitle() {
      const { isSuccess, data } = await fetchRoomTitle({ roomId });

      if (!isSuccess) {
        alert('오류로 인해 방의 정보를 불러올 수 없습니다');
        return;
      }

      const [roomInformation] = data;
      setRoomName(roomInformation.title);
    }

    getRoomTitle();
  }, [roomName]);

  useEffect(() => {
    const clearMessage = setTimeout(() => {
      setMessage('');
    }, 1500);

    return () => {
      clearTimeout(clearMessage);
    };
  }, [message]);

  function handleRoomName() {
    if (!inputValue) {
      setMessage('수정할 방의 이름을 입력하세요');
      return false;
    }

    updateRoomTitle({ roomId, title: inputValue }).then(({ isSuccess }) => {
      if (!isSuccess) {
        alert('오류로 인해 방의 이름을 수정할 수 없습니다');
        return false;
      }
      setRoomName(inputValue);
      return true;
    });

    return true;
  }

  return (
    <>
      <RoomInformationContainer>
        <span>{roomName}</span>
        <EditRoomNameImage title="이름 수정하기" onClick={openModal} />
      </RoomInformationContainer>
      <Modal
        title="방 이름 수정"
        description="수정할 방의 이름을 입력하세요"
        action={handleRoomName}
        actionButton="수정"
        closeButton="취소"
      >
        <FlexibleInput
          callback={setInputValue}
          maxLength={26}
          placeholder="방 이름을 입력하세요"
        />
        {message && <Notify>{message}</Notify>}
      </Modal>
    </>
  );
}

RoomInformation.propTypes = {
  roomId: PropTypes.number.isRequired,
};

export default RoomInformation;
