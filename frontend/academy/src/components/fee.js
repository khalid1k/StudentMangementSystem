import React, { useState } from "react";
const Fee=()=>{
    const[studentId,setId]=useState("");
    const[date,setDate]=useState(null);
    const[amount,setAmount]=useState();
    const[monthYear,setMonth]=useState("");
    const[pDues,setPDues]=useState();
    const[tId,setTid]=useState("");
    const[semail,setSemail]=useState('');
    const[sname,setSname]=useState("");
    const[fname,setFname]=useState("");
    //this function enter data into db send email, find transcationid
    const handleInput=async()=>{
       let newTid=generateTransactionId();
        setTid(newTid);
        try{
            let result=await fetch('http://localhost:5656/depositFee',{
                method:"post",
                body:JSON.stringify({studentId,date,amount,pDues,monthYear,tId:newTid,}),
                headers:{'Content-Type':'application/json'}
            });
            result=await result.json();
            console.warn(result);
            if(result){
                alert("Fee Successfully Deposited!");
            }
        }catch(error){
            console.warn(error,{result:"an error occur to store data into the database"});
        }
        // Function to generate a unique transaction ID
        function generateTransactionId() {
         const now = new Date();
         const timestamp = now.toISOString().replace(/\D/g, '').slice(0, -3);
         const randomDigits = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
         return `${timestamp}-${randomDigits}`;
        }
       
    }
    const sendEmail=async()=>{
         //to find student email
         try{
            let result=await fetch(`http://localhost:5656/getEmail/${studentId}`);
            result= await result.json();
             setSemail(result.email);
             setSname(result.name);
             setFname(result.fname);
        }catch(error){
            console.warn(error,{result:"email is not found"});
        }
        //it is used to send email to the student
        try{
            const message=`
            <h2 style="font-style:Times New Roman">Zavia Science Academy Raja Jung</h2>
            <br>
            <p>Name: &nbsp;${sname}&nbsp;&nbsp;&nbsp; Father-Name: &nbsp;${fname}</p>
            <p>Transcation id:  ${tId}</p>
            <span >Amount:</span> <span style="font-weight:700">&nbsp; &nbsp;&nbsp; ${amount}</span>
            <br>
            <span>Pending Dues:</span> <span style="font-weight:700">&nbsp; &nbsp;${pDues}</span>
            <p>Fee Deposit Date is ${date}</p>
            <p>Thanks for Deposit!...`;
            
            
            const requestBody = {
                toEmail: semail,
                subject: "Fee Deposit",
                reportContent: message,
              };
              const response = await fetch(
                "http://localhost:5656/sendReportByEmail",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(requestBody),
                }
              );
      
              const data = await response.json();
              if (data.success) {
                console.log("Email sent successfully");
                alert("Recipent is send by email");
              }else{
                alert(" Message Failed! please Again Press TID Button");
              }

        }catch(error){
            console.error("Error sending email:", error);
        }
        
    }
    return(
        <div>
            <div className="fee-container">
                <h2>Enter Fee Data </h2>
                <input className="marks-fields" type="text" placeholder="student ID" value={studentId} onChange={(e)=>setId(e.target.value)}></input>
                <input className="marks-fields" type="date" value={date} onChange={(e)=>setDate(e.target.value)}></input>
                <input className="marks-fields" type="number" placeholder="enter amount" value={amount} onChange={(e)=>setAmount(e.target.value)}></input>
                <input className="marks-fields"  type="number" placeholder="enter Pending Dues" value={pDues} onChange={(e)=>setPDues(e.target.value)}></input>
                <input className="marks-fields"  type="text" placeholder="MM-YYYY enter Month" value={monthYear} onChange={(e)=>setMonth(e.target.value)}></input>
                <div className="fee-btn-container">
                <button className="fee-btn" style={{width:"100px"}} onClick={handleInput}>Deposit</button>
                <button className="fee-btn" style={{width:"100px"}} onClick={sendEmail}>send TID</button>
                </div>
            </div>
        </div>
    )
}
export default Fee;