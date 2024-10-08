import React, {useEffect, useState} from 'react'

import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css'
import { MainContainer } from '@chatscope/chat-ui-kit-react';
import { SideBar } from './SideBar';
import {Conversation} from "./Conversation/Conversation";
import { MessageData } from './Model/Message';
import {SidebarData} from "./Model/SidebarData";
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs'
import {Button, Dialog, TextField } from '@mui/material';
import { formatToTimeZone } from 'date-fns-timezone';


//const baseAPI = 'http://localhost:8080';
const baseAPI = 'https://bboardbackend.azurewebsites.net';
async function chatDataFetch(): Promise<Map<string,MessageData[]>> {
    return await fetch(`${baseAPI}/api/v1/chat/overview`)
        .then(async (response) => {
            return await response.json()
        })
}

const dateGenerator = (timestamp: string) => {

    const date = new Date(timestamp);
    const localTime = formatToTimeZone(date, 'MM-DD HH:mm:ss', {timeZone: 'Asia/Tokyo'});

    return localTime;
}


const ChatRoom = React.memo(() => {
    const [focusConv,setFocusConv] = useState("");
    const [messageData, setMessageData] = useState<MessageData[]>([]);
    const [sidebarData, setSidebarData] = useState<SidebarData[]>([]);
    const [fetchedData, setFetchedData] = useState<MessageData[]>([]);
    const [roomName , setRoomName] = useState("");
    const [stomp , setStomp] = useState<Client>();
    const [userName, setUserName] = useState("");
    const [button, setButton] = useState(true);
    useEffect(() => {
        chatDataFetch().then((res) => {
            const messages: MessageData[] = [];
            const sidebar: SidebarData[] = [];
            Object.values(res).forEach((data,key) => {
                data.forEach((d:MessageData) => {

                    if(d.message !== "No Messages") {

                        messages.push({
                            id: d.id,
                            roomId: d.roomId,
                            roomName: d.roomName,
                            message: d.message,
                            timestamp: dateGenerator(d.timestamp),
                            senderName: d.senderName,
                            lastMessage: d.lastMessage
                        });
                    }
                    if(d.lastMessage) {
                        sidebar.push({
                            message: d.message,
                            roomId: d.roomId,
                            roomName: d.roomName,
                            timeStamp: dateGenerator(d.timestamp),
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
        const socket = new SockJS(`${baseAPI}/ws`);
        const stompClient = new Client({
            webSocketFactory: () => socket,
        });
        stompClient.configure({
            brokerURL: `${baseAPI}/ws`,
            onConnect: () => {
                console.log('Connected');

                stompClient.publish({destination: '/app/some-endpoint', body: 'Hello,server!'});
            },
        });
        setStomp(stompClient);

        stompClient.activate();

        return () => {
            if(stompClient.connected) {
                stompClient.deactivate();
            }
        }
    }, []);

    useEffect(() => {
        if(stomp) {
            stomp.configure({
                onConnect: () => {
                    stomp.subscribe('/topic/public', function (greeting) {
                        const json = JSON.parse(greeting.body);

                        const receiveData: MessageData = {
                            id: json.id,
                            roomId: json.roomId,
                            roomName: json.roomName,
                            message: json.message,
                            timestamp: dateGenerator(json.timestamp),
                            senderName: json.senderName,
                            lastMessage: json.lastMessage
                        }

                        setFetchedData(prev => [...prev, receiveData]);
                        if (receiveData.roomId === focusConv) {
                            setMessageData(prev => [...prev, receiveData]);
                        }
                        setSidebarData(prevState => {
                            return prevState.map((data) => {
                                if (data.roomId === receiveData.roomId) {
                                    return {
                                        ...data,
                                        senderName: receiveData.senderName,
                                        message: receiveData.message,
                                        timeStamp: dateGenerator(receiveData.timestamp)
                                    };
                                }
                                return data;
                            });
                        })

                    });
                }
            })
        }
    }, [focusConv,stomp]);


    useEffect(() => {
        const filteredMessages = fetchedData.filter((data:MessageData) =>
        focusConv === data.roomId);
        setMessageData([...filteredMessages]);
        const name = filteredMessages.find((data) => data.roomId === focusConv)?.roomName;
        setRoomName(name ?? "");

    }, [focusConv,fetchedData]);

    const onSubmit = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserName(event.target.value);
    }


    if(!messageData) return <></>
    return (
        <div style={{position: "relative", height: "569px"}}>

                <MainContainer responsive>
                    <SideBar focusConv={focusConv} setFocusConv={setFocusConv} sidebarData={sidebarData}/>
                    <Conversation focusConv={focusConv}
                                  messageData={messageData}
                                  roomName={roomName}
                                  userName={userName}
                    />
                    <Dialog open={button} title = "we">
                        <TextField id="outlined-basic" label="Input UserName" variant="outlined" onChange={onSubmit}/>
                        <Button onClick={() => {setButton(!button);}}>
                            始める
                        </Button>
                    </Dialog>
                </MainContainer>

        </div>
    );
});



export default ChatRoom;

