import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ViewProfilePage = () => {
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
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Send {userData.username} a message!</h1>
            <textarea 
                value={message} 
                onChange={e => setMessage(e.target.value)}
                placeholder="Type your message here..."
            />
            <button onClick={sendMessage}>Submit</button>
        </div>
    );
};

export default ViewProfilePage;
