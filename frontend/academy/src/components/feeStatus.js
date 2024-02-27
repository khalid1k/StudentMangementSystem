import React, { useState } from 'react';
const FeeStatus=()=>{
    const [month,setMonth]=useState("");
    const [paid,setPaid]=useState([]);
    const [unpaid,setUnPaid]=useState([]);
    const [check,setCheck]=useState(false);
    const [message,setMessage]=useState("");
    const [emails, setEmail]=useState("");
    const checkPaid=async()=>{
        setCheck(false);
        setUnPaid([]);
        let result=await fetch(`http://localhost:5656/paidStudents/${month}`);
        result=await result.json();
        setPaid(result);
        
    }
    const checkUnPaid=async()=>{
        setCheck(true);
        setPaid([]);
        let result=await fetch(`http://localhost:5656/unpaidStudents/${month}`);
        result=await result.json();
        setUnPaid(result);
        let em=result.map((e)=>e.email);
        console.log(em);
        setEmail(em);
    }
    const sendEmail=async(req,res)=>{
        

        //this function indvidually send email one by one on calling by sendEmailToAll function
    const sendEmail = async (email, messageContent) => {
        const requestBody = {
          toEmail: email,
          subject: "Notification",
          reportContent: messageContent,
        };
  
        try {
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
          }
        } catch (error) {
          console.error("Error sending email:", error);
        }
      };
  
      
  
      const sendMessageToAll = async () => {
        if (Array.isArray(emails) && emails.length > 0) {
          for (const email of emails) {
            const messageContent=`
            <h3 >Zavia Science Academy Raja Jung</h3>
            <p>${message}</p>`;
            await sendEmail(email, messageContent);
          }
          alert("All Emails are sent successfully");
        console.log("All reports sent successfully");
        }
      };
      sendMessageToAll();
    


    }
    return(
        <div>
            <div className='fee-status-input-field'>
                <input type='text' className='fs-input' placeholder='MM-YYYY enter month and year' value={month} onChange={(e)=>setMonth(e.target.value)}></input>
                <div className='fee-status-input-field-btn'>
                <button className='fs-btn' onClick={checkPaid}>Check Paid Records</button>
                <button className='fs-btn' onClick={checkUnPaid}>Check UnPaid Records</button>
                </div>
            </div>
            <div className="student-container" style={{position:'absolute',top:"25%",left:"2%"}}>
                {
                    check===true? 
                    <div style={{display:"inline",width:"30%",gap:"10px"}}>
                    <textarea style={{border:"2px solid skyblue"}} rows={6} cols={80} placeholder='enter here message to send all the students that not submit their Fee' value={message} onChange={(e)=>setMessage(e.target.value)}></textarea>
                    <button onClick={sendEmail} className='fs-btn' style={{width:"100px", height:"33px",position:"absolute",top:"15%", marginLeft:"5px"}}>Send Email </button>
                    </div>
                    :null
                }
                <table>
                    <caption>Fee Records</caption>
                    <thead>
                        {
                            check===true ? 
                            <tr>
                            <th>Sr No.</th>
                            <th>Student name</th>
                            <th>Father Name</th>
                            <th>Class</th>
                            
                        </tr>

                            
                            :
                                 <tr>
                                <th>Sr No.</th>
                                <th>Student name</th>
                                <th>Father Name</th>
                                <th>Class</th>
                                <th>T-ID</th>
                                <th>Amount</th>
                                <th>Pending Dues</th>
                                <th>Deposit Date</th>
                            </tr>
                            
                        }
                        
                        </thead>
                        <tbody>
                            {
                               paid.length> 0? ( paid.map((fee,index)=>
                                <tr key={fee.studentId}>
                                    <td>{index+1}</td>
                                    <td>{fee.studentId.name}</td>
                                    <td>{fee.studentId.fname}</td>
                                    <td>{fee.studentId.cls}</td>
                                    <td>{fee.tId}</td>
                                    <td>{fee.amount}</td>
                                    <td>{fee.pDues}</td>
                                    <td>{new Date(fee.feeDate).toISOString().split('T')[0]}</td>
                                </tr>
                                )):
                                (
                                    null
                                )
                            }
                            {
                                unpaid.length >0 ?(
                                    unpaid.map((fee,index)=>
                                    <tr key={fee.studentId}>
                                        <td>{index+1}</td>
                                        <td>{fee.name}</td>
                                        <td>{fee.fname}</td>
                                        <td>{fee.cls}</td>
                                    </tr>)
                                ):(
                                    null
                                )

                            }

                            </tbody>
                            </table>
                </div>
        </div>
    )
}
export default FeeStatus;