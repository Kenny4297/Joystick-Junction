import { Navbar, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

const Header = () => {
    const [user, setUser] = useContext(UserContext);
    const navigate = useNavigate();

    const logout = () => {
        // Make API call to logout
        fetch("/api/users/logout", {
            method: "GET",
            credentials: "include",
        })
            .then((response) => {
                if (response.ok) {
                    setUser(null);
                    navigate("/");
                } else {
                    throw new Error("Failed to log out");
                }
            })
            .catch((err) => {
                console.error(err);
            });
    };

    return (
        <header aria-label="Main navigation">
            <Navbar style={{ backgroundColor: "var(--metal" }} expand="md" className="d-flex justify-content-center align-items-center" aria-label="Main menu">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav
                        className="ml-auto justify-content-end"
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            flexGrow: "1",
                        }}
                        aria-label="Page navigation"
                    >
                        <Nav.Link className="header-links" href="/">
                            Home
                        </Nav.Link>
                        <Nav.Link className="header-links" href="/browse">
                            Browse
                        </Nav.Link>
                        {!user ? (
                            <>
                                <Nav.Link className="header-links" href="/signUp">
                                    Sign Up
                                </Nav.Link>
                                <Nav.Link href="/login" className="login-button">
                                    Login
                                </Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link className="header-links" href={`/profile/${user.id}`}>
                                    Profile
                                </Nav.Link>
                                <Nav.Link href="##" onClick={logout} aria-label="Logout" className="logout-button">
                                    Logout
                                </Nav.Link>
                                {/* <Nav.Link className="header-links" href={`/messages/${user.id}`}>
                                    Messages
                                </Nav.Link> */}
                                {user && user.profileImage && (
                                    <img
                                        src={user.profileImage}
                                        alt="The user's profile pic"
                                        style={{
                                            width: "2.5rem",
                                            height: "2.5rem",
                                            borderRadius: "20px",
                                            border: "1px solid var(--dark-wood)",
                                            marginRight: "2rem",
                                            objectFit: "cover",
                                        }}
                                        className="profile-pic"
                                    />
                                )}
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </header>
    );
};

export default Header;
