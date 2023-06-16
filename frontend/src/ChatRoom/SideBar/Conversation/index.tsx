import { Conversation as CS } from "@chatscope/chat-ui-kit-react"
import React from "react";
interface ConverSationData {
    name: string
    lastSenderName: string
    info: string
}
export const Conversation = (props: ConverSationData) => {

    return (
        <CS name={props.name} lastSenderName={props.lastSenderName} info={props.info} active/>
    )

}
