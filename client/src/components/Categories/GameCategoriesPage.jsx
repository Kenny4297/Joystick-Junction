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
    const [posts, setPosts] = useState([]); 
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState([]);

    useEffect(() => {
        if (user && user.id) {
        console.log(user);
        console.log(user.id)
        }
    }, [user])

    useEffect(() => {
        // Function to fetch comments for each post
        const fetchCommentsForPosts = async () => {
          const allComments = await Promise.all(posts.map(async (post) => {
            const response = await axios.get(`/api/comments/${post.id}`);
            return response.data;
          }));
          setComments(allComments);
        };

        fetchCommentsForPosts();
      }, [posts]); // Re-fetch comments when posts change

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        console.log(user.id)

        const newPost = {
            game_id: gameId,
            category: categoryPage,
            post_date: new Date().toISOString(),
            post_title: postTitle,
            post_content: postContent,
            user_id: user.id,  
        };

        try {
            const response = await axios.post("/api/posts/", newPost);

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

    const fetchComments = async (postId) => {
        try {
          const response = await axios.get(`/api/comments/${postId}`);
          setComments(response.data);
        } catch (error) {
          console.error(error);
        }
      };
    
      const handleAddComment = async (postId, index) => {
        try {
            await axios.post('/api/comments', { post_id: postId, comment_content: newComment[index] });
    
            const updatedNewComments = [...newComment];
            updatedNewComments[index] = '';
            setNewComment(updatedNewComments);
            
            const response = await axios.get(`/api/comments/${postId}`);
    
            const updatedComments = [...comments];
    
            updatedComments[index] = response.data;
    
            setComments(updatedComments);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchGameById(gameId);
    }, [gameId, fetchGameById]);

    useEffect(() => {
        const fetchPostsByGameAndCategory = async () => {
            try {
                const response = await axios.get(`/api/posts/game/${gameId}/category/${categoryPage}`);
                setPosts(response.data);
            } catch (err) {
                console.error(err);
            }
        }
    
        fetchPostsByGameAndCategory();
    }, [gameId, categoryPage]);
    

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
                <div key={index} className="post">
                <h3>{post.post_title}</h3>
                <p>{post.post_content}</p>
                <div>
                    {comments[index]?.map((comment, idx) => (
                    <div key={idx}>
                        <p>{comment.comment_content}</p>
                    </div>
                    ))}
                </div>
                <textarea 
                    value={newComment[index] || ''} 
                    onChange={(event) => {
                        const updatedComments = [...newComment];
                        updatedComments[index] = event.target.value;
                        setNewComment(updatedComments);
                    }} 
                    placeholder="Add a comment..."
                    />
                <button onClick={() => handleAddComment(post.id, index)}>Submit Comment</button>
                </div>
            ))}

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