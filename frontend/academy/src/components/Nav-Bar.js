import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css'

function Nav() {
  return (
   <div className='nav-bar'>

    <ul className='nav'>
     
        <li><Link to={'/'}>Home</Link></li>
        <li><Link to={'/registration'}>Registration</Link></li>
        <li><Link to={'/fee'}>Fee</Link></li>
        <li><Link to={'/feeStatus'}>Fee Status</Link></li>
        <li><Link to={'/testMarks'}>Test Marks</Link></li>
        <li><Link to={'/updateStudent'}>Update Student</Link></li>
        <li><Link to={"/updateMarks"}>Update Marks</Link></li>
        <li><Link to={'/studentReport'}>Student Report</Link></li>
        <li><Link to={'/email'}>Send Email</Link></li>
    </ul>
     
   </div>
  );
}
export default Nav;
