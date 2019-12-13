import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import * as colors from '../../constants/colors';
import { deleteRoom } from '../../utils/fetch';
import deleteButtonImage from '../../assets/images/deleteButton.png';

/**
 * Styled-component 생략
 */

function RoomList({ rooms, history, setRooms }) {
  function handleRoomClick(e) {
    if (e.defaultPrevented) return;

    const roomTitle = e.target.textContent;
    const roomId = rooms.find((room) => room.title === roomTitle).id;

    history.push({
      pathname: '/host/room/detail',
      state: {
        roomId,
      },
    });
  }

  function handleDeleteRoomClick(e) {
    const roomTitle = e.target.previousElementSibling.textContent;
    const roomId = rooms.find((room) => room.title === roomTitle).id;

    deleteRoom({ roomId }).then((response) => {
      if (response.isError) {
        alert('오류로 인해 방이 삭제되지 않았습니다');
        return;
      }
      setRooms(rooms.filter((room) => room.id !== roomId));
    });

    e.preventDefault();
  }

  return rooms.map((room) => (
    <RoomWrapper key={room.id} onClick={handleRoomClick}>
      <RoomFrame>
        <RoomDoor>
          <DoorKnob />
        </RoomDoor>
      </RoomFrame>
      <RoomTitle>{room.title}</RoomTitle>
      <DeleteRoomButton onClick={handleDeleteRoomClick} />
    </RoomWrapper>
  ));
}

RoomList.propTypes = {
  rooms: PropTypes.arrayOf(PropTypes.object),
};

export default RoomList;
