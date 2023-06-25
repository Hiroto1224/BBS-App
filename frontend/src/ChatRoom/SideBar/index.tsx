
import {  Search, Sidebar } from "@chatscope/chat-ui-kit-react";
import React from "react";
import useSWR from 'swr'
import {ConversationParent} from "./Conversation";
import {fetcher} from "../../Component/fetcher";



interface ConversationProps{
    focusConv: string,
    setFocusConv: React.Dispatch<React.SetStateAction<string>>
}

export const SideBar: React.FC<ConversationProps>= ({focusConv, setFocusConv}) => {

    const { data: sideBarData, error, isLoading } =
        useSWR('http://localhost:8080/api/v1/roomData/sideBar', fetcher,{
            refreshInterval:10000
    })

    if(!sideBarData) return <></>

    const handleConversationClick = (conversation: string) => {
        setFocusConv(conversation);
    };

    return (
        <Sidebar key={"tests"} position="left" scrollable={false}>
            <Search placeholder="Search..." />
                {sideBarData.map(data =>
                    <ConversationParent
                        key={data.roomId}
                        conversation={data}
                        onClick={handleConversationClick}
                        activeId={focusConv}
                    />
                )}
        </Sidebar>
    )

}

