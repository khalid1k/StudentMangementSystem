import React, { useState } from "react";
function Registration(){
    const [name,setname]=useState('');
    // const [roll,setRoll]=useState();
    const [fname,setfname]=useState('');
    const [date,setdate]=useState('');
    const [cls, setcls]=useState("");
    const [subject,setsubject]=useState("");
    const [mobile,setmobile]=useState();
    const [email,setemail]=useState('');
    const handleInput=async(req,res)=>{
        
        let result=await fetch('http://localhost:5656/registration',{
            method:"post",
            body:JSON.stringify({name,fname,date,cls,subject,mobile,email}),
            headers:{'Content-Type':'application/json'}
        })
        result= await result.json();
        if(result)
        alert("Successfully Registered");
        else
        alert("Operational is not Successful!");

    }
    return(
        <div className="registration">
            <h1>Register Here</h1>
            {/* <input className="reg-input" type="text" placeholder="Enter RollNo.." value={roll} onChange={(e)=>setRoll(e.target.value)} ></input> */}
            <input className="reg-input" type="text" placeholder="Enter name" value={name} onChange={(e)=>setname(e.target.value)} ></input>
            <input className="reg-input" type="text" placeholder="Father name" value={fname} onChange={(e)=>setfname(e.target.value)}></input>
            <input className="reg-input" type="date" value={date} onChange={(e)=>setdate(e.target.value)} ></input>
            <input className="reg-input" type="text" placeholder="class" value={cls} onChange={(e)=>setcls(e.target.value)}></input>
            <input className="reg-input" type="text" placeholder="Subject Bio/com"  value={subject} onChange={(e)=>setsubject(e.target.value)}></input>
            <input className="reg-input" type="text" placeholder="Mobile NO."  value={mobile} onChange={(e)=>setmobile(e.target.value)}></input>
            <input className="reg-input" type="email" placeholder="email" value={email} onChange={(e)=>setemail(e.target.value)}></input>
            <button className="form-btn" onClick={handleInput}>Register</button>
        </div>
    )
}
export default Registration;