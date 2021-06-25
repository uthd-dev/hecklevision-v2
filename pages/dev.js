import styled from "styled-components";
import ChatWindow from "../components/chat-window";
import io from "socket.io-client";

export default function Dev () {
    return(
        <Page>
        </Page>
    );
}

/* STYLES */

const Page = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #011936;
  overflow: hidden;

  padding-top: 20vh;
`;
