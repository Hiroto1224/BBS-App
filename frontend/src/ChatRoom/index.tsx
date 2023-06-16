import React from 'react'

import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css'
import {
    ChatContainer, ConversationHeader,
    MainContainer, Message, MessageInput,
    MessageList
}
    from '@chatscope/chat-ui-kit-react'
import { SideBar } from './SideBar'

const ChatRoom = () => {

    // const viewTodos:string[] = [ 'test', 'test2', 'test2', 'test2', 'test2', 'test2', 'test2', 'test2', 'test2', 'test2', 'test2', 'test2', 'test2', 'test2', 'test2', 'test2', 'test2', 'test2', 'test2', 'test2', 'test2' ]

    return (
        <div style={{ position: "relative",height:"569px"}}>
            <MainContainer responsive>
                <SideBar />
                <ChatContainer>
                    <ConversationHeader>
                        <ConversationHeader.Content userName="Test" info="Active 10 mins ago" />
                    </ConversationHeader>
                    <MessageList>
                        <Message
                            model={{
                                message: 'Hello my friend',
                                sentTime: 'just now',
                                sender: 'Joe',
                                direction: "incoming",
                                position: "single"
                            }} >
                            <Message.Footer sender="Emily" sentTime="10:12" />
                        </Message>
                        <Message
                            model={{
                                message: 'Hello my friend',
                                sentTime: 'just now',
                                sender: 'Joe',
                                direction: "outgoing",
                                position: "last"
                            }} >
                        </Message>
                        <Message
                            model={{
                                message: 'Hello my friend',
                                sentTime: 'just now',
                                sender: 'Joe',
                                direction: "incoming",
                                position: "single"
                            }} >
                            <Message.Footer sender="Emily" sentTime="10:12" />
                        </Message>
                        <Message
                            model={{
                                message: 'Hello my friend',
                                sentTime: 'just now',
                                sender: 'Joe',
                                direction: "outgoing",
                                position: "last"
                            }} >
                        </Message><Message
                        model={{
                            message: 'Hello my friend',
                            sentTime: 'just now',
                            sender: 'Joe',
                            direction: "incoming",
                            position: "single"
                        }} >
                        <Message.Footer sender="Emily" sentTime="10:12" />
                    </Message>
                        <Message
                            model={{
                                message: 'Hello my friend',
                                sentTime: 'just now',
                                sender: 'Joe',
                                direction: "outgoing",
                                position: "last"
                            }} >
                        </Message><Message
                        model={{
                            message: 'Hello my friend',
                            sentTime: 'just now',
                            sender: 'Joe',
                            direction: "incoming",
                            position: "single"
                        }} >
                        <Message.Footer sender="Emily" sentTime="10:12" />
                    </Message>
                        <Message
                            model={{
                                message: 'Hello my friend',
                                sentTime: 'just now',
                                sender: 'Joe',
                                direction: "outgoing",
                                position: "last"
                            }} >
                        </Message><Message
                        model={{
                            message: 'Hello my friend',
                            sentTime: 'just now',
                            sender: 'Joe',
                            direction: "incoming",
                            position: "single"
                        }} >
                        <Message.Footer sender="Emily" sentTime="10:12" />
                    </Message>
                        <Message
                            model={{
                                message: 'Hello my friend',
                                sentTime: 'just now',
                                sender: 'Joe',
                                direction: "outgoing",
                                position: "last"
                            }} >
                        </Message>
                    </MessageList>
                    <MessageInput placeholder="Type Message here"/>
                </ChatContainer>
            </MainContainer>

        </div>
    );
}



export default ChatRoom;