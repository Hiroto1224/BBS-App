import { MessageInput } from "@chatscope/chat-ui-kit-react";
import React from "react";
import { useState } from "react";

export const Input = React.memo(() => {

    const [ text, setText ] = useState('')
    const OnSend = (inputText:string) => {
        setText(inputText)
    }

    return (
        <>

        </>
    )
})