import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const LoginPage = () => {
    const defForm = { email: "", password: "" };
    const [formData, setFormData] = useState(defForm);
    const [loginResult, setLoginResult] = useState("");
    const navigate = useNavigate();
    const location = useLocation();


    const handleInputChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

   const handleFormSubmit = async (event) => {
        console.log(formData);
        event.preventDefault();

        try {
            const response = await axios.post("/api/users/auth", formData);
            console.log("login response", response);
            const result = response.data;

            if (result && !result.err) {
                setLoginResult("success");
                navigate(location.state?.from || "/defaultPath");
            } else {
                setLoginResult("fail");
            }
        } catch (error) {
            console.error("Error during login:", error);
        }
    };


    const goToSignUpPage = async () => {
        navigate("/login", { state: location.state });
    };

    useEffect(() => {
        if (loginResult === "success") {
            window.location.href = "/";
        }
    }, [loginResult]);

    return (
        <>
            <section className="login-container">
                <h1 className="login-header" id="loginHeader">Login</h1>

                <form className="login-form mb-3" aria-labelledby="loginHeader">
                    <div className="form-group">
                        <label id="emailLabel">Email Address</label>
                        <input type="text" name="email" placeholder="john@gmail.com" className="form-control" value={formData.email} onChange={handleInputChange} aria-labelledby="emailLabel" aria-required="true" />
                    </div>

                    <div className="form-group">
                        <label id="passwordLabel">Password</label>
                        <input type="password" name="password" className="form-control" value={formData.password} onChange={handleInputChange} aria-labelledby="passwordLabel" aria-required="true" />
                    </div>

                    <div className="form-group mt-2">
                        <button className="login-button-login-page" onClick={handleFormSubmit}>
                            Log Me In!
                        </button>
                    </div>

                    <div className="form-group mt-2">
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
            </section>
        </>
    );
};

export default LoginPage;