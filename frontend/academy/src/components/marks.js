import React, { useEffect } from "react";
import { useState } from "react";
function Marks(){
    const[students, setstudents]=useState('');
    const[id,setid]=useState("");
    const[testNumber, settestNumber]=useState('');
    const[date, setdate]=useState('');
    const[physics, setphysics]=useState();
    const[math, setmath]=useState();
    const[bio_com, setbio_com]=useState();
    const[chemistry, setchemistry]=useState();
    const[english, setenglish]=useState();
    // const [formData, setFormData] = useState({
    //     id: '',testNumber: '',date: '',physics: 0,bio_com: 0,math: 0,chemistry: 0,english: 0,
    //   });
    useEffect(()=>{
    
    },[])

    const handleFormData=async()=>{
        const formData={id,testNumber,date,physics,bio_com,math,chemistry,english};
        console.log(formData)
       let result=await fetch('http://localhost:5656/marksEnter',{
        method:"post",
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(formData)
       })
        result= await result.json();
        console.warn(result);
        alert("Operation is Successfull");
    }
    //it returns the result from the database
    const searchField=async(e)=>{
            let key=e.target.value;
            if(key){
             let result=await fetch(`http://localhost:5656/search/${key}`);
             result=await result.json();
             if(result){
              setstudents(result);
             }
            }
             
         }
    
    return(
        <div>
        <div className="search-student">
            <span>Search student to get id</span>
            <input className="mark-input1" type="text" placeholder="search by name, Fname,Mobile"  onChange={searchField} ></input>   
            
        </div>
        <div className="search-resul1">
            <ul style={{fontWeight:600}}>
                <li>Student id</li>
                <li>Student Name</li>
                <li>Father Name</li>
                
            </ul>
            {
        
                students.length>0 ? students.map((item, index)=>
                <ul key={item._id}>
                <li>{item._id}</li>
                <li>{item.name}</li>
                <li>{item.fname}</li>
               
            </ul>):
            <h3 style={{textAlign:"center"}}>No Result</h3>
            }
            
        </div>
        
            <div className="marks-inputFields">
                <input className="marks-fields"  placeholder="id" type="text" value={id} onChange={(e)=>setid(e.target.value)}></input>
                <input className="marks-fields"  placeholder="test number" type="text" value={testNumber} onChange={(e)=>settestNumber(e.target.value)}></input>
                <input className="marks-fields"   type="date" value={date} onChange={(e)=>setdate(e.target.value)}></input>
                <input className="marks-fields"  placeholder="physics marks" type="number" value={physics} onChange={(e)=>setphysics(e.target.value)}></input>
                <input className="marks-fields"  placeholder="Bio/Com marks" type="number" value={bio_com} onChange={(e)=>setbio_com(e.target.value)}></input>
                <input className="marks-fields"  placeholder="math marks" type="number" value={math} onChange={(e)=>setmath(e.target.value)}></input>
                <input className="marks-fields"  placeholder="chemistry marks" type="number" value={chemistry} onChange={(e)=>setchemistry(e.target.value)}></input>
                <input className="marks-fields"  placeholder="English marks" type="number" value={english} onChange={(e)=>setenglish(e.target.value)}></input>
                <button className="marks-btn" onClick={handleFormData}>Enter</button>
            </div>
        
        
    
    </div>
    )
}
export default Marks;