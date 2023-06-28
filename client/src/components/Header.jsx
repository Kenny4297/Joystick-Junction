import styled from "styled-components";
import cookie from "js-cookie";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Header = ({ user }) => {
    const logout = () => {
        cookie.remove("auth-token");
        window.location.href = "/login";
    };

    return (
        <header>
            <StyledNavbar expand="md">
                <StyledBrand href="/">
                    <h2>Project Title</h2>
                </StyledBrand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav
                        className="ml-auto justify-content-end"
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            flexGrow: "1",
                        }}
                    >
                        <StyledLink href="/">Home</StyledLink>
                        {!user ? (
                            <>
                                <StyledLink href="/signup">Signup</StyledLink>
                                <StyledLink href="/login">Login</StyledLink>
                            </>
                        ) : (
                            <>
                                <StyledLink href={`/profile/${user.id}`}>
                                    Profile
                                </StyledLink>
                                <StyledLink href="##" onClick={logout}>
                                    Logout
                                </StyledLink>
                                {!user.profileImage ? (
                                    <StyledLink href="/profileImage">
                                        Add a profile Image!
                                    </StyledLink>
                                ) : (
                                    <StyledDropdown
                                        title={
                                            <img
                                                src={user.profileImage}
                                                alt="The users profile pic"
                                            />
                                        }
                                        id="basic-nav-dropdown"
                                    >
                                        <NavDropdown.Item
                                            href={`/profile/${user.id}`}
                                        >
                                            Profile
                                        </NavDropdown.Item>
                                        <NavDropdown.Item
                                            href="##"
                                            onClick={logout}
                                        >
                                            Logout
                                        </NavDropdown.Item>
                                    </StyledDropdown>
                                )}
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </StyledNavbar>
        </header>
    );
};

export default Header;

const StyledNavbar = styled(Navbar)`
    background-color: #1A1A1A;
    display: flex;
    justify-content: space-between;
`;

const StyledBrand = styled(Navbar.Brand)`
    h2 {
        color: white;
    }
`;

const StyledLink = styled(Nav.Link)`
    color: white;
`;

const StyledDropdown = styled(NavDropdown)`
    img {
        width: 40px;
        border-radius: 20px;
    }
`;
