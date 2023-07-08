import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Messages = () => {
    const [messages, setMessages] = useState([]);
    const [userId, setUserId] = useState(null);

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

    return (
        <div>
            {messages.map(message => (
                <div key={message.id}>
                    <h3>{message.sender.username}</h3>
                    <p>{message.message}</p>
                </div>
            ))}
        </div>
    );
};

export default Messages;
