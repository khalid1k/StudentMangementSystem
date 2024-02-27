import React, { useState } from "react";
function Report() {
  const [id, setID] = useState("");
  const [testNumber, settestNumber] = useState("");
  const [reportData, setreportData] = useState(null);
  const [allreport, setAllreport] = useState(null);
  const ReportData = async () => {
    let result = await fetch(
      `http://localhost:5656/report/${id}/${testNumber}`
    );
    result = await result.json();
    setreportData(result);
  };
  //it is used to find report of all the students
  const allReportData = async () => {
    let result = await fetch(`http://localhost:5656/report/${testNumber}`);
    result = await result.json();
    setAllreport(result);
  };
  //this function is used to send Email to the student
  const sendReportData = async () => {
    let email = reportData.student.email;

    // Calculate the total marks
    const totalMarks = reportData.marks.subjects.reduce(
      (total, subject) => total + subject.marksObtained,
      0
    );
    const per = (totalMarks * 100) / 100;
    // Generate the HTML content for the student's report
    const subjectMarksHTML = reportData.marks.subjects
      .map(
        (subject) =>
          `<td style="border: 1px solid black;">${subject.marksObtained}</td>`
      )
      .join("");
    const reportContent = `
      <h2 style="text-align:center;">Zavia Science Academy Raja Jung</h2>  
      <table style="border: 1px solid black">
        <caption style="font-size:15px" "font-weight: 900";> <b>Weekly Test Report</b>  </caption>
          <thead>
            <tr>
              <th style="border: 1px solid black;">Student Name</th>
              <th style="border: 1px solid black;">Father Name</th>
              <th style="border: 1px solid black;">Class</th>
              <th style="border: 1px solid black;">Subject</th>
              <th style="border: 1px solid black;">Test Number</th>
              <th style="border: 1px solid black;">Physics</th>
              <th style="border: 1px solid black;">Bio/Com</th>
              <th style="border: 1px solid black;">Math</th>
              <th style="border: 1px solid black;">Chemistry</th>
              <th style="border: 1px solid black;">English</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="border: 1px solid black;">${reportData.student.name}</td>
              <td style="border: 1px solid black;">${reportData.student.fname}</td>
              <td style="border: 1px solid black;">${reportData.student.className}</td>
              <td style="border: 1px solid black;">${reportData.student.subject}</td>
              <td style="border: 1px solid black;">${reportData.marks.testNumber}</td>
              ${subjectMarksHTML}
            </tr>
          </tbody>
        </table>
        <br><br>
        <span style="font-weight:700">Total Marks</span><span style="font-weight:700"> &nbsp; &nbsp; &nbsp; 100</span>
        <br>
        <span style="font-weight:700">Obtained Marks</span><span style="font-weight:700"> &nbsp;  ${totalMarks}</span>
        <br>
        <span style="font-weight:700">Percentage</span><span style="font-weight:700"> &nbsp; &nbsp; &nbsp; ${per} %</span>
      `;
    const requestBody = {
      toEmail: email,
      subject: "Student Report",
      reportContent: reportContent,
    };
    try {
      const response = await fetch("http://localhost:5656/sendReportByEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      if (data.success) {
        alert("Email sent successfully");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Error sending email:");
    }

     try {
      const response = await fetch("http://localhost:5656/sendReportByEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      if (data.success) {
        alert("Email sent successfully");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Error sending email:");
    }

  };

  //this function send reports to all student at once

  const sendReportEmail = async (email, reportContent) => {
    const requestBody = {
      toEmail: email,
      subject: "Student Report",
      reportContent: reportContent,
    };

    try {
      const response = await fetch("http://localhost:5656/sendReportByEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      if (data.success) {
        console.log("Email sent successfully");
      }
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  // In your component
  const sendAllReportData = async () => {
    if (Array.isArray(allreport) && allreport.length > 0) {
      for (const report of allreport) {
        const email = report.student.email; // Assuming the email is present in the report data
        let studentName = report.student.name;
        let fatherName = report.student.fname;
        let className = report.student.className;
        let subjectName = report.student.subject;
        let testNumber = report.marks.testNumber;
        const totalMarks = report.marks.subjects.reduce(
          (total, subject) => total + subject.marksObtained,
          0
        );
        const per = (totalMarks * 100) / 100;
        const subjectMarksHTML = report.marks.subjects
          .map(
            (subject) =>
              `<td style="border: 1px solid black;">${subject.marksObtained}</td>`
          )
          .join("");

        const reportContent = `
        <h2 style="text-align:center;">Zavia Science Academy Raja Jung</h2>  
        <table style="border: 1px solid black">
          <caption style="font-size:15px" "font-weight: 900";> <b>Weekly Test Report</b>  </caption>
            <thead>
              <tr>
                <th style="border: 1px solid black;">Student Name</th>
                <th style="border: 1px solid black;">Father Name</th>
                <th style="border: 1px solid black;">Class</th>
                <th style="border: 1px solid black;">Subject</th>
                <th style="border: 1px solid black;">Test Number</th>
                <th style="border: 1px solid black;">Physics</th>
                <th style="border: 1px solid black;">Bio/Com</th>
                <th style="border: 1px solid black;">Math</th>
                <th style="border: 1px solid black;">Chemistry</th>
                <th style="border: 1px solid black;">English</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="border: 1px solid black;">${studentName}</td>
                <td style="border: 1px solid black;">${fatherName}</td>
                <td style="border: 1px solid black;">${className}</td>
                <td style="border: 1px solid black;">${subjectName}</td>
                <td style="border: 1px solid black;">${testNumber}</td>
                ${subjectMarksHTML}
              </tr>
            </tbody>
          </table>
          <br><br>
          <span style="font-weight:700">Total Marks</span><span style="font-weight:700"> &nbsp; &nbsp; &nbsp; 100</span>
          <br>
          <span style="font-weight:700">Obtained Marks</span><span style="font-weight:700"> &nbsp;  ${totalMarks}</span>
          <br>
          <span style="font-weight:700">Percentage</span><span style="font-weight:700"> &nbsp; &nbsp; &nbsp; ${per} %</span>
        
      `;

        await sendReportEmail(email, reportContent);
      }
      alert("All reports sent successfully");
      console.log("All reports sent successfully");
    }
  };

  return (
    <div>
      <div className="report-inputFields">
        <input
          className="report-search-field"
          placeholder="enter ID for Single Student"
          onChange={(e) => setID(e.target.value)}
        ></input>
        <input
          className="report-search-field"
          placeholder="enter Test number for Both report"
          value={testNumber}
          onChange={(e) => settestNumber(e.target.value)}
        ></input>
        <button className="report-search-btn fs-btn" onClick={ReportData}>
          Report
        </button>
        <button className="report-search-btn fs-btn" onClick={allReportData}>
          Report All Students
        </button>
        <button className="report-search-btn fs-btn" onClick={sendReportData}>
          send individual Report
        </button>
        <button className="report-search-btn fs-btn" onClick={sendAllReportData}>
          Send Report to All Students
        </button>
      </div>
      <div className="student-container" style={{width:"70%"}}>
        <table style={{width:"100%"}}>
          <caption>
            Student Report Card
          </caption>
          <thead>
            <tr>
              <th>Name</th>
              <th>Father Name</th>
              <th>Class</th>
              <th>Subject</th>
              <th>Test Number</th>
              <th>Physics</th>
              <th>Bio/Com</th>
              <th>Math</th>
              <th>Chemistry</th>
              <th>English</th>
            </tr>
          </thead>
          <tbody>
            {reportData && reportData.student && reportData.marks ? (
              <tr>
                <td>{reportData.student.name}</td>
                <td>{reportData.student.fname}</td>
                <td>{reportData.student.class}</td>
                <td>{reportData.student.subject}</td>
                <td>{reportData.marks.testNumber}</td>
                {reportData.marks.subjects.map((subject, index) => (
                  <td key={index}>{subject.marksObtained}</td>
                ))}
              </tr>
            ) : null}
            {allreport && Array.isArray(allreport) && allreport.length > 0
              ? allreport.map((report, index) => (
                  <tr key={index}>
                    <td>{report.student.name}</td>
                    <td>{report.student.fname}</td>
                    <td>{report.student.class}</td>
                    <td>{report.student.subject}</td>
                    <td>{report.marks.testNumber}</td>
                    {report.marks.subjects.map((subject, subIndex) => (
                      <td key={subIndex}>{subject.marksObtained}</td>
                    ))}
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default Report;
