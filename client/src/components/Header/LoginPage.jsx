import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const LoginPage = () => {
    const defForm = { email: "", password: "" };
    const [formData, setFormData] = useState(defForm);
    const [loginResult, setLoginResult] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const [, setUser] = useContext(UserContext);

    const handleInputChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);    

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        // Validation
        if (!formData.email) {
            setEmailError("Email field cannot be empty");
            return;
        } else {
            setEmailError("");
        }

        if (!formData.password) {
            setPasswordError("Password field cannot be empty");
            return;
        } else {
            setPasswordError("");
        }

        try {
            const response = await axios.post("/api/users/auth", formData);
            const result = response.data;
    
            if (result && !result.err) {
                setUser(result);
                setLoginResult("success");
    
                // Navigate to the "from" path if available, otherwise, to home
                navigate(location.state?.from || "/");
            } else {
                setLoginResult("fail");
            }
        } catch (error) {
            console.error("Error during login:", error);
        }
    };

    const goToSignUpPage = async () => {
        navigate("/signup", { state: location.state });
    };

    useEffect(() => {
        if (loginResult === "success") {
            window.location.href = "/";
        }
    }, [loginResult]);

    return (
        <>
            <section className="login-container">


                <form className="login-form mb-3" aria-labelledby="loginHeader">
                <h1 className="login-header" id="loginHeader">
                    Login
                </h1>
                    <div className="form-group">
                        <label id="emailLabel">Email Address</label>
                        <input type="text" name="email" placeholder="john@gmail.com" className="form-control" value={formData.email} onChange={handleInputChange} aria-labelledby="emailLabel" aria-required="true" />
                        {emailError && <div className="error-message">{emailError}</div>}
                    </div>

                    <div className="form-group">
                        <label id="passwordLabel">Password</label>
                        <input type="password" name="password" className="form-control" value={formData.password} onChange={handleInputChange} aria-labelledby="passwordLabel" aria-required="true" />
                        {passwordError && <div className="error-message">{passwordError}</div>}
                    </div>

                    <div className="mt-2">
                        <button className="login-button-login-page" onClick={handleFormSubmit}>
                            Log Me In!
                        </button>
                    </div>

                    <div className="mt-2">
                        <button className="login-button-login-page" onClick={goToSignUpPage}>
                            Go to Sign Up
                        </button>
                    </div>
                </form>
                {loginResult === "fail" && (
                    <div className="alert alert-danger" role="alert">
                        Login failed!
                    </div>
                )}

                <div className="quick-sign-up-info">
                        <div className="info-group">
                            <p className="info-title">Quick Log In</p>
                            <div className="info-item">
                                <p className="category">Email:</p>
                                <p className="example">t@t.com</p>
                            </div>
                            <div className="info-item">
                                <p className="category">Password:</p>
                                <p className="example">t</p>
                            </div>
                            <div className="info-item">
                                <p className="category">Your Username will be:</p>
                                <p className="example">Tom</p>
                            </div>
                        </div>
                    </div>
            </section>
        </>
    );
};

export default LoginPage;
