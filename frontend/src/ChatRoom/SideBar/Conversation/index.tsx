import React from "react";
import { Conversation as CS } from "@chatscope/chat-ui-kit-react"

import useSWR from 'swr'

interface RoomData{
    id: string,
    name: string,
    userIds: string[]
}

/*
const fetcherone = (url:string): Promise<any> => fetch(url,{method: 'Get', mode: "cors"}
).then(res => res.json())
export const Conversation = (props: RoomData) => {


    if (!chatData) return <></>

    if (!userData) return <></>

    return (
        <CS key={chatData.at(1).id} name={props.name} lastSenderName={userData.firstName}
            info={chatData.at(chatData.length - 1).message}
            active/>
    )
}*/
