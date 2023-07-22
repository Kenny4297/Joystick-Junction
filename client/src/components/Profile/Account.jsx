import { useEffect, useState, useContext, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Image } from "cloudinary-react";
import Axios from "axios";
import cloudinary from "cloudinary-core";
import { UserContext } from "../../contexts/UserContext";
import noUser from "../Assets/Images/noUser.png";

const Account = () => {
    const { userId } = useParams();
    const [formData, setFormData] = useState({
        id: "",
        username: "",
        email: "",
        password: "",
        profileImage: "",
    });

    const [updateResult, setUpdateResult] = useState("");
    const [userUrl, setUserUrl] = useState(null);
    const navigate = useNavigate();
    const [user, setUser] = useContext(UserContext);
    const [showMessage, setShowMessage] = useState(false);

    const cld = new cloudinary.Cloudinary({ cloud_name: "diwhrgwml" });

    const handleInputChange = (event) => {
        if (event.target.name === "password" && event.target.value === "") {
            return;
        }

        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const getUserData = useCallback(async () => {
        try {
            const resp = await Axios.get(`/api/users/verify`);
            if (resp.data) {
                setFormData({
                    id: resp.data.id,
                    username: resp.data.username,
                    email: resp.data.email,
                    profileImage: resp.data.profileImage,
                });
                if (resp.data.profileImage) {
                    setUserUrl(resp.data.profileImage);
                }
            }
        } catch (error) {
            console.error("Error during verification:", error);
        }
    }, []);

    const update = async (event) => {
        event?.preventDefault();

        let dataToSend = { ...formData };

        if (!dataToSend.password) {
            delete dataToSend.password;
        }

        if (userUrl) {
            dataToSend.profileImage = userUrl;
        }

        const resp = await Axios.put(`/api/users/${userId}`, dataToSend);

        if (resp.status !== 200) {
            return setUpdateResult("fail");
        }
        setUser({ ...user, profileImage: userUrl });

        setUpdateResult("success");
        navigate(`/profile/${userId}`);
        alert("Profile updated successfully!");
    };

    const handleFileChange = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("file", event.target.files[0]);
        formData.append("upload_preset", "fxbnekpl");

        const response = await Axios.post("https://api.cloudinary.com/v1_1/diwhrgwml/image/upload", formData, { withCredentials: false });

        if (response.data) {
            const publicId = response.data.public_id;
            const url = cld.url(publicId);
            setUserUrl(url);
        }
    };

    const removeImage = async () => {
        if (userUrl) {
            let updatedData = { ...formData, profileImage: "" };

            const resp = await Axios.put(`/api/users/${userId}`, updatedData);

            if (resp.status === 200) {
                setUserUrl("");
                setFormData(updatedData);
                alert("Profile image removed successfully!");
            } else {
                alert("Failed to remove profile image. Please try again.");
            }
        }
    };

    const handleResetPasswordClick = (event) => {
        event.preventDefault();
        setShowMessage(!showMessage);
    };

    useEffect(() => {
        getUserData();
    }, [getUserData]);

    return (
        <>
            <section className="account-container">
                <section className="form-container">
                    <h2 className="account-h2" id="form-label">
                        Edit Your Profile
                    </h2>
                    <section style={{ width: "50%" }}>
                        <form className="account-form" aria-labelledby="form-label">
                            <label htmlFor="username" className="account-form-label">
                                Username
                            </label>
                            <input type="text" id="username" className="form-control" name="username" placeholder={formData.username} onChange={handleInputChange} aria-label="Username" />

                            <label htmlFor="email" className="account-form-label">
                                Email
                            </label>
                            <input type="email" id="email" className="form-control" name="email" placeholder={formData.email} onChange={handleInputChange} aria-label="Email" />

                            <label htmlFor="password" className="account-form-label">
                                Password
                            </label>
                            <input type="password" id="password" className="form-control" name="password" placeholder={"******"} onChange={handleInputChange} aria-label="Password" />

                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <button className="account-password-button" onClick={handleResetPasswordClick} aria-label="Reset Password">
                                    Reset Password
                                </button>
                                {showMessage && <div aria-live="polite">Normally you would receive an email asking to verify yourself, along with a link to reset your password. However, for the purpose of this demonstration and to protect your privacy, no email will be sent.</div>}
                                <div className="update-profile-button-container">
                                    <button onClick={update} className="update-profile-button" aria-label="Update Profile">
                                        Update Profile
                                    </button>
                                </div>
                            </div>
                        </form>
                        {updateResult === "success" && (
                            <div className="alert alert-success" role="alert">
                                Update successful!
                            </div>
                        )}
                        {updateResult === "fail" && (
                            <div className="alert alert-danger" role="alert">
                                Update failed!
                            </div>
                        )}
                    </section>
                </section>
                <section className="profile-image-container">
                    <h2 className="profile-image-h2">Edit Profile Image</h2>
                    {userUrl ? <Image className="profile-img" cloudName="diwhrgwml" publicId={userUrl} alt="Profile Image" /> : <img src={noUser} alt="No User" className="profile-img" />}

                    <label htmlFor="fileInput" className="file-input-label">
                        Upload File
                        <input id="fileInput" type="file" className="file-input" onChange={handleFileChange} aria-label="Upload File" />
                    </label>

                    <button onClick={removeImage} className="remove-image-button" aria-label="Remove Profile Image">
                        Remove Profile Image
                    </button>
                </section>
            </section>
        </>
    );
};

export default Account;
