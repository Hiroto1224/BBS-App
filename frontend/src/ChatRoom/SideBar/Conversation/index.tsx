import React from "react";
import { Conversation } from "@chatscope/chat-ui-kit-react"

import useSWR from 'swr'
import {SidebarData} from "../../Model/SidebarData";

interface ConversationData{
    roomId: string,
    roomName: string,
    senderName: string,
    message: string
}

interface ConversationProps{
    conversation: SidebarData,
    onClick: (conversationId: string) => void,
    activeId: string
}

export const ConversationParent: React.FC<ConversationProps> = ({ conversation,onClick, activeId }) => {
    const handleClick: React.MouseEventHandler<HTMLDivElement> = () => {
        onClick(conversation.roomId);
    };

    return (
        <div onClick={handleClick}>
            <Conversation
                      name={conversation.roomName}
                      lastSenderName={conversation.roomName}
                      info={conversation.message}
                      active={conversation.roomId === activeId}
                      />
        </div>
    )
}
