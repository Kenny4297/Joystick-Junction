import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const SignupPage = () => {
    const defForm = { email: "", password: "", username: "" };
    const [formData, setFormData] = useState(defForm);
    const [signupResult, setSignupResult] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    const handleInputChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(formData);
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
            await query.json();
            setSignupResult("success");
            // Here we navigate to the "from" path if available, otherwise, to a default path
            navigate(location.state?.from || "/defaultPath");
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
                                </div>

                                <div className="form-group">
                                    <label id="username-sign-up-label">Username</label>
                                    <input type="text" name="username" placeholder="JohnDoe" className="form-control" value={formData.username} onChange={handleInputChange}aria-labelledby="username-sign-up-label" aria-required="true" />
                                </div>

                                <div className="form-group">
                                    <label id="password-sign-up-label">Password</label>
                                    <input type="password" name="password" className="form-control" value={formData.password} onChange={handleInputChange} aria-labelledby="passwordSignUpLabel" aria-required="true" />
                                </div>

                                <div style={{marginBottom:'.5rem'}}>
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

                        <div className="quick-sign-up-info">
                            <div className="info-group">
                                <p className="info-title">Quick Sign Up</p>
                                <div className="info-item">
                                    <p className="category">Email:</p>
                                    <p className="example">t@t.com</p>
                                </div>
                                <div className="info-item">
                                    <p className="category">Username:</p>
                                    <p className="example">Tom</p>
                                </div>
                                <div className="info-item">
                                    <p className="category">Password:</p>
                                    <p className="example">t</p>
                                </div>
                            </div>
                        </div>
                </div>
            </section>
        </>
    );
};

export default SignupPage;
