import react, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../App.css";
const Admin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

const handleLogin = async () => {
  try {
    let result = await fetch("http://localhost:5656/userLogin", {
      method: "post",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "Application/json" },
    });
    result = await result.json();
    console.warn(result);
    if (result) {
      localStorage.setItem("user", JSON.stringify(result));
      navigate("/");
    } else {
      alert("Please enter the correct details.");
    }
  } catch (error) {
    console.error("An error occurred:", error);
    alert("An error occurred. Please try again later.");
  }
};
const handleSignup=()=>{
  navigate('/userSignUp');
}


  return (
    <div className="admin-container">
      <h1>Login Here</h1>
      <input
        className="admin-inputFields"
        type="text"
        placeholder="enter userName"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      ></input>
      <input
        className="admin-inputFields"
        type="password"
        placeholder="enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      ></input>

      <div className="login-btns-container">
        <button className="login-btn" onClick={handleLogin}>
          Login
        </button>
        <button className="login-btn" onClick={handleSignup}>SignUp</button>
      </div>
    </div>
  );
};
export default Admin;
