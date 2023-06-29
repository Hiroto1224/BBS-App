import React from "react";
import {ChatContainer, ConversationHeader, Message, MessageInput, MessageList} from "@chatscope/chat-ui-kit-react";
import { MessageData } from "../Model/Message"


interface ConversationProps {
    focusConv: string
    messageData: MessageData[] | undefined
    roomName:string
}
const baseAPI = 'http://localhost:8080';
//const baseAPI = 'https://bboardbackend.azurewebsites.net';
export const Conversation: React.FC<ConversationProps> = ({focusConv = "test", messageData,roomName}) => {


    const OnSend = async (inputText: string) => {
        const data = {
            message: inputText,
            sendUserName: "hotaru",
            roomId:focusConv
        }
        await fetch(`${baseAPI}/api/v1/chatData/sendMessage`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(async (response) => {
                return await response.json()
            })
    }
    if (!messageData) return <></>

    return (

        <ChatContainer>
            <ConversationHeader>
                <ConversationHeader.Content userName={roomName} info={""}/>
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