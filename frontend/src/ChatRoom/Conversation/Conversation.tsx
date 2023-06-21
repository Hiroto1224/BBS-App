import React from "react";
import {ChatContainer, ConversationHeader, Message, MessageInput, MessageList} from "@chatscope/chat-ui-kit-react";
import useSWR from "swr";
import {fetcher, roomDataFetcher} from "../../Component/fetcher";
import {MessageManager} from "./MessageManager/MessageManager";

interface ConversationProps {
    focusConv: string
}

export const Conversation: React.FC<ConversationProps> = ({focusConv}) => {

    const {
        data: roomData,
    } = useSWR(`http://localhost:8080/api/v1/roomData/${focusConv}`, roomDataFetcher)
    const { data: messageData,
            error
    } = useSWR(`http://localhost:8080/api/v1/roomData/${focusConv.toString()}/ChatData`, fetcher)

    if(!focusConv) return <></>
    if (!roomData) return <></>
    if(!messageData) return <></>
    console.log(messageData)
    return (

        <ChatContainer>
            <ConversationHeader>
                <ConversationHeader.Content userName={roomData.name} info={""}/>
            </ConversationHeader>
            {/*chatContainerがMessageManagerを許容してくれないみたい*/}
            <MessageManager roomId={focusConv}/>
              <MessageList>
                  {messageData.map(data =>
                    <Message
                        model={{
                            message: data.message,
                            sentTime: data.timeStamp,
                            sender: data.sendUserId,
                            direction: "incoming",
                            position: "single"
                        }}
                    />
                    )}
                </MessageList>
            <MessageInput placeholder="Type Message here"/>
        </ChatContainer>

    );
}
