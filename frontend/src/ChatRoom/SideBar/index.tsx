import { ConversationList, Search, Sidebar} from "@chatscope/chat-ui-kit-react";
import React from "react";
import { Conversation } from "./Conversation";

export const SideBar = () => {

    return (
        <Sidebar position="left" scrollable={false}>
            <Search placeholder="Search..." />
            <ConversationList>
                <Conversation name="Lilly" lastSenderName="Lilly" info="Yes i can do it for you" />

                <Conversation name="Joe" lastSenderName="Joe" info="Yes i can do it for you"/>

                <Conversation name="Emily" lastSenderName="Emily" info="Yes i can do it for you"/>

                <Conversation name="Kai" lastSenderName="Kai" info="Yes i can do it for you" />

                <Conversation name="Akane" lastSenderName="Akane" info="Yes i can do it for you"/>

                <Conversation name="Eliot" lastSenderName="Eliot" info="Yes i can do it for you"/>

                <Conversation name="Zoe" lastSenderName="Zoe" info="Yes i can do it for you" />

                <Conversation name="Patrik" lastSenderName="Patrik" info="Yes i can do it for you"/>

            </ConversationList>
        </Sidebar>
    )


}