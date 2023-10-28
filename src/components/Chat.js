import React, { useState, useEffect } from 'react';
import { ChatEngine, getOrCreateChat, getChats } from 'react-chat-engine';

const ChatPage = () => {
    const [username, setUsername] = useState('');
    const [chatID, setChatID] = useState('');
    const [participants, setParticipants] = useState([]);
    const [isDirectChat, setIsDirectChat] = useState(true);
    const [chats, setChats] = useState([]);

    const creds = {
        projectID: "2dec56db-af5f-4e84-af94-ee0da1332fbe",
        userName: "Lokesh",
        userSecret: "lokesh@123"
    }

    const urlParams = new URLSearchParams(window.location.search);
    const chatIDFromURL = urlParams.get('chatId');

    useEffect(() => {
        const openChatByChatID = async () => {
            try {
                await getOrCreateChat(creds, { is_direct_chat: false, title: chatIDFromURL, usernames: [] });
                console.log('Opened chat with chatID:', chatID);
            } catch (error) {
                console.error('Error opening chat:', error);
            }
        };
        openChatByChatID();
    }, [creds, chatID]);

    useEffect(() => {
        const interval = setInterval(() => {
            syncChatList(creds);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const syncChatList = async (creds) => {
        const chatList = await getChats(creds);
        setChats(chatList);
    };

    const refreshWebPage = () => {
        setTimeout(() => {
            window.location.reload();
        }, 5000)
    }
    const createChat = (creds) => {
        if (isDirectChat) {
            // Create a direct chat
            getOrCreateChat(
                creds,
                { is_direct_chat: true, usernames: [username] },
                () => setUsername('')
            );
        } else {
            // Create a group chat with chatID and participants
            getOrCreateChat(
                creds,
                { is_direct_chat: false, title: chatID, usernames: participants },
                () => {
                    setChatID('');
                    setParticipants([]);
                }
            );
        }
        refreshWebPage();
    };

    const renderChatForm = (creds) => {
        return (
            <div>
                {isDirectChat ? (
                    <div>
                        <input
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <button onClick={() => createChat(creds)}>Create Direct Chat</button>
                    </div>
                ) : (
                    <div>
                        <input
                            placeholder="Group Name (Chat ID)"
                            value={chatID}
                            onChange={(e) => setChatID(e.target.value)}
                        />
                        <input
                            placeholder="Usernames (comma-separated)"
                            value={participants}
                            onChange={(e) => setParticipants(e.target.value.split(','))}
                        />
                        <button onClick={() => createChat(creds)}>Create Group Chat</button>
                    </div>
                )}

                <div>
                    <button onClick={() => setIsDirectChat(!isDirectChat)}>
                        Toggle Chat Type
                    </button>
                </div>
            </div>
        );
    };

    return (
        <ChatEngine
            height="100vh"
            projectID="2dec56db-af5f-4e84-af94-ee0da1332fbe"
            userName="Lokesh"
            userSecret="lokesh@123"
            renderNewChatForm={(creds) => renderChatForm(creds)}
        />
    );
};

export default ChatPage;
