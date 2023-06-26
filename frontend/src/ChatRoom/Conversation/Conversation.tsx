import React, {useEffect, useState} from "react";
import {ChatContainer, ConversationHeader, Message, MessageInput, MessageList} from "@chatscope/chat-ui-kit-react";
import useSWR, {mutate} from "swr";
import {fetcher, roomDataFetcher} from "../../Component/fetcher";
import {MessageManager} from "./MessageManager/MessageManager";
import { MessageData } from "../Model/Message"

interface ConversationProps {
    focusConv: string
    messageData: MessageData[]
}
const baseAPI = 'http://localhost:8080/api/v1';

const useRoomData = (focusConv: string) => {
    const { data: roomData, error } = useSWR(
        focusConv ? `${baseAPI}/roomData/${focusConv}` :null,
        roomDataFetcher);
    return {
        roomData,
        isLoading: !error && !roomData,
        isError: error
    }
}

const useChatData = (focusConv: string) => {
    const { data: chatData, error } = useSWR(
            focusConv ? `${baseAPI}/roomData/${focusConv.toString()}/ChatData` : null,
        fetcher);
    if (chatData !== undefined) {
        if (chatData.length) {
            return {
                chatData,
                isLoading: !error && !chatData,
                isError: error
            }
        }
    }
    return {
        undefined,
        isLoading: !error && !chatData,
        isError: error
    }
}
export const Conversation: React.FC<ConversationProps> = ({focusConv, messageData}) => {
/*


    const {chatData, isLoading: isChatLoading} = useChatData(focusConv);
*/
    const {roomData, isLoading: isRoomLoading} = useRoomData(focusConv);
    const [viewMessage,setViewMessage] = useState<MessageData[]>([])
    const [lastChatId, setLastChatId] = useState('')
    useEffect(() => {
        const view = messageData.filter((data) => data.roomId === focusConv);
        setViewMessage([...view])
        if(viewMessage !== undefined) {
            if(viewMessage.length !== 0) {
                setLastChatId(viewMessage[viewMessage.length - 1].id);
            }
        }
    },[focusConv])
    console.log(lastChatId)
    const {data: newMessage} = useSWR(lastChatId ? `${baseAPI}/roomData/${focusConv.toString()}/ChatData/${lastChatId}` : null, fetcher, {
        refreshInterval: 60000
    });

    if (newMessage !== undefined) {
        if (newMessage.length !== 0 && viewMessage) {
            mutate(`${baseAPI}/roomData/${focusConv.toString()}/ChatData`, [...viewMessage, ...newMessage], false);
        }
    }
    return (

        <ChatContainer>
            <ConversationHeader>
                <ConversationHeader.Content userName={roomData ? roomData.name : ''} info={""}/>
            </ConversationHeader>
            {/*chatContainerがMessageManagerを許容してくれないみたい*/}
            <MessageManager roomId={focusConv}/>
            <MessageList>
                {viewMessage ? viewMessage.map(data =>
                    <Message
                        model={{
                            message: data.message,
                            sentTime: data.timeStamp,
                            sender: data.sendUserId,
                            direction: "incoming",
                            position: "single"
                        }}
                    />
                ) : <></>}
            </MessageList>
            <MessageInput placeholder="Type Message here"/>
        </ChatContainer>

    );
}