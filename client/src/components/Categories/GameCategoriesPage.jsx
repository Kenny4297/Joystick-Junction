import React, { useContext, useEffect, useState } from "react";
import { GameContext } from "../../contexts/GameContext";
import { UserContext } from "../../contexts/UserContext";
import NoUser from '../Assets/Images/noUser.png'
import { useParams } from "react-router-dom";
import Modal from "react-modal";
import axios from "axios";
import StrategyAndTipsMock from "./MockPosts";

Modal.setAppElement("#root");

const GameCategoriesPage = () => {
    const { gameData, fetchGameById } = useContext(GameContext);
    const { gameId, categoryPage } = useParams();
    const [user] = useContext(UserContext);

    const [modalIsOpen, setIsOpen] = useState(false);
    const [postTitle, setPostTitle] = useState("");
    const [postContent, setPostContent] = useState("");
    const [posts, setPosts] = useState([]);
    const [newComment, setNewComment] = useState([]);
    const [openIndex, setOpenIndex] = useState(null);

    // Modal Section
    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const customStyles = {
        content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "var(--white)",
            color: "var(--metal)",
            borderRadius: "10px",
            padding: "20px",
            width: "60%",
            border: "1px solid var(--grey)",
        },
        overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
    };

    const handleLikeComment = async (commentId) => {
        try {
            const response = await axios.post(`/api/likes/comments/${commentId}`, {}, { withCredentials: true });
            setPosts(
                posts.map((post) => {
                    return {
                        ...post,
                        comments: post.comments.map((comment) => {
                            if (comment.id === commentId) {
                                const commentLikes = Array.isArray(comment.likes) ? comment.likes : [];
                                return {
                                    ...comment,
                                    likes: [...commentLikes, response.data],
                                };
                            }
                            return comment;
                        }),
                    };
                })
            );
        } catch (error) {
            console.error(error);
        }
    };

    const handleUnlikeComment = async (commentId) => {
        try {
            const { id: userId } = user;
            const response = await axios.delete(`/api/likes/comments/${commentId}`, { data: { user_id: userId } });

            if (response.status === 200) {
                setPosts(
                    posts.map((post) => {
                        return {
                            ...post,
                            comments: post.comments.map((comment) => {
                                if (comment.id === commentId) {
                                    return {
                                        ...comment,
                                        likes: comment.likes.filter((like) => like.user_id !== userId),
                                    };
                                }
                                return comment;
                            }),
                        };
                    })
                );
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

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
        try {
            await axios.post("/api/comments", { post_id: postId, comment_content: newComment[index] }, { withCredentials: true });

            const updatedNewComments = [...newComment];
            if (updatedNewComments[index] === undefined) {
                updatedNewComments[index] = "";
            }
            updatedNewComments[index] = "";
            setNewComment(updatedNewComments);

            const commentResponse = await axios.get(`/api/comments/${postId}`);

            setPosts(
                posts.map((post) => {
                    if (post.id === postId) {
                        return {
                            ...post,
                            comments: commentResponse.data.map((comment) => ({
                                ...comment,
                                user: {
                                    ...comment.user,
                                    username: comment.user.username,
                                    profileImage: comment.user.profileImage,
                                },
                            })),
                        };
                    }
                    return post;
                })
            );
        } catch (error) {
            console.error(error);
        }
    };

    const handleLikePost = async (postId) => {
        try {
            const response = await axios.post(`/api/likes/posts/${postId}`, {}, { withCredentials: true });

            if (response.status === 201) {
                setPosts(posts.map((post) => (post.id === postId ? response.data : post)));
            }
        } catch (error) {
            console.error("Error in handleLikePost:", error);
        }
    };

    const handleUnlikePost = async (postId) => {
        try {
            const { id: userId } = user;
            const response = await axios.delete(`/api/likes/posts/${postId}`, {
                data: { user_id: userId },
            });

            if (response.status === 200) {
                setPosts(
                    posts.map((post) => {
                        if (post.id === postId) {
                            return {
                                ...post,
                                likes: post.likes.filter((like) => like.user_id !== userId),
                            };
                        }
                        return post;
                    })
                );
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchGameById(gameId);
    }, [gameId, fetchGameById]);

    useEffect(() => {
        const fetchPostsByGameAndCategory = async () => {
            try {
                const postResponse = await axios.get(`/api/posts/game/${gameId}/category/${categoryPage}`);

                if (postResponse.data.length) {
                    const updatedPostData = postResponse.data.map((post) => {
                        return {
                            ...post,
                            comments: post.comments.length > 0 ? post.comments : [],
                            likes: post.likes || [],
                        };
                    });

                    setPosts(updatedPostData);
                } else {
                    setPosts([]);
                }
            } catch (err) {
                console.error(err);
                if (err.response && err.response.status === 404) {
                    console.error(`No posts found for game ${gameId} and category ${categoryPage}`);
                    setPosts([]);
                }
            }
        };

        fetchPostsByGameAndCategory();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleToggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <>
            <section className="game-categories-container">
                <h1>{categoryPage.charAt(0).toUpperCase() + categoryPage.slice(1)}</h1>
                <h4>{gameData.title}</h4>
                <img src={gameData.thumbnail} alt={gameData.title} aria-label={gameData.title} />
                <button className="open-modal-button" onClick={openModal} aria-label="Create a Post">
                    Create a Post
                </button>
            </section>

            <StrategyAndTipsMock gameId={gameId} categoryPage={categoryPage} />

            {Array.isArray(posts) &&
                posts.map((post, index) => (
                    <section key={index} className="post-mapping-section-container">
                        <section className="post-mapping-image-section">
                        <img 
                            src={post.user.profileImage ? post.user.profileImage : NoUser} 
                            alt={post.user.username} 
                            aria-label={post.user.username} 
                        />
                            <div className="post-text-section" style={{ marginLeft: "1rem" }}>
                                <h2>{post.post_title}</h2>
                                <p>{post.post_content}</p>
                                <h5>{post.user.username}</h5>
                            </div>
                        </section>

                        <section className="like-button-section">
                            {post.likes && post.likes.find((like) => user && like.user_id === user.id) ? (
                                <button className="post-comment-like-button" onClick={() => handleUnlikePost(post.id)} style={{ width: "4rem" }} aria-label="Unlike">
                                    Unlike
                                </button>
                            ) : (
                                <button className="post-comment-like-button" onClick={() => handleLikePost(post.id)} style={{ width: "4rem" }} aria-label="Like">
                                    Like
                                </button>
                            )}
                            <p>{post.likes && post.likes.length} likes</p>
                        </section>

                        <div onClick={() => handleToggle(index)} aria-expanded={openIndex === index} className={`accordion-container ${openIndex === index ? "open" : "closed"}`}>
                            Comments {openIndex === index ? "▲" : "▼"}
                        </div>

                        {openIndex === index && (
                            <section className="accordion-comment-section-container">
                                {/* Comment section */}
                                {post.comments &&
                                    post.comments.length > 0 &&
                                    post.comments.map((comment, idx) => (
                                        <section className="accordion-comment-section" key={idx} aria-labelledby={comment.user.username}>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <img src={comment.user.profileImage} alt={comment.user.username} aria-label={comment.user.username} />
                                                <div className="comment-text-section">
                                                    <p>{comment.comment_content}</p>
                                                    <h5>{comment.user.username}</h5>
                                                </div>
                                            </div>
                                            <section className="accordion-comment-like-section">
                                                {comment.likes && comment.likes.find((like) => user && like.user_id === user.id) ? (
                                                    <button
                                                        className="post-comment-like-button"
                                                        onClick={() => handleUnlikeComment(comment.id)}
                                                        style={{
                                                            width: "4rem",
                                                        }}
                                                        aria-label="Unlike"
                                                    >
                                                        Unlike
                                                    </button>
                                                ) : (
                                                    <button
                                                        className="post-comment-like-button"
                                                        onClick={() => handleLikeComment(comment.id)}
                                                        style={{
                                                            width: "4rem",
                                                        }}
                                                        aria-label="Like"
                                                    >
                                                        Like
                                                    </button>
                                                )}
                                                <p style={{color:'white'}}>{comment.likes && comment.likes.length} likes</p>
                                            </section>
                                        </section>
                                    ))}
                                {/* Add a new comment to the post  */}
                                <div className="add-a-new-comment">
                                    <textarea
                                        value={newComment[index] || ""}
                                        onChange={(event) => {
                                            const updatedComments = [...newComment];
                                            updatedComments[index] = event.target.value;
                                            setNewComment(updatedComments);
                                        }}
                                        placeholder="Add a comment..."
                                        aria-label="Add a comment"
                                    />
                                    <button className="add-comment-button" style={{ width: "10rem", marginTop: ".5rem" }} onClick={() => handleAddComment(post.id, index)} aria-label="Add Comment">
                                        Add Comment
                                    </button>
                                </div>
                            </section>
                        )}
                    </section>
                ))}

            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Example Modal" style={customStyles} aria-modal="true" aria-labelledby="modal-title">
                <div className="modal-section">
                    <h2 id="modal-title">Create a post!</h2>
                    <form onSubmit={handleFormSubmit}>
                        <input
                            type="text"
                            value={postTitle}
                            onChange={(event) => setPostTitle(event.target.value)}
                            placeholder="Post Title"
                            onFocus={(event) => {
                                event.target.style.boxShadow = "0 0 5px var(--blue)";
                                event.target.style.outline = "none";
                            }}
                            onBlur={(event) => {
                                event.target.style.boxShadow = "none";
                            }}
                            aria-label="Post Title"
                        />
                        <textarea
                            value={postContent}
                            onChange={(event) => setPostContent(event.target.value)}
                            placeholder="Write your post here..."
                            onFocus={(event) => {
                                event.target.style.boxShadow = "0 0 5px var(--blue)";
                            }}
                            onBlur={(event) => {
                                event.target.style.boxShadow = "none";
                            }}
                            aria-label="Write your post here"
                        />
                        <button type="submit" className="modal-submit-button" aria-label="Submit">
                            Submit
                        </button>
                    </form>
                </div>
            </Modal>
        </>
    );
};

export default GameCategoriesPage;
