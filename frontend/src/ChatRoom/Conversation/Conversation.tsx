import React, {useEffect} from "react";
import {ChatContainer, ConversationHeader, Message, MessageInput, MessageList} from "@chatscope/chat-ui-kit-react";
import useSWR, {mutate} from "swr";
import {fetcher, roomDataFetcher} from "../../Component/fetcher";
import {MessageManager} from "./MessageManager/MessageManager";

interface ConversationProps {
    focusConv: string
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
export const Conversation: React.FC<ConversationProps> = ({focusConv}) => {
    const { roomData, isLoading: isRoomLoading } = useRoomData(focusConv);

    const { chatData, isLoading: isChatLoading } = useChatData(focusConv);

    let lastChatId = chatData ? chatData[chatData.length - 1].id : '';

    const { data: newMessage } = useSWR(lastChatId ? `${baseAPI}/roomData/${focusConv.toString()}/ChatData/${lastChatId}` : null, fetcher,{
        refreshInterval:5000
    });

    if (newMessage !== undefined) {
        if (newMessage.length !== 0 && chatData) {
            mutate(`${baseAPI}/roomData/${focusConv.toString()}/ChatData`, [...chatData, ...newMessage], false);
            console.log("poling")
            console.log(newMessage)
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
                  {chatData ? chatData.map(data =>
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
