import React, {useEffect, useState} from "react";
import {ChatContainer, ConversationHeader, Message, MessageInput, MessageList} from "@chatscope/chat-ui-kit-react";
import useSWR, {mutate} from "swr";
import {fetcher, roomDataFetcher,messageFetcher} from "../../Component/fetcher";
import { MessageData } from "../Model/Message"
import axios from "axios";


interface ConversationProps {
    focusConv: string
    messageData: MessageData[]
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

    // const {roomData, isLoading: isRoomLoading} = useRoomData(focusConv);
    const [viewMessage,setViewMessage] = useState<MessageData[]>([])
    const [lastChatId, setLastChatId] = useState('')
    const [message, setMessage] = useState('')

    useEffect(() => {
        const view = messageData.filter((data) => data.roomId === focusConv);
        setViewMessage([...view])
        if (view !== undefined) {
            if (view.length !== 0) {
                setLastChatId(view[view.length - 1].id);
            }

        }
    },[focusConv])

    // useLongPoling(focusConv,viewMessage,setViewMessage,lastChatId,setLastChatId)

    const OnSend = async (inputText: string) => {
        const sendData = {
            message: inputText.toString(),
            sendUserId: "6482935870783b559271d2b3",
            roomId: focusConv
        }
        const res = await axios.post(`${baseAPI}/chatData/sendMessage`,sendData)

    }

    return (

        <ChatContainer>
            <ConversationHeader>
                {/*<ConversationHeader.Content userName={roomData ? roomData.name : ''} info={""}/>*/}
            </ConversationHeader>
            <MessageList>
                {viewMessage ? viewMessage.map(data =>
                    <Message
                        key={data.id}
                        model={{
                            message: data.message,
                            sentTime: data.timeStamp,
                            sender: data.sendUserId,
                            direction: "incoming",
                            position: "single"
                        }}
                    />
                ) : <></>}
            </MessageList>
            <MessageInput onSend={OnSend} placeholder="Type Message here"/>
        </ChatContainer>

    );
}