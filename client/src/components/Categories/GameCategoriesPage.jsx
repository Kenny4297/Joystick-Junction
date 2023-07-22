import React, { useContext, useEffect, useState } from "react";
import { GameContext } from "../../contexts/GameContext";
import { UserContext } from "../../contexts/UserContext";
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

    useEffect(() => {
        if (user && user.id) {
            console.log(user);
            console.log(user.id);
        }
    }, [user]);

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
            const response = await axios.post(
                `/api/likes/comments/${commentId}`,
                {},
                { withCredentials: true }
            );
            setPosts(
                posts.map((post) => {
                    return {
                        ...post,
                        comments: post.comments.map((comment) => {
                            if (comment.id === commentId) {
                                const commentLikes = Array.isArray(
                                    comment.likes
                                )
                                    ? comment.likes
                                    : [];
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

    useEffect(() => {
        console.log("posts state updated:", posts);
    }, [posts]);

    const handleUnlikeComment = async (commentId) => {
        try {
            const { id: userId } = user;
            const response = await axios.delete(
                `/api/likes/comments/${commentId}`,
                { data: { user_id: userId } }
            );

            if (response.status === 200) {
                setPosts(
                    posts.map((post) => {
                        return {
                            ...post,
                            comments: post.comments.map((comment) => {
                                if (comment.id === commentId) {
                                    return {
                                        ...comment,
                                        likes: comment.likes.filter(
                                            (like) => like.user_id !== userId
                                        ),
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

        console.log(user.id);

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
            await axios.post(
                "/api/comments",
                { post_id: postId, comment_content: newComment[index] },
                { withCredentials: true }
            );

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
            const response = await axios.post(
                `/api/likes/posts/${postId}`,
                {},
                { withCredentials: true }
            );

            if (response.status === 201) {
                setPosts(
                    posts.map((post) =>
                        post.id === postId ? response.data : post
                    )
                );
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
                                likes: post.likes.filter(
                                    (like) => like.user_id !== userId
                                ),
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
            console.log("Test test?");
            try {
                const postResponse = await axios.get(
                    `/api/posts/game/${gameId}/category/${categoryPage}`
                );
                console.log("Post response:", postResponse);

                if (postResponse.data.length) {
                    const updatedPostData = postResponse.data.map((post) => {
                        return {
                            ...post,
                            comments:
                                post.comments.length > 0 ? post.comments : [],
                            likes: post.likes || [],
                        };
                    });

                    setPosts(updatedPostData);
                    console.log("Posts data:", updatedPostData);
                } else {
                    setPosts([]);
                }
            } catch (err) {
                console.error(err);
                if (err.response && err.response.status === 404) {
                    console.error(
                        `No posts found for game ${gameId} and category ${categoryPage}`
                    );
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
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <h1
                    style={{
                        color: "var(--blue)",
                        textDecoration: "underline",
                    }}
                >
                    {categoryPage.charAt(0).toUpperCase() +
                        categoryPage.slice(1)}
                </h1>
                <h4>{gameData.title}</h4>
                <img
                    src={gameData.thumbnail}
                    alt={gameData.title}
                    style={{ width: "25rem" }}
                />
                <button className="open-modal-button" onClick={openModal}>
                    Create a Post
                </button>
            </div>

            <StrategyAndTipsMock gameId={gameId} categoryPage={categoryPage} />

            {Array.isArray(posts) &&
                posts.map((post, index) => (
                    <div
                        key={index}
                        className="post"
                        style={{
                            position: "relative",
                            height: "auto",
                            border: "0.125rem solid var(--grey)",
                            width: "100%",
                            boxShadow:
                                "0.25rem 0.25rem 0.5rem rgba(0,0,0,0.15)",
                            backgroundColor: "#414141",
                            padding: "0.8rem",
                            margin: "1rem 0",
                            borderRadius: "0.2rem",
                        }}
                    >
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <img
                                src={post.user.profileImage}
                                alt={post.user.username}
                                style={{
                                    width: "6rem",
                                    height: "6rem",
                                    objectFit: "cover",
                                    borderRadius: "50%",
                                }}
                            />
                            <div style={{ marginLeft: "1rem" }}>
                                <h2>{post.post_title}</h2>
                                <p>{post.post_content}</p>
                                <h5>{post.user.username}</h5>
                            </div>
                        </div>

                        <div
                            style={{
                                display: "flex",
                                height: "3rem",
                                width: "10rem",
                                marginBottom: "2rem",
                            }}
                        >
                            {post.likes &&
                            post.likes.find(
                                (like) => user && like.user_id === user.id
                            ) ? (
                                <button
                                    className="post-comment-like-button"
                                    onClick={() => handleUnlikePost(post.id)}
                                    style={{ width: "4rem" }}
                                >
                                    Unlike
                                </button>
                            ) : (
                                <button
                                    className="post-comment-like-button"
                                    onClick={() => handleLikePost(post.id)}
                                    style={{ width: "4rem" }}
                                >
                                    Like
                                </button>
                            )}
                            <p
                                style={{
                                    marginLeft: "1rem",
                                    position: "relative",
                                    top: ".8rem",
                                    right: "1rem",
                                }}
                            >
                                {post.likes && post.likes.length} likes
                            </p>
                        </div>

                        <div
                            onClick={() => handleToggle(index)}
                            style={{
                                cursor: "pointer",
                                backgroundColor: "var(--metal)",
                                color: "var(--white)",
                                padding: "1rem",
                                textAlign: "center",
                                borderBottom:
                                    openIndex === index
                                        ? "none"
                                        : "1px solid var(--grey)",
                                borderTopLeftRadius: "0.25rem",
                                borderTopRightRadius: "0.25rem",
                                width: "max-content",
                                alignSelf: "center",
                            }}
                        >
                            Comments {openIndex === index ? "▲" : "▼"}
                        </div>

                        {openIndex === index && (
                            <div
                                style={{
                                    padding: "1rem",
                                    borderBottomLeftRadius: "0.25rem",
                                    borderBottomRightRadius: "0.25rem",
                                }}
                            >
                                {/* Comment section */}
                                {post.comments &&
                                    post.comments.length > 0 &&
                                    post.comments.map((comment, idx) => (
                                        <div
                                            key={idx}
                                            style={{
                                                position: "relative",
                                                height: "auto",
                                                border: "0.125rem solid var(--grey)",
                                                width: "100%",
                                                boxShadow:
                                                    "0.25rem 0.25rem 0.5rem rgba(0,0,0,0.15)",
                                                backgroundColor: "#414141",
                                                padding: "0.8rem",
                                                margin: "1rem 0",
                                                borderRadius: "0.2rem",
                                            }}
                                        >
                                            <div
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <img
                                                    src={
                                                        comment.user
                                                            .profileImage
                                                    }
                                                    alt={comment.user.username}
                                                    style={{
                                                        width: "6rem",
                                                        height: "6rem",
                                                        borderRadius: "50%",
                                                        objectFit: "cover",
                                                    }}
                                                />
                                                <div
                                                    style={{
                                                        marginLeft: "1rem",
                                                    }}
                                                >
                                                    <p>
                                                        {
                                                            comment.comment_content
                                                        }
                                                    </p>
                                                    <h5>
                                                        {comment.user.username}
                                                    </h5>
                                                </div>
                                            </div>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    height: "3rem",
                                                    width: "10rem",
                                                }}
                                            >
                                                {comment.likes &&
                                                comment.likes.find(
                                                    (like) =>
                                                        user &&
                                                        like.user_id === user.id
                                                ) ? (
                                                    <button
                                                        className="post-comment-like-button"
                                                        onClick={() =>
                                                            handleUnlikeComment(
                                                                comment.id
                                                            )
                                                        }
                                                        style={{
                                                            width: "4rem",
                                                        }}
                                                    >
                                                        Unlike
                                                    </button>
                                                ) : (
                                                    <button
                                                        className="post-comment-like-button"
                                                        onClick={() =>
                                                            handleLikeComment(
                                                                comment.id
                                                            )
                                                        }
                                                        style={{
                                                            width: "4rem",
                                                        }}
                                                    >
                                                        Like
                                                    </button>
                                                )}
                                                <p
                                                    style={{
                                                        marginLeft: "1rem",
                                                        paddingLeft: ".5rem",
                                                        position: "relative",
                                                        top: ".8rem",
                                                        right: "1rem",
                                                    }}
                                                >
                                                    {comment.likes &&
                                                        comment.likes
                                                            .length}{" "}
                                                    likes
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                {/* Add a new comment to the post  */}
                                <textarea
                                    value={newComment[index] || ""}
                                    onChange={(event) => {
                                        const updatedComments = [...newComment];
                                        updatedComments[index] =
                                            event.target.value;
                                        setNewComment(updatedComments);
                                    }}
                                    placeholder="Add a comment..."
                                />
                                <button
                                    className="add-comment-button"
                                    onClick={() =>
                                        handleAddComment(post.id, index)
                                    }
                                >
                                    Add Comment
                                </button>
                            </div>
                        )}
                    </div>
                ))}

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
                style={customStyles}
            >
                <h2>Create a post!</h2>
                <form onSubmit={handleFormSubmit}>
                    <input
                        type="text"
                        value={postTitle}
                        onChange={(event) => setPostTitle(event.target.value)}
                        placeholder="Post Title"
                        style={{
                            width: "100%",
                            padding: "10px",
                            margin: "10px 0",
                            border: "1px solid var(--grey)",
                            borderRadius: "4px",
                        }}
                        onFocus={(event) => {
                            event.target.style.boxShadow =
                                "0 0 5px var(--blue)";
                            event.target.style.outline = "none";
                        }}
                        onBlur={(event) => {
                            event.target.style.boxShadow = "none";
                        }}
                    />
                    <textarea
                        value={postContent}
                        onChange={(event) => setPostContent(event.target.value)}
                        placeholder="Write your post here..."
                        style={{
                            width: "100%",
                            minHeight: "100px",
                            padding: "10px",
                            margin: "10px 0",
                            border: "1px solid var(--grey)",
                            borderRadius: "4px",
                            resize: "vertical",
                        }}
                        onFocus={(event) => {
                            event.target.style.boxShadow =
                                "0 0 5px var(--blue)";
                        }}
                        onBlur={(event) => {
                            event.target.style.boxShadow = "none";
                        }}
                    />
                    <button
                        type="submit"
                        style={{
                            backgroundColor: "var(--blue)",
                            border: "none",
                            color: "var(--white)",
                            padding: "10px 20px",
                            margin: "10px 0",
                            borderRadius: "4px",
                            cursor: "pointer",
                        }}
                    >
                        Submit
                    </button>
                </form>
            </Modal>
        </>
    );
};

export default GameCategoriesPage;
