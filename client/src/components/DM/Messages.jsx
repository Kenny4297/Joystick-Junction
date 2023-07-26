import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Messages = () => {
    const [conversations, setConversations] = useState([]);
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
            const fetchConversations = async () => {
                try {
                    const response = await axios.get(`/api/messages/conversations/${userId}`);
                    const conversations = response.data;
                    if (conversations.some((conversation) => !conversation)) {
                        console.error('Received null or undefined conversation');
                    } else {
                        setConversations(conversations);
                    }
                } catch (err) {
                    console.error(err);
                }
            }
            
    
            fetchConversations();
        }
    }, [userId]);

    return (
        <section>
            {conversations.map((conversation) => (
                conversation && (
                    <div 
                        key={conversation.id} 
                        style={{ 
                            position: 'relative', 
                            height: 'auto',  
                            width:'5rem',
                            borderBottom:'2px solid var(--grey)', 
                            backgroundColor: 'var(--metal)'
                        }}
                    >
                        <Link to={`/individualMessages/${userId}/${conversation.otherUserId}`}>
                            <h3>{conversation.username}</h3>
                        </Link>
                    </div>
                )
            ))}
        </section>
    );
};

export default Messages;
