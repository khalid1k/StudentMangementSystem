import React from "react";
import { useState,useEffect } from "react";
import '../App.css';
function UpdateStudent(){
    const [name,setname]=useState('');
    const [fname,setfname]=useState('');
    const [date,setdate]=useState('');
    const [cls, setcls]=useState("");
    const [subject,setsubject]=useState("");
    const [mobile,setmobile]=useState();
    const [email,setemail]=useState('');
    const [id ,setid]=useState('');
    useEffect(()=>{

    },[])
    const getData=async()=>{
        let result=await fetch(`http://localhost:5656/updateStudent/${id}`)
        result=await result.json();
        setname(result.name)
        setfname(result.fname);
        setdate(result.date);
        setcls(result.cls);
        setsubject(result.subject);
        setmobile(result.mobile);
        setemail(result.email);
    }
    const handleInput=async()=>{
        const data={name,fname,date,cls,subject,mobile,email};
        let result=await fetch(`http://localhost:5656/updateStudent/${id}`,{
            method:"put",
            body:JSON.stringify(data),
            headers:{'Content-Type':"application/json"}
        })
        result= await result.json();
        console.warn(result);
        alert("Operation is Successful!");
    }
    return(
        <div>
             <div className="report-search">
            <input className="report-search-field" type="text" placeholder="enter ID" value={id} onChange={(e)=>setid(e.target.value)}></input>
            <button className="report-btn fs-btn" onClick={getData}>Get Data</button>
            </div>
            <div className="update-inputFields">
            <h1>Update Here</h1>
            <input className="reg-input" type="text" placeholder="Enter name" value={name} onChange={(e)=>setname(e.target.value)} ></input>
            <input className="reg-input" type="text" placeholder="Father name" value={fname} onChange={(e)=>setfname(e.target.value)}></input>
            <input className="reg-input" type="date" value={date} onChange={(e)=>setdate(e.target.value)} ></input>
            <input className="reg-input" type="text" placeholder="class" value={cls} onChange={(e)=>setcls(e.target.value)}></input>
            <input className="reg-input" type="text" placeholder="Subject Bio/com"  value={subject} onChange={(e)=>setsubject(e.target.value)}></input>
            <input className="reg-input" type="number" placeholder="Mobile NO."  value={mobile} onChange={(e)=>setmobile(e.target.value)}></input>
            <input className="reg-input" type="email" placeholder="email" value={email} onChange={(e)=>setemail(e.target.value)}></input>
            <button className="form-btn fs-btn" onClick={handleInput}>Update</button>
        </div>
        </div>
        
    )
}
export default UpdateStudent;