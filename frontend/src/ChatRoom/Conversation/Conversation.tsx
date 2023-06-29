import React from "react";
import {ChatContainer, ConversationHeader, Message, MessageInput, MessageList} from "@chatscope/chat-ui-kit-react";
import { MessageData } from "../Model/Message"


interface ConversationProps {
    focusConv: string
    messageData: MessageData[] | undefined
}
// const baseAPI = 'http://localhost:8080/api/v1';

export const Conversation: React.FC<ConversationProps> = ({focusConv = "test", messageData}) => {


    const OnSend = async (inputText: string) => {
<<<<<<< HEAD
=======
        /*const send = {
            message: inputText.toString(),
            sendUserName: "Hotaru",
            roomId: focusConv
        }*/

>>>>>>> Develop
    }
    if (!messageData) return <></>

    return (

        <ChatContainer>
            <ConversationHeader>
                <ConversationHeader.Content userName={"test"} info={""}/>
            </ConversationHeader>
            <MessageList>
                {messageData ? messageData.map(data =>
                    <Message
                        key={data.timestamp}
                        model={{
                            message: data.message,
                            sentTime: data.timestamp,
                            sender: data.senderName,
                            direction: "incoming",
                            position: "single"
                        }}>
                        <Message.Footer sender={data.senderName !== null ? data.senderName.toString() : ""} sentTime={data.timestamp !== null ? data.timestamp : ""}/>
                    </Message>
                ) : <></>}
            </MessageList>
            <MessageInput onSend={OnSend} placeholder="Type Message here"/>
        </ChatContainer>

    );
}