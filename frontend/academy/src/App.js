import Nav from "./components/Nav-Bar";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";

import { Navigate } from "react-router-dom";
import "./App.css";

import Students from "./components/students";
import Registration from "./components/registration";
import Fee from "./components/fee";
import Marks from "./components/marks";
import UpdateStudent from "./components/updateStudent";
import UpdateMarks from "./components/updateMarks";
import Report from "./components/studentReport";
import Email from "./components/email";
import Footer from "./components/footer";
import FeeStatus from "./components/feeStatus";
import Admin from "./components/admin";
import SignUp from "./components/signup";
function App() {
  
  
  return (
    <div>
      <Router>
        <Nav />
        <Routes>
       
          <Route path="/userLogin" element={<Admin />}></Route>
          <Route path="/userSignup" element={<SignUp />}></Route>
          <Route path="/" element={<Students />}></Route>
          <Route path="/registration" element={<Registration />}></Route>
          <Route path="/fee" element={<Fee />}></Route>
          <Route path="/feeStatus" element={<FeeStatus />}></Route>
          <Route path="/testMarks" element={<Marks />}></Route>
          <Route path="/updateStudent" element={<UpdateStudent />}></Route>
          <Route path="/updateMarks" element={<UpdateMarks />}></Route>
          <Route path="/studentReport" element={<Report />}></Route>
          <Route path="/email" element={<Email />}></Route>
        </Routes>
      </Router>
      {/* <Footer/> */}
    </div>
  );
}

export default App;
