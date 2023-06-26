import React, {useEffect, useState} from 'react'

import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css'
import {
    ChatContainer, ConversationHeader,
    MainContainer, MessageInput,
    MessageList
}
    from '@chatscope/chat-ui-kit-react'
import { SideBar } from './SideBar'
import useSWR from 'swr'
import {Conversation} from "./Conversation/Conversation";
import {roomDataFetcher} from "../Component/fetcher";
import { MessageData } from './Model/Message'

async function chatDataFetch(): Promise<MessageData[]> {
    return await fetch('http://localhost:8080/api/v1/chatData')
        .then(async (response) => {
            return await response.json()
        })
}

const ChatRoom = React.memo(() => {
    let ignore = false
    const [focusConv,setFocusConv] = useState("");
    const [messageData, setMessageData] = useState<MessageData[]>([])
    useEffect(() => {
        const data = chatDataFetch().then((data) => {
            if(!ignore){
                data.forEach((d) => messageData.push(d));
            }
        }).finally(() => ignore = true)
    },[])

    return (
        <div style={{ position: "relative",height:"569px"}}>
            <MainContainer responsive>
                <SideBar focusConv={focusConv} setFocusConv={setFocusConv}/>
                <Conversation focusConv={focusConv} messageData={messageData}/>
            </MainContainer>

        </div>
    );
});



export default ChatRoom;