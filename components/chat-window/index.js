import { useEffect } from "react";
import styled from "styled-components";

import Feed from "./feed";
import Sender from "./sender";

export default function ChatWindow({ roomInfo }) {
    return(
        <Wrapper>
            <Feed />
            <Sender roomInfo={roomInfo} />
        </Wrapper>
    );
}

const Wrapper = styled.div`
    margin: 1rem auto;
    width: 20rem;
    height: 25rem;

    border-radius: 5px;
`;