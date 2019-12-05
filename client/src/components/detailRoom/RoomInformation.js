import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import * as colors from '../../constants/colors';
import { fetchRoomTitle } from '../../utils/fetch';

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

  useEffect(() => {
    fetchRoomTitle({ roomId }).then(response => {
      setRoomName(response.data[0].title);
    });
  }, []);

  function handleRoomName() {
    /**
     * 현재 방의 이름을 Modal input에 출력
     * 유저가 입력한 값을 setRoomName로 설정하고 fetch
     * 응답이 실패로 왔을 경우 상태를 이전으로 돌리고 유저에게 알림
     * */
    const currentRoomName = roomName;
    setRoomName(currentRoomName);
  }

  return (
    <>
      <RoomInformationContainer>
        <span>{roomName}</span>
        <EditRoomNameImage title="이름 수정하기" onClick={handleRoomName} />
      </RoomInformationContainer>
    </>
  );
}

RoomInformation.propTypes = {
  roomId: PropTypes.number.isRequired,
};

export default RoomInformation;
