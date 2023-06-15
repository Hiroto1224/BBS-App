import React from 'react'

import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css'
import {ChatContainer, ConversationHeader,
    InfoButton, MainContainer, Message, MessageInput,
    MessageList, VideoCallButton, VoiceCallButton }
    from '@chatscope/chat-ui-kit-react'

const ChatRoom = () => {

    const viewTodos:string[] = [ 'test', 'test2', 'test2', 'test2', 'test2', 'test2', 'test2', 'test2', 'test2', 'test2', 'test2', 'test2', 'test2', 'test2', 'test2', 'test2', 'test2', 'test2', 'test2', 'test2', 'test2' ]

    return (
        <div style={{ position: "relative",height:"500px"}}>
            <MainContainer style={{fontSize: "1em"}}>
                <ChatContainer>
                    <ConversationHeader>
                        <ConversationHeader.Content userName="Test" info="Active 10 mins ago" />
                        <ConversationHeader.Actions>
                            <VoiceCallButton />
                            <VideoCallButton />
                            <InfoButton />
                        </ConversationHeader.Actions>
                    </ConversationHeader>
                    <MessageList>
                        <Message
                            model={{
                                message: 'Hello my friend',
                                sentTime: 'just now',
                                sender: 'Joe',
                                direction: 0,
                                position: "single"
                            }} >
                            <Message.Footer sender="Emily" sentTime="just now" />
                        </Message>
                    </MessageList>
                    <MessageInput placeholder="Type Message here"/>
                </ChatContainer>
            </MainContainer>

        </div>
    );
}



export default ChatRoom;