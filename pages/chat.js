import styled from "styled-components";
import { useEffect, useState } from "react";
import socket from "../util/socket";
import { useCookies } from "react-cookie"

/* COMPONENT IMPORTS */
import JoinRoom from "../components/forms/join-room";
import ChatWindow from "../components/chat-window";

/* FUNCTION COMPONENT */
export default function Home() {
  const [roomInfo, setRoomInfo] = useState({
    //State management for display name, room code, and connection status.
    dName: "",
    rCode: "",
    connected: false,
  });

  const [errMessage, setErrMessage] = useState("");
  const [cookie, setCookie] = useCookies(["user"])

  useEffect(() => {
    socket.on("connect_error", () => {
      setErrMessage("Error connecting to server!");
    });

    socket.on("join-status", status => {
      //wait for socket to connect & auth
      if (status === "join_success") {
        setRoomInfo(prevState => ({
          ...prevState,
          connected: socket.connected,
        })); //set state to relfect connection state
      } else if (status === "invalid_code_error")
        setErrMessage("Invalid Room Code!");
      else if (status === "name_taken_error")
        setErrMessage("Name already taken!");
      else setErrMessage("An unexpected error has occurred");
    });

    return () => {
      socket.off("join-status");
      socket.off("connect_error");
    };
  }, []);

  if (!roomInfo.connected)
    //Show login form when not already connected to a room / socket server
    return (
      <Page>
        <JoinRoom
          roomInfo={roomInfo}
          setRoomInfo={setRoomInfo}
          joinRoom={() => {
            joinRoom();
          }}
          errMessage={errMessage}
        />
      </Page>
    );

  return (
    //Primary page; client is connected to a room on the server.
    <Page>
      <ChatWindow roomInfo={roomInfo} />
    </Page>
  );

  /* LOGIC */
  function joinRoom() {
    //Handle Join room button press
    setErrMessage(""); //Clear any previous error messages
    if (roomInfo.dName && roomInfo.rCode && !roomInfo.connected) {
      if (!(roomInfo.dName.length >= 4) || !(roomInfo.dName.length <= 18))
        setErrMessage("Invalid Display Name length!");
      else if (!(roomInfo.rCode.length == 6))
        setErrMessage("Invalid Room Code length!");
      else {
        //Inputs are valid, connect to WS server
        socket.emit("request-join", {
          dName: roomInfo.dName,
          rCode: roomInfo.rCode,
        });
      }
    } else if (!roomInfo.dName) setErrMessage("Missing display name!");
    else if (!roomInfo.rCode) setErrMessage("Missing Room Code!");
    else setErrMessage("An unexpected error ocurred");
  }
}

/* STYLES */

const Page = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #011936;
  overflow: hidden;

  padding-top: 20vh;
`;
