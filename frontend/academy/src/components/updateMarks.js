import React from "react";
import { useState } from "react";
function UpdateMarks(){
    const[students, setstudents]=useState('');
    const[id,setid]=useState("");
    const[testNumber, settestNumber]=useState('');
    const[physics, setphysics]=useState();
    const[math, setmath]=useState();
    const[bio_com, setbio_com]=useState();
    const[chemistry, setchemistry]=useState();
    const[english, setenglish]=useState();
    const getFormData=async()=>{
        let result=await fetch(`http://localhost:5656/report/${id}/${testNumber}`);
        result=await result.json();
        let r=result.marks.subjects.map((subject)=>subject.marksObtained);
        setphysics(r[0]);
        setbio_com(r[1]);
        setmath(r[2]);
        setchemistry(r[3]);
        setenglish(r[4]);
    }
    const updateFormData=async()=>{
        let data=[physics,bio_com,math,chemistry,english].map(value => parseInt(value));
        
        let result=await fetch(`http://localhost:5656/updateStudentMarks/${id}/${testNumber}`,{
            method:"put",
            body:JSON.stringify(data),
            headers: {'Content-Type': 'application/json'}
        });
        result=await result.json();
        if(result){
            alert("operation is Successful");
        }
        else{
            alert("Sorry..! there is an error");
        }
         
    }
    return(
        <div>
            <div className="Update-marks-search">
            <input className="marks-fields"  placeholder="id" type="text" value={id} onChange={(e)=>setid(e.target.value)}></input>
                <input className="marks-fields"  placeholder="test number" type="text" value={testNumber} onChange={(e)=>settestNumber(e.target.value)}></input>
                <button onClick={getFormData} className="update-getData-btn">Get Data</button>
            </div>
            <div className="update-marks-inputFields">
                
                
                <label for="phy">Physics</label>
                <input id="phy" className="marks-fields"  placeholder="physics marks" type="number" value={physics} onChange={(e)=>setphysics(e.target.value)}></input>
                <label for="bio">Bio/Com</label>
                <input id="bio" className="marks-fields"  placeholder="Bio/Com marks" type="number" value={bio_com} onChange={(e)=>setbio_com(e.target.value)}></input>
                <label for="math">Math</label>
                <input id="math" className="marks-fields"  placeholder="math marks" type="number" value={math} onChange={(e)=>setmath(e.target.value)}></input>
                <label for="chen">Chemistry</label>
                <input id="chem" className="marks-fields"  placeholder="chemistry marks" type="number" value={chemistry} onChange={(e)=>setchemistry(e.target.value)}></input>
                <label for="eng">English</label>
                <input id="eng" className="marks-fields"  placeholder="English marks" type="number" value={english} onChange={(e)=>setenglish(e.target.value)}></input>
                <button className="update-getData-btn" onClick={updateFormData}>Update Data</button>
            </div>
        </div>
    )
}
export default UpdateMarks;