import React, {useEffect, useState} from "react";
import {ChatContainer, ConversationHeader, Message, MessageInput, MessageList} from "@chatscope/chat-ui-kit-react";
import useSWR, {mutate} from "swr";
import {fetcher, roomDataFetcher,messageFetcher} from "../../Component/fetcher";
import { MessageData } from "../Model/Message"
import { Input } from "./MessageInput/MessageInput";
import axios from "axios";
import SockJS from "sockjs-client";
import {Client, Stomp } from "@stomp/stompjs";
import { io, Socket } from "socket.io-client";

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
    const [socket, setSocket] = useState<Client | null>(null);

    useEffect(() => {
        const newClient = new Client({
            brokerURL: "ws://localhost:8080/ws",
            onConnect: () => {
                console.log("connect")
                newClient.subscribe(`/topic/app`, message => {
                    setMessage(message.body);
                });
            },
            onStompError: (frame) => {
                console.log('Broker reported error: ' + frame.headers['message']);
                console.log('Additional details: ' + frame.body);
        },
            onWebSocketError: (error) => {
                console.log(error)
            }
        });
        newClient.activate();

        setSocket(newClient);

        return () => {
            newClient.deactivate();
        };
    },[]);

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
        // const res = await axios.post(`${baseAPI}/chatData/${focusConv}/6482935870783b559271d2b3`, sendData)
        if(socket !== null){
            //socket.publish({destination: `/app/chatData/${focusConv}/6482935870783b559271d2b3`,body:inputText.toString()});
        }
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