import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import * as colors from '../../constants/colors';
import Header from '../../components/common/Header';
import { YellowButton } from '../../components/common/Buttons';
import Modal from '../../components/common/Modal';
import { ModalContext } from '../../components/common/ModalProvider';
import FlexibleInput from '../../components/common/FlexibleInput';
import { fetchRooms, addRoom } from '../../utils/fetch';
import RoomList from '../../components/selectRoom/RoomList';

/**
 * Styled-component 생략
 */

async function getRooms({ userId }) {
  const result = await fetchRooms({ userId }).then((response) => {
    if (response.isSuccess) return response.data;
    return [];
  });
  return result;
}

function parsingUserNaverId() {
  const cookies = document.cookie.split(';').map((cookie) => cookie.split('='));
  const naverId = cookies.find((cookie) => cookie[0] === 'naverId');
  return naverId[1];
}

function SelectRoom({ history }) {
  const [rooms, setRooms] = useState([]);
  const [userId, setUserId] = useState('');
  const [inputValue, setInputValue] = useState('');
  const { openModal } = useContext(ModalContext);

  useEffect(() => {
    try {
      setUserId(parsingUserNaverId());
    } catch (err) {
      window.location.href = '/';
    }
  }, []);

  useEffect(() => {
    if (userId)
      getRooms({ userId }).then((roomList) => {
        setRooms(roomList);
      });
  }, [userId]);

  function handleCreateButtonClick() {
    if (!inputValue.trim()) {
      alert('방의 이름을 입력하세요');
      return false;
    }

    if (rooms.find((room) => room.title === inputValue)) {
      alert('방의 이름은 중복될 수 없습니다');
      return false;
    }

    addRoom({ userId, roomTitle: inputValue.trim() }).then((response) => {
      if (response.isError) {
        alert('방이 오류로 인해 추가되지 못했습니다');
        return;
      }
      setRooms([...rooms, { id: response.data.insertId, title: inputValue }]);
    });

    return true;
  }

  return (
    <Container>
      <Header />
      <Main>
        <ListHeader>
          <RoomCounter>{`방 ${rooms.length}개`}</RoomCounter>
          <YellowButton onClick={openModal}>방 만들기</YellowButton>
        </ListHeader>
        <RoomContainer>
          <RoomList rooms={rooms} history={history} setRooms={setRooms} />
        </RoomContainer>
      </Main>
      <Modal
        title="새로운 방 추가"
        description="새로 추가할 방의 이름을 입력하세요"
        closeButton="취소"
        actionButton="만들기"
        action={handleCreateButtonClick}
      >
        <FlexibleInput
          placeholder="방 이름을 입력하세요"
          maxLength={26}
          callback={setInputValue}
        />
      </Modal>
    </Container>
  );
}

SelectRoom.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default SelectRoom;
