import React, { useState } from "react";
function Students(){
    const [students,setStudents]=useState([]);
    const getRecords=async()=>{
        try{
            let result=await fetch("http://localhost:5656/getStudents");
            result=await result.json();
            setStudents(result);
           
        }catch(error){
            console.error(error,"an error occured while fetching the data");
        }
        
    }
    return(
        <div>
            <div className="students-btn fs-btn"  onClick={getRecords}><button>get students</button></div>
            <div className="student-container">
                <table>
                    <caption>Students Record</caption>
                    <thead>
                        <tr>
                            <th>Sr No.</th>
                            <th>Student name</th>
                            <th>Father Name</th>
                            <th>DOB</th>
                            <th>Class</th>
                            <th>Subject</th>
                            <th>Mobile</th>
                            <th>Email</th>
                            <th>Student ID</th>
                        </tr>
                        </thead>
                        <tbody>
                            {
                               students.length> 0? (students.map((student,index)=>
                                <tr key={student._id}>
                                <td>{index+1}</td>
                                <td>{student.name}</td>
                                <td>{student.fname}</td>
                                <td>{new Date(student.date).toISOString().split('T')[0]}</td>
                                <td>{student.cls}</td>
                                <td>{student.subject}</td>
                                <td>{student.mobile}</td>
                                <td>{student.email}</td>
                                <td>{student._id}</td>
                                </tr>
                                ))
                                :
                                (<tr><td colSpan={9}>No Result Found</td></tr>)
                            }
                        </tbody>
                    
                </table>
            </div>
        </div>
    )
}
export default Students;