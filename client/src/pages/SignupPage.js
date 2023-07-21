import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {

  const defForm = { email: "", password: "", username: "" }
  const [ formData, setFormData ] = useState(defForm)
  const [ signupResult, setSignupResult ] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleFormSubmit = async(e) => {
    e.preventDefault()
    console.log(formData)
    const query = await fetch("/api/users/", {
      method: "post",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json"
      }
    })

    if( !query.ok ) {
      setSignupResult("fail")
    } else {
      const result = await query.json()
      setSignupResult("success")
    }
  }

  const goToSignUpPage = async () => {
    navigate('/login')
}

return (
  <div>
    <div className="cardContainer" style={{display: 'flex', flexDirection: 'column', border:'2px solid var(--grey)', borderRadius:'10px', boxShadow:'0 0 10px 0 var(--grey)', width:'60%', margin:'0 auto'}}>
      <div style={{width:'100%'}}>
        <h1 className="signupTitle">Sign Up</h1>
      </div>
      <div className="signupCard" style={{display: 'flex', width:'100%', justifyContent:'space-evenly'}}>
        <div className="signupContent">
        <form className="signupForm" style={{display: 'flex', flexDirection: 'column'}}>
          <div className="formGroup" style={{display: 'flex', flexDirection: 'column'}}>
            <label>Email Address</label>
            <input   
              type="text"
              name="email"
              placeholder="john@gmail.com"
              className="formControl"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>

          <div className="formGroup" style={{display: 'flex', flexDirection: 'column'}}>
            <label>Username</label>
            <input   
              type="text"
              name="username"
              placeholder="JohnDoe"
              className="formControl"
              value={formData.username}
              onChange={handleInputChange}
            />
          </div>

          <div className="formGroup" style={{display: 'flex', flexDirection: 'column'}}>
            <label>Password</label>
            <input   
              type="password"
              name="password"
              className="formControl"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>

          <div className="formGroup signupButton">
            <button className="sign-up-button" onClick={handleFormSubmit}>Sign Me Up!</button>
          </div>

          <div className="formGroup signupButton">
            <button className="sign-up-button" onClick={goToSignUpPage}>Go to Login</button>
          </div>
        </form>
        
          { signupResult === "success" && (
            <div className="alert signupAlertSuccess" role="alert">
              Signup successful!
            </div>
          )}

          { signupResult === "fail" && (
            <div className="alert signupAlertFail" role="alert">
              Signup failed!
            </div>
          )}
        </div>
        <div className="quickSignupInfo" style={{border:'2px solid var(--blue)', textAlign:'center'}}>
          <div className="infoGroup">
            <p className="infoTitle">Quick Sign Up</p>
            <div className="infoItem">
              <p className="category">Email:</p>
              <p className="example">t@t.com</p>
            </div>
            <div className="infoItem">
              <p className="category">Username:</p>
              <p className="example">Tom</p>
            </div>
            <div className="infoItem">
              <p className="category">Password:</p>
              <p className="example">t</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

  
}

export default SignupPage
