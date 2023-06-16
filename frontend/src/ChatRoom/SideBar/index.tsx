import { ConversationList, Search, Sidebar} from "@chatscope/chat-ui-kit-react";
import React from "react";
import { Conversation } from "./Conversation";
import useSWR from 'swr'

const fetcher = (url:string): Promise<any[]> => fetch(url,{method: 'Get', mode: "cors"}
).then(res => res.json())
export const SideBar = () => {

    // @ts-ignore

    const { data, error, isLoading } = useSWR('http://localhost:8080/api/v1/roomData/', fetcher)

    if(data === undefined) return <> undefined </>

    return (
        <Sidebar position="left" scrollable={false}>
            <Search placeholder="Search..." />
            <ConversationList>
                {data.map(data =>
                    <Conversation name={data.name} lastSenderName="Lilly" info="Yes i can do it for you" />
                    )}

            </ConversationList>
        </Sidebar>
    )


}