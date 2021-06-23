import Head from "next/head";
import styled from "styled-components";
import io from "socket.io-client";
import { useEffect, useState } from "react";

/* COMPONENT IMPORTS */
import JoinRoom from "../components/forms/join-room";

/* FUNCTION COMPONENT */
export default function Home() {
  const [roomInfo, setRoomInfo] = useState({
    //State management for display name, room code, and connection status.
    dName: "",
    rCode: "",
    connected: false,
  });

  const [errMessage, setErrMessage] = useState("");

  const socket = io("http://localhost", {
    autoConnect: false,
  });

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
    <>
      Connected as {roomInfo.dName} to room {roomInfo.rCode}.
    </>
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
        connectToWS();
      }
    } else if (!roomInfo.dName) setErrMessage("Missing display name!");
    else if (!roomInfo.rCode) setErrMessage("Missing Room Code!");
    else setErrMessage("An unexpected error ocurred");
  }

  function connectToWS() {
    socket.connect(); //connect to ws server
    socket.on("connect", () => {
      //wait for socket to connect
      setRoomInfo(prevState => ({
        //set state to relfect connection state
        ...prevState,
        connected: socket.connected,
      }));
    });
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
