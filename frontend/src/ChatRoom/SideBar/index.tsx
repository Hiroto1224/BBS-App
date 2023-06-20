
import { ConversationList, Search, Sidebar, Conversation} from "@chatscope/chat-ui-kit-react";
import React, {useState} from "react";
import useSWR from 'swr'
import {ConversationParent} from "./Conversation";


interface SideBarData {
    id: string
    name: string
    senderName: string
    message: string
    active: boolean
}

const fetcher = (url:string): Promise<any[]> => fetch(url,{method: 'Get', mode: "cors"}
).then(res => res.json())
export const SideBar = () => {

    const { data: sideBarData, error, isLoading } = useSWR('http://localhost:8080/api/v1/roomData/sideBar', fetcher)

    if(!sideBarData) return <></>

    console.log(sideBarData)

    const handleConversationClick = (conversation: string) => {

    };

    return (
        <Sidebar key={sideBarData.length} position="left" scrollable={false}>
            <Search placeholder="Search..." />
            <ConversationList key={"conversationList"}>
                {sideBarData.map(data =>
                    <ConversationParent
                        conversation={data}
                        onClick={handleConversationClick}/>
                )}

            </ConversationList>
        </Sidebar>
    )

}
