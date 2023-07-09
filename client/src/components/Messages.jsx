import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Messages = () => {
    const [messages, setMessages] = useState([]);
    const [userId, setUserId] = useState(null);
    const [messageContent, setMessageContent] = useState(''); 

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const response = await axios.get('/api/users/verify');
                setUserId(response.data.id);  
            } catch (err) {
                console.error(err);
            }
        }

        fetchCurrentUser();
    }, []);

    useEffect(() => {
        if (userId) {
            const fetchMessages = async () => {
                try {
                    const response = await axios.get(`/api/messages/${userId}`);
                    setMessages(response.data);
                } catch (err) {
                    console.error(err);
                }
            }
    
            fetchMessages();
        }
    }, [userId]); 

    const handleMessageChange = (event) => { 
        setMessageContent(event.target.value);
    }

    const handleSendMessage = async () => { 
        try {
            const response = await axios.post('/api/messages/', { message: messageContent, receiverId: userId });
            const newMessage = response.data;
    
            console.log('New message:', newMessage);
            
            setMessages(prevMessages => [...prevMessages, newMessage]); 
            setMessageContent(''); 
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div>
            {messages.map(message => (
                <div key={message.id}>
                    <h3>{message.sender.username}</h3>
                    <p>{message.message_content}</p>
                </div>
            ))}
            <textarea value={messageContent} onChange={handleMessageChange}></textarea>
            <button onClick={handleSendMessage}>Send</button> 
        </div>
    );
};

export default Messages;
