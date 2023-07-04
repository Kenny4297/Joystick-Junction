import React, { useContext, useEffect, useState } from "react";
import { GameContext } from "../../contexts/GameContext";
import { UserContext } from '../../contexts/UserContext';
import { useParams } from "react-router-dom";
import Modal from "react-modal";
import axios from "axios";  

Modal.setAppElement('#root');

const GameCategoriesPage = () => {
    const { gameData, fetchGameById } = useContext(GameContext);
    const { gameId, categoryPage } = useParams();
    const [user, setUser] = useContext(UserContext);

    const [modalIsOpen, setIsOpen] = useState(false);
    const [postTitle, setPostTitle] = useState("");
    const [postContent, setPostContent] = useState("");
    const [posts, setPosts] = useState([]);  // New state for posts

    useEffect(() => {
        if (user && user.id) {
        console.log(user);
        console.log(user.id)
        }
    }, [user])

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        // Create a new post object
        const newPost = {
            game_id: gameId,
            category: categoryPage,
            post_date: new Date().toISOString(),
            post_title: postTitle,
            post_content: postContent,
            user_id: user.id,  
        };

        try {
            // Send a POST request to your server
            const response = await axios.post("/api/posts/", newPost);

            // If successful, add the new post to posts state and clear the form
            if (response.status === 201) {
                setPosts([...posts, response.data]);
                setPostTitle("");
                setPostContent("");
                closeModal();
            }
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchGameById(gameId);
    }, [gameId, fetchGameById]);

    return (
        <>
            <div>
                <h2>
                    {categoryPage.charAt(0).toUpperCase() +
                        categoryPage.slice(1)}
                </h2>
                <h1>{gameData.title}</h1>
                <img src={gameData.thumbnail} alt={gameData.title} />
                <p>Developer: {gameData.developer}</p>
                <p>Genre: {gameData.genre}</p>
                <p>Platform: {gameData.platform}</p>
                <p>Publisher: {gameData.publisher}</p>
                <p>Release Date: {gameData.release_date}</p>
                <p>Description: {gameData.short_description}</p>
                <a href={gameData.game_url}>Play Now</a>
                <button onClick={openModal}>Open Modal</button>
            </div>

            {posts.map((post, index) => (
                <p key={index}>{post.post_content}</p>
            ))}

            {/* The Modal itself */}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
            >
                <>
                    <h2>Create a post!</h2>
                    <form onSubmit={handleFormSubmit}>
                        <input
                            type="text"
                            value={postTitle}
                            onChange={(event) =>
                                setPostTitle(event.target.value)
                            }
                            placeholder="Post Title"
                        />
                        <textarea
                            value={postContent}
                            onChange={(event) =>
                                setPostContent(event.target.value)
                            }
                            placeholder="Write your post here..."
                        />
                        <button type="submit">Submit</button>
                    </form>
                </>
            </Modal>
        </>
    );
};

export default GameCategoriesPage;
