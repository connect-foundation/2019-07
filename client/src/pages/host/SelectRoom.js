import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';

import Header from '../../components/common/Header';
import { YellowButton } from '../../components/common/Buttons';
import Modal from '../../components/common/Modal';
import { ModalContext } from '../../components/common/ModalProvider';
import FlexibleInput from '../../components/common/FlexibleInput';
import { fetchRooms, addRoom } from '../../utils/fetch';
import RoomList from '../../components/selectRoom/RoomList';
import { parseCookie } from '../../utils/util';
import DESKTOP_MIN_WIDTH from '../../constants/media';
import MainContainer from '../../components/common/MainContainer';
import InformationArea from '../../components/common/InformationArea';

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

const ButtonContainer = styled.div`
  position: relative;
  button {
    font-size: 3vmin;
    padding: 0.75vmin 1.25vmin;
    transform: translateY(-0.4vmin);
  }
`;

const RoomCounter = styled.span`
  position: relative;
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
    async function getRooms(count) {
      if (count === 0) {
        alert('오류로 인해 방을 가져올 수 없습니다');
        return;
      }
      const { isSuccess, data } = await fetchRooms({ userId });
      if (!isSuccess) {
        getRooms(count - 1);
        return;
      }
      setRooms(data);
    }
    if (userId) getRooms(3);
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
      <MainContainer>
        <InformationArea>
          <RoomCounter>{`방 ${rooms.length}개`}</RoomCounter>
          <ButtonContainer>
            <YellowButton onClick={openModal}>방 만들기</YellowButton>
          </ButtonContainer>
        </InformationArea>
        <RoomContainer>
          <RoomList rooms={rooms} setRooms={setRooms} />
        </RoomContainer>
      </MainContainer>
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
