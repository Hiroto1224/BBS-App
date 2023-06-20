import React from "react";
import {ChatContainer, ConversationHeader} from "@chatscope/chat-ui-kit-react";
import useSWR from "swr";
import {roomDataFetcher} from "../../Component/fetcher";

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
        </ChatContainer>

    );
}
