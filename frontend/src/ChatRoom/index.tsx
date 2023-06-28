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

async function chatDataFetch(): Promise<Map<string,MessageData[]>> {
    return await fetch('http://localhost:8080/api/v1/chat/overview')
        .then(async (response) => {
            return await response.json()
        })
}

const ChatRoom = React.memo(() => {
    const [focusConv,setFocusConv] = useState("  ");
    const [messageData, setMessageData] = useState<MessageData[]>([]);
    const [sidebarData, setSidebarData] = useState<SidebarData[]>([]);
    const [fetchedData, setFetchedData] = useState<MessageData[]>([]);


    useEffect(() => {
        const data = chatDataFetch().then((res) => {
            const messages: MessageData[] = [];
            const sidebar: SidebarData[] = [];
            Object.values(res).forEach((data,key) => {
                data.forEach((d:MessageData) => {
                    messages.push(d);
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
    const { data: newMessages,isLoading,error } =
        useSWR(`http://localhost:8080/api/v1/chat/newChatData`,
            messageFetcher,
            {refreshInterval: 1000, revalidateOnFocus: false})


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