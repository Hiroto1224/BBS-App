import React from "react";
import { Conversation } from "@chatscope/chat-ui-kit-react"

import useSWR from 'swr'
import { ConversationData } from "../Model/ConversationData";



interface ConversationProps{
    conversation: ConversationData,
    onClick: (conversationId: string) => void
}

export const ConversationParent: React.FC<ConversationProps> = ({ conversation,onClick }) => {
    const handleClick: React.MouseEventHandler<HTMLDivElement> = () => {
        onClick(conversation.roomId);
    };
    console.log(conversation.active)
    return (
        <div onClick={handleClick}>

        </div>
    )
}
