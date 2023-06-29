
import {  Search, Sidebar } from "@chatscope/chat-ui-kit-react";
import React from "react";
import {ConversationParent} from "./Conversation";
import {SidebarData} from "../Model/SidebarData";


interface ConversationProps{
    focusConv: string,
    setFocusConv: React.Dispatch<React.SetStateAction<string>>
    sidebarData: SidebarData[]
}

export const SideBar: React.FC<ConversationProps>= React.memo(({focusConv, setFocusConv,sidebarData}) => {

    const handleConversationClick = (conversation: string) => {
        setFocusConv(conversation);
    };

    return (
        <Sidebar key={"tests"} position="left" scrollable={false}>
            <Search placeholder="Search..." />
                {sidebarData.map(data =>
                    <ConversationParent
                        key={data.roomId}
                        conversation={data}
                        onClick={handleConversationClick}
                        activeId={focusConv}
                    />
                )}
        </Sidebar>
    )

});