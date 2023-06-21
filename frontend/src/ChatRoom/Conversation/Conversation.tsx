import React from "react";
import {ChatContainer, ConversationHeader, MessageInput} from "@chatscope/chat-ui-kit-react";
import useSWR from "swr";
import {roomDataFetcher} from "../../Component/fetcher";
import { MessageManager } from "./MessageManager/MessageManager";

interface ConversationProps {
    focusConv: string
}

export const Conversation: React.FC<ConversationProps> = ({focusConv}) => {

    const {
        data: roomData,
        error,
        isLoading
    } = useSWR(`http://localhost:8080/api/v1/roomData/${focusConv}`, roomDataFetcher)


    console.log(roomData);

    if(!roomData) return <></>
    return (

        <ChatContainer>
            <ConversationHeader>
                <ConversationHeader.Content userName={roomData.name} info={""}/>
            </ConversationHeader>
            {/*chatContainerがMessageManagerを許容してくれないみたい*/}
            <MessageManager roomId={focusConv} />

            <MessageInput placeholder="Type Message here"/>
        </ChatContainer>

    );
}
