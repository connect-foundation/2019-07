import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import * as colors from '../../constants/colors';

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

/**
 * 방 리스트 페이지에서 방 ID를 넘겨줌
 * 방 상세 페이지 루트 컴포넌트는 이 컴포넌트에 방 ID 전달
 * 방 ID를 통해서 마운트 될 때 방 이름 가져옴.
 */
function RoomInformation() {
  const [roomName, setRoomName] = useState('');

  useEffect(() => {
    /**
     * fetch using roomId, init roomName
     */
    setRoomName('방 이름');
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

export default RoomInformation;
