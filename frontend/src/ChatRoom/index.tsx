import React, {useEffect, useState} from 'react'

import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css'
import {
    MainContainer
}
    from '@chatscope/chat-ui-kit-react';
import { SideBar } from './SideBar';
import {Conversation} from "./Conversation/Conversation";
import { MessageData } from './Model/Message';
import {SidebarData} from "./Model/SidebarData";
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs'


// const baseAPI = 'http://localhost:8080/api/v1';
const baseAPI = 'https://bboard.azurewebsites.net/api/v1';
async function chatDataFetch(): Promise<Map<string,MessageData[]>> {
    return await fetch(`${baseAPI}/chat/overview`)
        .then(async (response) => {
            return await response.json()
        })
}

const ChatRoom = React.memo(() => {
    const [focusConv,setFocusConv] = useState("");
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
        chatDataFetch().then((res) => {
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