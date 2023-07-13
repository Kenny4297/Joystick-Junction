import React, { useContext, useEffect, useState } from "react";
import { GameContext } from "../../contexts/GameContext";
import { UserContext } from '../../contexts/UserContext';
import { useParams, Link } from "react-router-dom";
import Modal from "react-modal";
import axios from "axios";  
import noUser from '../Assets/Images/noUser.png'

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
    const [likes, setLikes] = useState([]);

    useEffect(() => {
        if (user && user.id) {
            console.log(user);
            console.log(user.id);
        }
    }, [user])

    useEffect(() => {
        const fetchPostsByGameAndCategory = async () => {
            try {
                const response = await axios.get(`/api/posts/game/${gameId}/category/${categoryPage}`);
    
                const postsWithNestedData = response.data.map(post => ({
                    ...post,
                    comments: post.comments || [],
                    likes: post.likes || [],
                    user: post.user || null,
                }));
    
                setPosts(postsWithNestedData);
            } catch (err) {
                console.error(err);
                if (err.response && err.response.status === 404) {
                    console.error(`No posts found for game ${gameId} and category ${categoryPage}`);
                    setPosts([]); 
                }
            }
        }
    
        fetchPostsByGameAndCategory();
    }, [gameId, categoryPage]);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const handleLikeComment = async (commentId) => {
        try {
            const response = await axios.post(`/api/likes/comments/${commentId}`, {}, { withCredentials: true });
            setPosts(posts.map(post => {
                return {
                    ...post,
                    comments: post.comments.map(comment => {
                        if(comment.id === commentId) {
                            return { ...comment, likes: [...comment.likes, response.data] }
                        }
                        return comment;
                    })
                };
            }));
        } catch (error) {
            console.error(error);
        }
    };
    
    const handleUnlikeComment = async (commentId) => {
        try {
            const { id: userId } = user;
            const response = await axios.delete(`/api/likes/comments`, { data: { comment_id: commentId, user_id: userId } });
            
            if(response.status === 200) {
                setPosts(posts.map(post => {
                    return {
                        ...post,
                        comments: post.comments.map(comment => {
                            if(comment.id === commentId) {
                                return {
                                    ...comment,
                                    likes: comment.likes.filter(like => !(like.user_id === userId && like.comment_id === commentId))
                                };
                            }
                            return comment;
                        })
                    };
                }));
            }
        } catch (error) {
            console.log(error);
        }
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
    
    const handleAddComment = async (postId, index) => {
        console.log("post.id:", postId);
        console.log("index:", index);
        try {
            await axios.post('/api/comments', { post_id: postId, comment_content: newComment[index] }, { withCredentials: true });
    
            const updatedNewComments = [...newComment];
            if (updatedNewComments[index] === undefined) {
                updatedNewComments[index] = '';
            }
            updatedNewComments[index] = '';
            setNewComment(updatedNewComments);
            
            const response = await axios.get(`/api/comments/${postId}`);
    
            const updatedComments = [...comments];
            if (updatedComments[index] === undefined) {
                updatedComments[index] = [];
            }
    
            updatedComments[index] = response.data;
    
            setComments(updatedComments);
        } catch (error) {
            console.error(error);
        }
    };

    const handleLikePost = async (postId) => {
        try {
            const response = await axios.post('/api/likes/posts', { post_id: postId }, { withCredentials: true });
            if(response.status === 200) {
                setPosts(posts.map(post => {
                    if(post.id === postId) {
                        return {...post, likes: [...post.likes, response.data]};
                    }
                    return post;
                }));
            }
        } catch (error) {
            console.error(error);
        }
    };
    
    
    const handleUnlikePost = async (postId) => {
        try {
            const { id: userId } = user;
            const response = await axios.delete(`/api/likes/posts`, { data: { post_id: postId, user_id: userId } });
            if(response.status === 200) {
                setPosts(posts.map(post => {
                    if (post.id === postId) {
                        return {
                            ...post,
                            likes: post.likes.filter(like => !(like.user_id === userId && like.post_id === postId))
                        };
                    }
                    return post;
                }));
            }
        } catch (error) {
            console.error(error);
        }
    };  
    

    useEffect(() => {
        fetchGameById(gameId);
    }, [gameId, fetchGameById]);

    useEffect(() => {
        const fetchPostsByGameAndCategory = async () => {
          console.log("Test test?")
          try {
            const postResponse = await axios.get(`/api/posts/game/${gameId}/category/${categoryPage}`);
            console.log("Post response:", postResponse)
      
            const updatedPostData = await Promise.all(postResponse.data.map(async post => {
              try {
                const commentsResponse = await axios.get(`/api/comments/${post.id}`);
                const comments = commentsResponse.data.length > 0 ? commentsResponse.data : [];
                return { ...post, comments };
              } catch (err) {
                console.error(err);
                return { ...post, comments: [] };
              }
            }));
      
            setPosts(updatedPostData);
          } catch (err) {
            console.error(err);
            if (err.response && err.response.status === 404) {
              console.error(`No posts found for game ${gameId} and category ${categoryPage}`);
              setPosts([]);
            }
          }
        }
      
        fetchPostsByGameAndCategory();
      }, [gameId, categoryPage]);
      
    
    

    useEffect(() => {
        const fetchLikesForPosts = async () => {
            if (Array.isArray(posts)) {
                const allLikes = await Promise.all(posts.map(async (post) => {
                    const response = await axios.get(`/api/likes/posts/${post.id}`);
                    return response.data;
                }));
                setLikes(allLikes);
            }
        };
    
        fetchLikesForPosts();
    }, [posts]);
    
    useEffect(() => {
        const fetchLikesForComments = async () => {
            if (Array.isArray(posts)) {
                for (let post of posts) {
                    if (Array.isArray(post.comments)) {
                        const allLikes = await Promise.all(post.comments.map(async (comment) => {
                            const response = await axios.get(`/api/likes/comments/${comment.id}`);
                            return response.data;
                        }));
    
                        post.comments = post.comments.map((comment, index) => {
                            return { ...comment, likes: allLikes[index] };
                        });
                    }
                }
            }
        };
    
        fetchLikesForComments();
    }, [posts]);
    

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

            {Array.isArray(posts) && posts.map((post, index) => (
            <div key={index} className="post">
                <div className="post-header">
                <Link to={`/users/${post.user_id}`}>
                    <img className="post-avatar" src={(post.user && post.user.profileImage) ? post.user.profileImage : noUser} alt={post.user ? post.user.username : 'Anonymous'} style={{width:'10rem'}} />
                    <h4>{post.user ? post.user.username : 'Anonymous'}</h4>
                </Link>
                </div>

                <h3>{post.post_title}</h3>
                <p>{post.post_content}</p>
                <div>
                {post.comments && post.comments.map((comment, idx) => (
                    <div key={idx}>
                    <p>{comment.comment_content}</p>
                    {comment.likes && comment.likes.find(like => user && like.user_id === user.id)
                        ? <button onClick={() => handleUnlikeComment(comment.id)}>Unlike</button>
                        : <button onClick={() => handleLikeComment(comment.id)}>Like</button>
                    }
                    <p>{comment.likes && comment.likes.length} likes</p>
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
                <button onClick={() => handleAddComment(post.id, index)}>Add Comment</button>
                {post.likes.find(like => user && like.user_id === user.id)
                ? <button onClick={() => handleUnlikePost(post.id)}>Unlike</button>
                : <button onClick={() => handleLikePost(post.id)}>Like</button>
                }
                <p>{post.likes && post.likes.length} likes</p>
            </div>
            ))}

            {Array.isArray(posts) && posts.length === 0 && (
            <p>No posts found for this category.</p>
            )}


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
