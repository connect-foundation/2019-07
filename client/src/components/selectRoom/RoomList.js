import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import * as colors from '../../constants/colors';
import { deleteRoom } from '../../utils/fetch';

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

const RoomTitle = styled.span`
  font-size: 4vmin;
`;

const DeleteRoomButton = styled.button`
  position: absolute;
  right: 1rem;
  width: 4rem;
  height: 2rem;
  opacity: 0.2;
  border-radius: 2rem;
  border: none;
  background-color: red;
  color: ${colors.TEXT_WHITE};
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
  &:focus {
    outline: none;
  }
`;

function RoomList({ rooms, history, setRooms }) {
  function handleRoomClick(e) {
    if (e.defaultPrevented) return;

    const roomTitle = e.target.textContent;
    const roomId = rooms.find(room => room.title === roomTitle).id;

    history.push({
      pathname: '/host/room/detail',
      state: {
        roomId,
      },
    });
  }

  function handleDeleteRoomClick(e) {
    const roomTitle = e.target.previousElementSibling.textContent;
    const roomId = rooms.find(room => room.title === roomTitle).id;

    deleteRoom({ roomId }).then(response => {
      if (response.isError) {
        alert('오류로 인해 방이 삭제되지 않았습니다');
        return;
      }
      setRooms(rooms.filter(room => room.id !== roomId));
    });

    e.preventDefault();
  }

  return rooms.map(room => (
    <RoomWrapper key={room.id} onClick={handleRoomClick}>
      <RoomFrame>
        <RoomDoor>
          <DoorKnob />
        </RoomDoor>
      </RoomFrame>
      <RoomTitle>{room.title}</RoomTitle>
      <DeleteRoomButton onClick={handleDeleteRoomClick}>삭제</DeleteRoomButton>
    </RoomWrapper>
  ));
}

RoomList.propTypes = {
  rooms: PropTypes.arrayOf(PropTypes.object),
};

export default RoomList;
