import { useEffect, useState } from "react";
import styled from "styled-components";

import socket from "../../util/socket";

export default function Sender({ roomInfo }) {
  /* STATE */
  const [msg, setMsg] = useState(""); //state for input field

  /* ON COMPONENT MOUNT */
  useEffect(() => {
    socket.on("chat-message", handleChatMessage); //Listen for chat messages

    function handleChatMessage(data) {
      if (data.author == roomInfo.dName) setMsg("");
    } //Clear input field when user sends message and it registers on the server

    return () => {
      socket.off("chat-message", handleChatMessage);
    }; //Clean up listeners
  }, [roomInfo]);

  const updateMsg = () => {
    const senderEl = document.getElementById("sender-input-field");
    setMsg(`${senderEl.value.substring(0, 30)}`);
  }; //updates state based on input field

  const handleKeyUp = e => {
    if (e.keyCode === 13) sendMsg();
  }; //Handles enter key presses to send messages

  /* COMPONENT */
  return (
    <SenderContainer>
      <Input
        id="sender-input-field"
        placeholder="Your heckle starts here..."
        type="text"
        maxLength="30"
        minLength="1"
        value={msg}
        onInput={updateMsg}
        onKeyUp={handleKeyUp}
      ></Input>
      <SendButton
        onClick={() => {
          sendMsg();
        }}
      >
        <Icon src="/send.svg" />
      </SendButton>
    </SenderContainer>
  );

  /* LOGIC */
  function sendMsg() {
      if(msg.length > 0) socket.emit("chat-message", msg); 
  } //sends message from input field to WS server
}

/* STYLES */
const SenderContainer = styled.div`
  width: 20rem;
  height: 2rem;

  display: flex;

  background-color: #f5e6e8;
  border-radius: 0 0 5px 5px;
`;

const Input = styled.input`
  width: 17rem;
  height: 2rem;

  padding: 0.5rem;

  background-color: #f5e6e8;
  border-radius: 0 0 0 5px;
  border: none;
  font-size: 0.75rem;
`;

const SendButton = styled.div`
  width: 1.5rem;
  height: 1.5rem;

  background-color: #7180b9;
  border-radius: 50%;

  margin: auto;

  cursor: pointer;

  :hover {
    transform: translateY(-0.1rem);
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
    transition: 300ms;
  }

  transition: 300ms;
`;

const Icon = styled.img`
  width: 1rem;
  height: 1rem;

  margin: 0.25rem 0.3rem 0.25rem 0.2rem;
`;
