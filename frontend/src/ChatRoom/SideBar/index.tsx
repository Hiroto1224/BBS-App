
import { ConversationList, Search, Sidebar, Conversation} from "@chatscope/chat-ui-kit-react";
import axios, {AxiosError, AxiosResponse } from "axios";
import React, {useEffect, useState} from "react";
import useSWR from 'swr'
import {ConversationParent} from "./Conversation";
import {ConversationData, useSwrConverstation} from "./Model/ConversationData";


const fetcher = (url:string): Promise<any[]> => fetch(url,{method: 'Get', mode: "cors"}
).then(res => res.json())

export const SideBar = () => {

    const [sidebarData,setsidebarData] = useSwrConverstation('http://localhost:8080/api/v1/roomData/sideBar',[])

    useEffect(() => {
        axios.get("http://localhost:8080/api/v1/roomData/sideBar")
            .then((res:AxiosResponse) => setsidebarData([res.data]))
            .catch((error:AxiosError) => console.error(error));
    }, []);

    const handleConversationClick = (conversation: string) => {
        sidebarData.forEach((list: any[]) => {
            const changeData = list.find((data: ConversationData ) => data.roomId === conversation);
            console.log("click");
            if (changeData !== undefined) {
                list.map((data: ConversationData) => data.active = false)
                changeData.active = true;
                setsidebarData(sidebarData.map((setDataList: ConversationData[]) =>
                    setDataList.map((data:ConversationData) =>
                        (data.roomId === conversation ? changeData : data)))
                )
            }
        })
        console.log(sidebarData)
    };


    console.log(sidebarData)
    return (
        <Sidebar key={sidebarData.length} position="left" scrollable={false}>
            <Search placeholder="Search..."/>
            <ConversationList key={"conversationList"}>
                {sidebarData.map((list: any[]) => list.map((data: ConversationData) =>
                    <div onClick={() => handleConversationClick(data.roomId)}>
                    <Conversation key={data.roomId}
                                  name={data.roomName}
                                  lastSenderName={data.senderName}
                                  info={data.message}
                                  active={data.active}
                    />
                    </div>
                )) }

            </ConversationList>
        </Sidebar>
    )


}
