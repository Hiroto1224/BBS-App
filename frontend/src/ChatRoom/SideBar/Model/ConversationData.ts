import useSWR from "swr";

export interface ConversationData{
    roomId: string,
    roomName: string,
    senderName: string,
    message: string
}


export const useSwrConverstation = (key:string,fallbackData:ConversationData[]) => {
    const { data:state, mutate:setState } = useSWR(key,{fallbackData});
    return [state,setState];
}