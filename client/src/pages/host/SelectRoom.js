import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';

import * as colors from '../../constants/colors';
import Header from '../../components/common/Header';
import { YellowButton } from '../../components/common/Buttons';
import Modal from '../../components/common/Modal';
import { ModalContext } from '../../components/common/ModalProvider';
import FlexibleInput from '../../components/common/FlexibleInput';
import { fetchRooms, addRoom } from '../../utils/fetch';
import RoomList from '../../components/selectRoom/RoomList';
import { parseCookie } from '../../utils/util';
import DESKTOP_MIN_WIDTH from '../../constants/media';

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

const Main = styled.main`
  position: relative;
  flex: 1;
  flex-direction: column;
  padding: 4vmin;
  background-color: ${colors.BACKGROUND_LIGHT_GRAY};
`;

const ListHeader = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 5vmin;
  box-sizing: border-box;
  margin: 2vmin 0;

  div.buttonWrapper {
    position: relative;
    margin-left: auto;
    justify-self: flex-end;
    transform: translateY(-10%);
  }
  button {
    font-size: 2.5vmin;
    padding: 1.75vmin;
  }
`;

const RoomCounter = styled.span`
  position: relative;
  color: ${colors.TEXT_GRAY};
  font-size: 4vmin;
  font-weight: bold;
  user-select: none;
`;

const RoomContainer = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
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

function parsingUserNaverId() {
  const cookies = parseCookie(document.cookie);
  return cookies.naverId;
}

function SelectRoom() {
  const [rooms, setRooms] = useState([]);
  const [userId, setUserId] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [message, setMessage] = useState('');
  const { openModal } = useContext(ModalContext);

  useEffect(() => {
    try {
      setUserId(parsingUserNaverId());
    } catch (err) {
      window.location.href = '/';
    }
  }, []);

  useEffect(() => {
    async function getRooms() {
      const { isSuccess, data } = await fetchRooms({ userId });

      if (!isSuccess) {
        alert('오류로 인해 방을 가져올 수 없습니다');
        return;
      }

      setRooms(data);
    }
    if (userId) getRooms();
  }, [userId]);

  useEffect(() => {
    const clearMessage = setTimeout(() => {
      setMessage('');
    }, 1500);

    return () => {
      clearTimeout(clearMessage);
    };
  }, [message]);

  function handleCreateButtonClick() {
    if (!inputValue.trim()) {
      setMessage('방의 이름을 입력하세요');
      return false;
    }

    if (rooms.find(room => room.title === inputValue)) {
      setMessage('방의 이름은 중복될 수 없습니다');
      return false;
    }

    async function createNewRoom() {
      const { isSuccess, data } = await addRoom({
        userId,
        roomTitle: inputValue.trim(),
      });

      if (!isSuccess) {
        alert('방이 오류로 인해 추가되지 못했습니다');
        return;
      }

      setRooms([...rooms, { id: data.insertId, title: inputValue }]);
    }

    createNewRoom();
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
          <RoomList rooms={rooms} setRooms={setRooms} />
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
        {message && <Notify>{message}</Notify>}
      </Modal>
    </Container>
  );
}

export default SelectRoom;
