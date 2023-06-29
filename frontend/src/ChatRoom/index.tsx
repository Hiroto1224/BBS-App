import React, {useEffect, useState} from 'react'

import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css'
import {
    ChatContainer, ConversationHeader,
    MainContainer, Message, MessageInput,
    MessageList
}
    from '@chatscope/chat-ui-kit-react';
import { SideBar } from './SideBar';
import {Conversation} from "./Conversation/Conversation";
import { MessageData } from './Model/Message';
import {fetcher, messageFetcher} from "../Component/fetcher";
import {SidebarData} from "./Model/SidebarData";
import useSWR from "swr";
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs'


// const baseAPI = 'http://localhost:8080/api/v1';
const baseAPI = 'https://agreeable-bush-0c0d76200.3.azurestaticapps.net/api/v1';
async function chatDataFetch(): Promise<Map<string,MessageData[]>> {
    return await fetch(`${baseAPI}/api/v1/chat/overview`)
        .then(async (response) => {
            return await response.json()
        })
}



const useLongPoling = (roomId:string,viewMessage: MessageData[] ,setViewMessage: React.Dispatch<React.SetStateAction<MessageData[]>>,id: string,setLastMessage: React.Dispatch<React.SetStateAction<string>>) : MessageData[] | null => {
    const {data: newMessage} = useSWR(
        `${baseAPI}/roomData/${roomId.toString()}/newChatData?chatId=`+id,
        messageFetcher, {
            refreshInterval: 5000,
            onSuccess: (data) => {
                setViewMessage([...viewMessage ,...data])
                setLastMessage(data[data.length - 1].id)
            },onError: (error) => {

            },
        });

    if (newMessage) return newMessage

    return null
}

const ChatRoom = React.memo(() => {
    const [focusConv,setFocusConv] = useState("");
    const [lastId, setLastId] = useState("");
    const [messageData, setMessageData] = useState<MessageData[]>([]);
    const [sidebarData, setSidebarData] = useState<SidebarData[]>([]);
    const [fetchedData, setFetchedData] = useState<MessageData[]>([]);
    useEffect(() => {
        const socket = new SockJS('https://agreeable-bush-0c0d76200.3.azurestaticapps.net/ws');
        const stompClient = new Client({
            webSocketFactory: () => socket,
        });
        stompClient.configure({
            brokerURL: 'http://localhost:8080/ws',
            onConnect: () => {
                console.log('Connected');

                stompClient.subscribe('/topic/public',function (greeting){
                    console.log('Message from server' + greeting.body);
                    console.log("subscribe up")
                });

                stompClient.publish({destination: '/app/some-endpoint', body: 'Hello,server!'});
            },
        });
        stompClient.activate();

        return () => {
            if(stompClient.connected) {
                stompClient.deactivate();
            }
        }
    }, []);
    useEffect(() => {
        const data = chatDataFetch().then((res) => {
            const messages: MessageData[] = [];
            const sidebar: SidebarData[] = [];
            Object.values(res).forEach((data,key) => {
                data.forEach((d:MessageData) => {
                    if(d.message !== "No Messages") {
                        messages.push(d);
                    }
                    if(d.lastMessage) {
                        sidebar.push({
                            message: d.message,
                            roomId: d.roomId,
                            roomName: d.roomName,
                            timeStamp: d.timestamp,
                            senderName: d.senderName
                        });
                    }

                })
            })
            setFetchedData([...messages]);
            setSidebarData([...sidebar])
        })


    },[])



    useEffect(() => {
        const filteredMessages = fetchedData.filter((data:MessageData) =>
        focusConv === data.roomId);
        setMessageData([...filteredMessages]);


    }, [focusConv,fetchedData]);

    if(!messageData) return <></>
    return (
        <div style={{ position: "relative",height:"569px"}}>
            <MainContainer responsive>
                <SideBar focusConv={focusConv} setFocusConv={setFocusConv} sidebarData={sidebarData}/>
                <Conversation focusConv={focusConv}
                              messageData={messageData}/>
            </MainContainer>

        </div>
    );
});



export default ChatRoom;