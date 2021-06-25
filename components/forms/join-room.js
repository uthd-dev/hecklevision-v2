import { useEffect } from "react";
import styled from "styled-components";

export default function JoinRoom({
  roomInfo,
  setRoomInfo,
  joinRoom,
  errMessage,
}) {

  /* ON COMPONENT MOUNT */
  const updateDName = () => {
    const dNameEl = document.getElementById("dname");
    setRoomInfo(prevState => ({
      ...prevState,
      dName: dNameEl.value.replace(" ", "").substring(0, 18), //save new value into state & remove spaces + characters beyond limit
    }));
  }; //Updates state to reflect display name input

  const updateRCode = () => {
    const rCodeEl = document.getElementById("rcode");
    setRoomInfo(prevState => ({
      ...prevState,
      rCode: rCodeEl.value.replace(" ", "").substring(0, 6),
    }));
  }; //Updates state to reflect room code input

  /* COMPONENT */
  return (
    <JoinRoomWrapper>
      <Title>Hecklevision</Title>
      <InputBoxWrapper>
        <InputBox
          id="dname"
          type="text"
          required
          maxLength={18}
          minLength={4}
          placeholder={"Display Name"}
          value={roomInfo.dName}
          onInput={updateDName}
        />
        <InputBox
          id="rcode"
          type="text"
          required
          maxLength={6}
          minLength={6}
          placeholder={"Room Code"}
          value={roomInfo.rCode}
          onInput={updateRCode}
        />
      </InputBoxWrapper>
      <JoinButton
        onClick={() => {
          joinRoom();
        }}
      >
        <JoinButtonText>Join Room</JoinButtonText>
      </JoinButton>
      <ErrMessage>{errMessage}</ErrMessage>
    </JoinRoomWrapper>
  );
}

/* STYLES */
const JoinRoomWrapper = styled.div`
  margin: 1rem;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  margin: 0;

  color: #eb5160;
`;

const InputBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2rem;
`;

const InputBox = styled.input`
  width: 12rem;
  height: 3rem;
  margin: 0.5rem;

  background-color: #f5e6e8;
  border-radius: 5px;
  border: none;

  text-align: center;
`;

const JoinButton = styled.div`
  width: 8rem;
  height: 2rem;

  background-color: #eb5160;
  border-radius: 5px;

  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  color: white;

  :hover {
    color: black;
    background-color: #f5e6e8;
    transition: 300ms;
  }

  transition: 300ms;
`;

const JoinButtonText = styled.div`
  font-size: 0.75rem;
`;

const ErrMessage = styled.p`
  color: red;
  font-size: 0.75rem;
`;
