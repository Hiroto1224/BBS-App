import React from "react";
import { Conversation } from "@chatscope/chat-ui-kit-react"

import useSWR from 'swr'

interface ConversationData{
    roomId: string,
    roomName: string,
    senderName: string,
    message: string
    active: boolean
}

interface ConversationProps{
    conversation: ConversationData,
    onClick: (conversationId: string) => void
}

export const ConversationParent: React.FC<ConversationProps> = ({ conversation,onClick }) => {
    const handleClick: React.MouseEventHandler<HTMLDivElement> = () => {
        onClick(conversation.roomId);
    };

    return (
        <div onClick={handleClick}>
        <Conversation key={conversation.roomId}
                      name={conversation.roomName}
                      lastSenderName={conversation.senderName}
                      info={conversation.message}
                      active={conversation.active}
                      />
        </div>
    )
}
