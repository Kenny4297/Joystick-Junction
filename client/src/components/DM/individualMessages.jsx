import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const IndividualMessages = () => {
    const { userId, otherUserId } = useParams();
    const [messages, setMessages] = useState([]);
    const [messageContent, setMessageContent] = useState("");

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get(`/api/messages/${userId}/${otherUserId}`);
                setMessages(response.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchMessages();
    }, [userId, otherUserId]);

    const handleMessageChange = (event) => {
        setMessageContent(event.target.value);
    };

    const handleSendMessage = async () => {
        try {
            const response = await axios.post("/api/messages/", { message: messageContent, receiverId: otherUserId });
            const newMessage = response.data;
            setMessages((prevMessages) => [...prevMessages, newMessage]);
            setMessageContent("");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <section>
            {messages.map((message) => (
                <div key={message.id}>
                    <h3>{message.sender.username}</h3>
                    <p>{message.message_content}</p>
                </div>
            ))}
            <textarea value={messageContent} onChange={handleMessageChange}></textarea>
            <button onClick={handleSendMessage}>Send</button>
        </section>
    );
};

export default IndividualMessages;
