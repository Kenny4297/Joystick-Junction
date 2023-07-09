
import { Link } from "react-router-dom";
import {
    Navbar,
    Nav,
    FormControl,
    Form
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import React, { useContext, useState} from "react";
import { UserContext } from "../contexts/UserContext";

const Header = () => {
    const [user, setUser] = useContext(UserContext);
    const navigate = useNavigate();


    const logout = () => {
        // Make API call to logout
        fetch('/api/users/logout', {
          method: 'GET',
          credentials: 'include',
        })
        .then(response => {
          if (response.ok) {
            // After successful logout, clear user context and navigate to login page
            setUser(null);
            navigate('/login');
          } else {
            throw new Error('Failed to log out');
          }
        })
        .catch(err => {
          // Handle any exceptions here
          console.error(err);
        });
      };
    

    const [searchTerm, setSearchTerm] = useState("");


    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const query = searchTerm.replace(/ /g, "+");
        navigate(`/individual-book/${query}`, {
            state: { searchTerm: searchTerm.replace(/[+,]/g, "") },
        });
    };

    return (
        <header
            style={{ width: "100%", minHight: "1.5rem", maxHeight: "1.5rem", marginBottom:'5rem'}}
            aria-label="Main navigation"
        >
            <Navbar
                style={{ backgroundColor: "grey" }}
                expand="md"
                className="d-flex justify-content-center align-items-center"
                aria-label="Main menu"
            >
                <Navbar.Brand href="/">
                    <h2 style={{paddingLeft:'2rem'}}>Joystick Junction</h2>
                </Navbar.Brand>

                <Form
                    inline="true"
                    onSubmit={handleFormSubmit}
                    aria-label="Search for a book"
                >
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <FormControl
                            type="text"
                            placeholder="Search..."
                            style={{ width: "30vw" }}
                            className="mr-sm-2 header-search-bar"
                            onChange={handleInputChange}
                            aria-label="Search input"
                        />

                        <Link to={`/individual-book/${searchTerm}`}></Link>

                        <button
                            className="header-search-button"
                            aria-label="Search button"
                            type="submit"
                        >
                            Search
                        </button>
                    </div>
                </Form>

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
                        <Nav.Link className="header-links" href="/">Home</Nav.Link>
                        {!user ? (
                            <>
                                <Nav.Link className="header-links" href="/signUp">SignUp</Nav.Link>
                                <Nav.Link href="/login">Login</Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link className="header-links" href={`/profile/${user.id}`}>
                                    Profile
                                </Nav.Link>
                                <Nav.Link
                                    href="##"
                                    onClick={logout}
                                    aria-label="Logout"
                                    className="header-links"
                                >
                                    Logout
                                </Nav.Link>
                                <Nav.Link className="header-links" href={`/messages/${user.id}`}>
                                    Messages
                                </Nav.Link>
                                {user && user.profileImage && (
                                    <img
                                        src={user.profileImage}
                                        alt="The user's profile pic"
                                        style={{
                                            width: "40px",
                                            borderRadius: "20px",
                                            border: "1px solid var(--dark-wood)",
                                            marginRight: "2rem",
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
