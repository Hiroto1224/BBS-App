import {Message, MessageInput, MessageList } from "@chatscope/chat-ui-kit-react"
import useSWR from "swr"
import { fetcher } from "../../../Component/fetcher"


interface MessageManagerProps {
    roomId: string
}
export const MessageManager: React.FC<MessageManagerProps> = ({roomId}) => {

    console.log(roomId)
    const { data: messageData, error, isLoading } = useSWR(`http://localhost:8080/api/v1/roomData/${roomId}/ChatData`, fetcher)

    console.log(error)

    console.log("messageData");
    if(!messageData) return <></>

    return (
        <>
            <MessageList>
                {messageData.map(data =>
                    <Message
                        model={{
                            message: data.message,
                            sentTime: data.timeStamp,
                            sender: data.sendUserId,
                            direction: "incoming",
                            position: "single"
                        }}
                    />
                )}
            </MessageList>

        </>
    )
}