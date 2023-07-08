import { useState } from "react";
import axios from 'axios'

const LoginPage = () => {

  const defForm = { email: "", password: "" }
  const [ formData, setFormData ] = useState(defForm)
  const [ loginResult, setLoginResult ] = useState("")

  const handleInputChange = (event) => {
    setFormData({...formData, [event.target.name]: event.target.value})
  }

  const handleFormSubmit = async (event) => {
    console.log(formData);
    event.preventDefault();
  
    try {
      const response = await axios.post("/api/users/auth", formData);
      console.log('login response', response);
      const result = response.data;
  
      if(result && !result.err){
        setLoginResult("success");
      } else {
        setLoginResult("fail");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  }
  

  return (
    <>
      <h1>Login Page</h1>

      <form className="form mb-3">
        <div className="form-group">
          <label>Email Address</label>
          <input   
            type="text"
            name="email"
            placeholder="john@gmail.com"
            className="form-control"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input   
            type="password"
            name="password"
            className="form-control"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group mt-2">
          <button className="btn btn-primary" onClick={handleFormSubmit}>Log Me In!</button>
        </div>
      </form>

      { loginResult === "success" && (
        <div className="alert alert-success" role="alert">
          Login successful!
          {window.location.href="/"}
        </div>
      )}

      { loginResult === "fail" && (
        <div className="alert alert-danger" role="alert">
          Login failed!
        </div>
      )}
    </>
  )

}

export default LoginPage