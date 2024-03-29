import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const SendMessageToUser = () => {
    const { userId } = useParams();
    const [userData, setUserData] = useState(null);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchUserById = async () => {
            try {
                const response = await axios.get(`/api/users/users/${userId}`);
                setUserData(response.data);
            } catch (err) {
                console.error(err);
            }
        }
        fetchUserById();
    }, [userId]);

    const sendMessage = async () => {
        try {
            await axios.post('/api/messages/', { receiverId: userId, message });
            alert('Message sent!');
            setMessage(""); 
        } catch (err) {
            console.error(err);
            alert('Failed to send the message!');
        }
    }

    if (!userData) {
        <div style={{textAlign:'center', color:'white', marginTop:'5rem'}}>Loading...</div>;
    }

    return (
        <section>
            <h1>Send {userData.username} a message!</h1>
            <textarea 
                value={message} 
                onChange={e => setMessage(e.target.value)}
                placeholder="Type your message here..."
            />
            <button onClick={sendMessage}>Submit</button>
        </section>
    );
};

export default SendMessageToUser;
