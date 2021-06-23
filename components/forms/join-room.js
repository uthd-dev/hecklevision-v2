import { useEffect } from "react";
import styled from "styled-components";

export default function JoinRoom({ setRoomInfo, joinRoom, errMessage }) {
  useEffect(() => {
    const dNameEl = document.getElementById("dname");
    const rCodeEl = document.getElementById("rcode");

    const updateDName = function (e) {
      setRoomInfo(prevState => ({
        ...prevState,
        dName: e.target.value,
      }));
    };

    const updateRCode = function (e) {
      setRoomInfo(prevState => ({
        ...prevState,
        rCode: e.target.value,
      }));
    };

    dNameEl.addEventListener("input", updateDName);
    rCodeEl.addEventListener("input", updateRCode);
  }, []);

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
        />
        <InputBox
          id="rcode"
          type="text"
          required
          maxLength={6}
          minLength={6}
          placeholder={"Room Code"}
        />
      </InputBoxWrapper>
      <JoinButton onClick={() => { joinRoom() }}>
        <JoinButtonText>Join Room</JoinButtonText>
      </JoinButton>
      <ErrMessage>{errMessage}</ErrMessage>
    </JoinRoomWrapper>
  );
}

/* STYLES */
const JoinRoomWrapper = styled.div`
  margin: 1rem auto;

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