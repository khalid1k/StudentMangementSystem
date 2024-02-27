import react, { useState } from "react";
import { useNavigate } from "react-router";
import "../App.css";
const SignUp=()=>{
    const [username, setUsername]=useState("");
    const [password, setPassword]=useState("");
    const navigate=useNavigate();
    const handleSignup=async()=>{
        if(username && password){
        try{
            let result=await fetch("http://127.0.0.1:5656/userRegister",{
                method: "post",
                body: JSON.stringify({ username, password }),
                headers: { "Content-Type": "application/json" }, 
        });
        result=await result.json();
       localStorage.setItem('user',JSON.stringify(result));
        if(result){
            navigate('/');
        }
        }catch(err){
            console.error(err +"internal server error");
        }
    }else{
        alert("please enter UserName and Password");
    }
        
    }
return(
    
    <div className="admin-container">
        <h1>SignUp Here</h1>
        <input className="admin-inputFields" type="text" placeholder="enter userName" value={username} onChange={(e)=>setUsername(e.target.value)}></input>
        <input className="admin-inputFields" type="password" placeholder="enter Password" value={password} onChange={(e)=>setPassword(e.target.value)}></input>
        
        <div className="login-btns-container">
            
            <button className="login-btn" onClick={handleSignup}>SignUp</button>
        </div>
        
    </div>
    
);
}
export default SignUp;