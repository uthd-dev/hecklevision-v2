import { useEffect, useState } from "react";
import styled from "styled-components";

import socket from "../../util/socket";

export default function Feed() {
  /* STATE */
  const [messages, setMessages] = useState([]); //Array of last 15 messages from WS server

  /* ON COMPONENT MOUNT */
  useEffect(() => {
    socket.on("chat-message", handleChatMessage); //Listen for chat messagse
    return () => {
      socket.off("chat-message", handleChatMessage);
    }; //Listener clean up
  }, []);

  useEffect(() => {
    if (messages.length >= 15) trimMessageArray();
  }, [messages]); //Trim array when beyond 15 messages

  /* COMPONENT */
  return (
    <FeedContainer>
      <ChatMessages messages={messages} />
    </FeedContainer>
  );

  /* LOGIC */
  function handleChatMessage(msg) {
    setMessages(oldMessages => [msg, ...oldMessages]);
  } //Adds new messages to stateful array

  function trimMessageArray() {
    //Max displayable is ~13
    setMessages(oldMessages => {
      let numberToRemove = oldMessages.length - 15;
      oldMessages.splice(15, numberToRemove);
      return oldMessages;
    });
  } //Limit array to 15 total messages
}

/* SECONDARY COMPONENT */
function ChatMessages({ messages }) {
  return messages.map(
    //Map Messages array into styled components
    (msg, index) => (
      <ChatMessage key={index}>
        <strong>{msg.author}:</strong> {msg.content}
      </ChatMessage>
    )
  );
}

/* STYLES */
const FeedContainer = styled.div`
  width: 20rem;
  height: 22rem;

  padding: 0.5rem;

  display: flex;
  flex-direction: column-reverse;

  background-color: #fcd7ad;
  border-radius: 5px 5px 0 0;

  overflow: hidden;
`;

const ChatMessage = styled.p`
  margin: 0.75rem 0rem 0rem 0rem;
  color: black;
  font-size: 0.75rem;
`;
