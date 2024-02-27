import React from "react";
import "../App.css";
import { useState } from "react";
function Email() {
  const [emails, setEmails] = useState([]);
  const [message, setMessage] = useState("");
  //this function is used to send the emails to all the students at once
  const sendMessageByEmail = async () => {
    //first of all it fetches the Email from the database
    try {
      let result = await fetch("http://localhost:5656/getEmails");
      result = await result.json();
      setEmails(result);
    } catch (error) {
      console.warn({ reult: "ann error occur to find the emails" });
    }

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
        let  messageContent = `
           <h2 style="text-align:center;">Zavia Science Academy</h2>
           <br>
           <h4 style="text-align:center">Notification</h4>
           ${message}
      
           `;
          await sendEmail(email, messageContent);
        }
        alert("All reports sent successfully");
      console.log("All reports sent successfully");
      }
    };
    sendMessageToAll();
  };
  return (
    <div>
      <div className="email-file-container">
        <h2>Message To All Students</h2>
        <textarea
          className="text-area"
          placeholder="Enter Here Your Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <button className="email-btn" onClick={sendMessageByEmail}>
          Send
        </button>
      </div>
    </div>
  );
}
export default Email;
