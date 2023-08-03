import { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

const SignupPage = () => {
    const defForm = { email: "", password: "", username: "" };
    const [formData, setFormData] = useState(defForm);
    const [signupResult, setSignupResult] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const [, setUser] = useContext(UserContext);


    const handleInputChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
    
        let isValid = true;
    
        // Validation
        if (!formData.email) {
            setEmailError("Email field cannot be empty.");
            isValid = false;
        } else {
            setEmailError("");
        }
    
        if (!formData.username) {
            setUsernameError("Username field cannot be empty.");
            isValid = false;
        } else {
            setUsernameError("");
        }
    
        if (!formData.password) {
            setPasswordError("Password field cannot be empty.");
            isValid = false;
        } else {
            setPasswordError("");
        }
    
        // Only attempt sign up if all validations passed
        if (isValid) {
            const query = await fetch("/api/users/", {
                method: "post",
                body: JSON.stringify(formData),
                headers: {
                    "Content-Type": "application/json",
                },
            });
    
            if (!query.ok) {
                setSignupResult("fail");
            } else {
                const result = await query.json();
                setUser(result); 
                setSignupResult("success");
    
                // navigate to the "from" path if available, otherwise, to home
                navigate(location.state?.from || "/");
            }
        }
    };
    
      

    const goToLoginPage = async () => {
        navigate("/login", { state: location.state });
    };

    return (
        <>
            <section className="sign-up-card-container">
                <h1 id="sign-up-header">Sign Up</h1>
                <div className="sign-up-card">
                    <div>
                        <form aria-labelledby="sign-up-header">
                            <div className="form-group">
                                <label id="email-sign-up-label">Email Address</label>
                                <input type="text" name="email" placeholder="john@gmail.com" className="form-control" value={formData.email} onChange={handleInputChange} aria-labelledby="emailSignUpLabel" aria-required="true" />
                                {emailError && <div className="error-message">{emailError}</div>}
                            </div>

                            <div className="form-group">
                                <label id="username-sign-up-label">Username</label>
                                <input type="text" name="username" placeholder="JohnDoe" className="form-control" value={formData.username} onChange={handleInputChange} aria-labelledby="username-sign-up-label" aria-required="true" />
                                {usernameError && <div className="error-message">{usernameError}</div>}
                            </div>

                            <div className="form-group">
                                <label id="password-sign-up-label">Password</label>
                                <input type="password" name="password" className="form-control" value={formData.password} onChange={handleInputChange} aria-labelledby="passwordSignUpLabel" aria-required="true" />
                                {passwordError && <div className="error-message">{passwordError}</div>}
                            </div>

                            <div style={{ marginBottom: ".5rem" }}>
                                <button className="sign-up-button" onClick={handleFormSubmit}>
                                    Sign Me Up!
                                </button>
                            </div>

                            <div>
                                <button className="sign-up-button" onClick={goToLoginPage}>
                                    Go to Login
                                </button>
                            </div>
                        </form>

                        {signupResult === "success" && (
                            <div className="alert sign-up-alert-success" role="alert">
                                Sign up successful!
                            </div>
                        )}

                        {signupResult === "fail" && (
                            <div className="alert sign-up-alert-fail" role="alert">
                                Sign up failed!
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
};

export default SignupPage;
