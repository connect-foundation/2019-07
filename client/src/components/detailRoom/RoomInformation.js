import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import * as colors from '../../constants/colors';
import { fetchRoomTitle, updateRoomTitle } from '../../utils/fetch';
import Modal from '../common/Modal';
import FlexibleInput from '../common/FlexibleInput';
import { ModalContext } from '../common/ModalProvider';

const RoomInformationContainer = styled.div`
  position: absolute;
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
  src:
    'https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../assets/preview/2012/png/iconmonstr-edit-4.png&r=255&g=255&b=255',
})`
  width: 2.5rem;
  cursor: pointer;
  opacity: 0.6;
  &:hover {
    text-decoration: underline;
    opacity: 1;
  }
`;

function RoomInformation({ roomId }) {
  const [roomName, setRoomName] = useState('');
  const [inputValue, setInputValue] = useState('');
  const { openModal } = useContext(ModalContext);

  useEffect(() => {
    fetchRoomTitle({ roomId }).then(response => {
      setRoomName(response.data[0].title);
    });
  }, []);

  function handleRoomName() {
    updateRoomTitle({ roomId, title: inputValue }).then(response => {
      if (response.isSuccess) {
        setRoomName(inputValue);
        return;
      }
      alert('오류로 인해 방의 이름을 수정할 수 없습니다');
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
      </Modal>
    </>
  );
}

RoomInformation.propTypes = {
  roomId: PropTypes.number.isRequired,
};

export default RoomInformation;
