import React, {useEffect, useState} from "react";
import {ChatContainer, ConversationHeader, Message, MessageInput, MessageList} from "@chatscope/chat-ui-kit-react";
import useSWR, {mutate} from "swr";
import {fetcher, roomDataFetcher,messageFetcher} from "../../Component/fetcher";
import { MessageData } from "../Model/Message"
import axios from "axios";
import { Test } from "../../Component/Test";


interface ConversationProps {
    focusConv: string
    messageData: MessageData[] | undefined
}
const baseAPI = 'http://localhost:8080/api/v1';

const useRoomData = (focusConv: string) => {
    const { data: roomData, error } = useSWR(
        focusConv ? `${baseAPI}/roomData/${focusConv}` :null,
        roomDataFetcher);
    return {
        roomData,
        isLoading: !error && !roomData,
        isError: error
    }
}

const useChatData = (focusConv: string) => {
    const { data: chatData, error } = useSWR(
            focusConv ? `${baseAPI}/roomData/${focusConv.toString()}/ChatData` : null,
        fetcher);
    if (chatData !== undefined) {
        if (chatData.length) {
            return {
                chatData,
                isLoading: !error && !chatData,
                isError: error
            }
        }
    }
    return {
        undefined,
        isLoading: !error && !chatData,
        isError: error
    }
}


const useLongPoling = (roomId:string,viewMessage: MessageData[] ,setViewMessage: React.Dispatch<React.SetStateAction<MessageData[]>>,id: string,setLastMessage: React.Dispatch<React.SetStateAction<string>>) : MessageData[] | null => {
    const {data: newMessage} = useSWR(
        `${baseAPI}/roomData/${roomId.toString()}/newChatData?chatId=`+id,
        messageFetcher, {
        refreshInterval: 0,
        onSuccess: (data) => {
            setViewMessage([...viewMessage ,...data])
            setLastMessage(data[data.length - 1].id)
        },onError: (error) => {

        },
    });

    if (newMessage) return newMessage

    return null
}


export const Conversation: React.FC<ConversationProps> = ({focusConv = "test", messageData}) => {


    const OnSend = async (inputText: string) => {
        const send = {
            message: inputText.toString(),
            sendUserName: "Hotaru",
            roomId: focusConv
        }
        const res = await axios.post(`${baseAPI}/chatData/sendMessage`,send)

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