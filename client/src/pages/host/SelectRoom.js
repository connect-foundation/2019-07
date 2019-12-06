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

const RoomWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 12.5vmin;
  margin-top: 2vmin;
  box-sizing: border-box;
  padding: 1vmin;
  background-color: white;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
  user-select: none;
  border-radius: 0.4rem;
  cursor: pointer;

  &:hover {
    div.door {
      transform: rotateY(-45deg);
    }
  }
`;

const RoomTitle = styled.span`
  font-size: 4vmin;
`;

const RoomFrame = styled.div`
  position: relative;
  width: 7vmin;
  height: 100%;
  margin: 0 2vmin 0 1vmin;
  border: 0.4vmin solid black;
  box-sizing: border-box;
  perspective: 100px;
  transform-style: preserve-3d;
`;

const RoomDoor = styled.div.attrs({
  className: 'door',
})`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  height: 100%;
  background-color: brown;
  transform-origin: 0% 50%;
  transition: 0.5s;
`;

const DoorKnob = styled.div`
  width: 1vmin;
  height: 1vmin;
  box-sizing: border-box;
  background-color: ${colors.PRIMARY_DEEP_YELLOW};
  border-radius: 50%;
  border: 1px solid black;
  margin-right: 0.5vmin;
`;

async function getRooms({ userId }) {
  const result = await fetchRooms({ userId }).then(response => {
    if (response.isSuccess) return response.data;
    return [];
  });
  return result;
}

function parsingUserEmail() {
  const cookies = document.cookie.split(';').map(cookie => cookie.split('='));
  const email = cookies.find(cookie => cookie[0] === 'email');
  return email[1].replace('%40', '@');
}

function SelectRoom({ history }) {
  const [rooms, setRooms] = useState([]);
  const [userId, setUserId] = useState('');
  const [inputValue, setInputValue] = useState('');
  const { openModal } = useContext(ModalContext);

  useEffect(() => {
    try {
      setUserId(parsingUserEmail());
    } catch (err) {
      window.location.href = '/';
    }
  }, []);

  useEffect(() => {
    if (userId)
      getRooms({ userId }).then(result => {
        setRooms(result);
      });
  }, [userId]);

  function handleCreateButtonClick() {
    if (rooms.find(room => room.title === inputValue)) {
      alert('방의 이름은 중복될 수 없습니다');
      return false;
    }

    addRoom({ userId, roomTitle: inputValue }).then(response => {
      if (response.isSuccess) {
        setRooms([...rooms, { id: response.data.insertId, title: inputValue }]);
        return;
      }
      alert('방이 오류로 인해 추가되지 못했습니다');
    });

    return true;
  }

  function handleRoomClick(e) {
    const roomTitle = e.target.textContent;
    const roomId = rooms.find(room => room.title === roomTitle).id;

    history.push({
      pathname: '/host/room/detail',
      state: {
        roomId,
      },
    });
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
          {rooms.map(room => (
            <RoomWrapper key={room.id} onClick={handleRoomClick}>
              <RoomFrame>
                <RoomDoor>
                  <DoorKnob />
                </RoomDoor>
              </RoomFrame>
              <RoomTitle>{room.title}</RoomTitle>
            </RoomWrapper>
          ))}
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
