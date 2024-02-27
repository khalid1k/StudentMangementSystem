const express = require("express");
const app = express();
require("./db/dbconfig");
const Student = require("./db/biodataShema");
const Marks = require("./db/marksSchema");
const Fee = require("./db/feeSchema");
const User = require("./db/userSchema");
const nodemailer = require("nodemailer");
const cors = require("cors");
app.use(express.json());
app.use(cors());

//Api is used to stror the user login information into the database
app.post("/userRegister", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();
    res.send(user);
  } catch (err) {
    console.log(err + " something went wrong.....!");
  }
});

//this api is used for login user
app.post("/userLogin", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (username && password) {
      const user = await User.findOne({ username });

      if (user) {
        if (user.password === password) {
          // User authenticated successfully
          res.status(200).json(user);
        } else {
          // Incorrect password
          res.status(401).json({ error: "Incorrect password" });
        }
      } else {
        // User not found
        res.status(401).json({ error: "User not found" });
      }
    } else {
      // Invalid input data
      res.status(400).json({ error: "Invalid input data" });
    }
  } catch (err) {
    // Handle other errors
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});


//Api to store Student BIO data into the database
app.post("/registration", async (req, res) => {
  let student = new Student(req.body);
  let result = await student.save();
  res.send(result);
});
//it is used to search the requird student to fetch the student id
app.get("/search/:key", async (req, res) => {
  let result = await Student.find({
    $or: [
      { name: { $regex: req.params.key } },
      { fname: { $regex: req.params.key } },
    ],
  });
  res.send(result);
});

app.post("/marksEnter", async (req, res) => {
  const formData = req.body;

  const marks = new Marks({
    studentId: formData.id,
    testResults: [
      {
        testNumber: formData.testNumber,
        testDate: formData.date, // Use testDate instead of date
        subjects: [
          { subject: "Physics", marksObtained: parseInt(formData.physics) }, // Use parseInt with a default of 0
          { subject: "Bio/Com", marksObtained: parseInt(formData.bio_com) },
          { subject: "Math", marksObtained: parseInt(formData.math) },
          { subject: "Chemistry", marksObtained: parseInt(formData.chemistry) },
          { subject: "English", marksObtained: parseInt(formData.english) },
        ],
      },
    ],
  });

  try {
    let result = await marks.save();
    res.send(result);
  } catch (error) {
    console.error("Validation Errors:", error.errors);
    res.status(400).send("Validation Errors");
  }
});

app.get("/report/:id/:testNum", async (req, res) => {
  const { id, testNum } = req.params;
  let studentResult = await Student.findOne({ _id: id });
  if (studentResult) {
    let markResult = await Marks.findOne({
      studentId: id,
      "testResults.testNumber": testNum,
    });

    const testResult = markResult.testResults.find(
      (result) => result.testNumber === testNum
    );
    const subjectsData = testResult.subjects;

    const reportData = {
      student: {
        name: studentResult.name,
        fname: studentResult.fname,
        className: studentResult.cls,
        subject: studentResult.subject,
        email: studentResult.email,
      },
      marks: {
        testNumber: testNum,
        subjects: subjectsData,
      },
    };

    res.json(reportData);
  } else {
    res.send({ result: "result is not found" });
  }
});
//This api is used to get the report of all the students
app.get("/report/:testNum", async (req, res) => {
  const { testNum } = req.params;

  try {
    // Find marks data with the given test number
    const markResults = await Marks.find({ "testResults.testNumber": testNum });

    if (markResults.length === 0) {
      res.json({ result: "Test results not found for the given test number." });
      return;
    }

    // Extract student IDs from mark results
    const studentIds = markResults.map((result) => result.studentId);

    // Find students with the extracted student IDs
    const students = await Student.find({ _id: { $in: studentIds } });

    // Create the report data
    const reportData = markResults.map((markResult) => {
      const student = students.find(
        (student) => student._id.toString() === markResult.studentId.toString()
      );
      const subjectsData = markResult.testResults[0].subjects;

      return {
        student: {
          name: student.name,
          fname: student.fname,
          className: student.cls,
          subject: student.subject,
          email: student.email,
        },
        marks: {
          testNumber: testNum,
          subjects: subjectsData,
        },
      };
    });

    res.json(reportData);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

//this api is used to fetch data from database for updation
app.get("/updateStudent/:id", async (req, res) => {
  let result = await Student.findOne({ _id: req.params.id });
  res.send(result);
});
//This api is used to get the report of all the students

//this update the student Bio data
app.put("/updateStudent/:id", async (req, res) => {
  let result = await Student.updateOne(
    { _id: req.params.id },
    {
      $set: req.body,
    }
  );
  res.send(result);
});

//this api is used to send an email to the students

app.post("/sendReportByEmail", async (req, res) => {
  const { toEmail, subject, reportContent } = req.body;

  // Create a transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    service: "gmail", // e.g., 'gmail'
    auth: {
      user: "khalidanmol339@gmail.com",
      pass: "innpslemobvoxric",
    },
  });

  // Setup email data
  const mailOptions = {
    from: "khalidanmol330@gmail.com",
    to: toEmail,
    subject: subject,
    html: reportContent,
  };

  // Send email
  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Error sending email" });
  }
});

//this Api is used to get Emails of all the students
app.get("/getEmails", async (req, res) => {
  try {
    let students = await Student.find({}, "email"); // Retrieve only the 'email' field
    let emails = students.map((student) => student.email); // Extract email addresses

    res.send(emails); // Send only the email addresses to the client
  } catch (error) {
    res.status(500).send("An error occurred.");
  }
});
//this api is used to store the record of Fee
app.post("/depositFee", async (req, res) => {
  try {
    let fee = new Fee(req.body);
    let result = await fee.save();
    res.send(result);
  } catch (error) {
    console.warn(error, {
      result: "An error occur to store data into the database",
    });
  }
});
//this api is used to find the email of the student by id for sending email about fee deposit
app.get("/getEmail/:id", async (req, res) => {
  let student = await Student.findById(req.params.id);
  res.send(student);
});
//this api is used to get the data of all the students
app.get("/getStudents", async (req, res) => {
  let result = await Student.find({});
  res.send(result);
});
//this api is used to fetch the record that paid the fee
app.get("/paidStudents/:month", async (req, res) => {
  const { month } = req.params;

  try {
    const paidStudents = await Fee.find({ month }).populate("studentId");
    res.json(paidStudents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//this api is used to get data of unpaid records
app.get("/unpaidStudents/:month", async (req, res) => {
  const { month } = req.params;

  try {
    // Find all students
    // Find students who have paid fees for the specified month
    const paidFees = await Fee.find({ month }).distinct("studentId");

    // Find all students who have not paid fees for the specified month
    const studentsWithoutFees = await Student.find(
      { _id: { $nin: paidFees } },
      "name fname cls email"
    );
    res.json(studentsWithoutFees);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Define a route to update marks for a specific student and test number
app.put("/updateStudentMarks/:studentId/:testNumber", async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const testNumber = req.params.testNumber;
    const updatedMarksArray = req.body; // Assuming you'll send an array of numbers in the request body

    // Find the mark document by student ID
    const mark = await Marks.findOne({
      studentId,
      "testResults.testNumber": testNumber,
    });

    if (!mark) {
      return res.status(404).json({ error: "Mark not found for student" });
    }

    // Find the test result by test number
    const testResult = mark.testResults.find(
      (result) => result.testNumber === testNumber
    );

    if (!testResult) {
      return res
        .status(404)
        .json({ error: "Test result not found for the specified test number" });
    }

    // Update the marks for the specified test number
    if (updatedMarksArray.length === testResult.subjects.length) {
      testResult.subjects.forEach((subject, index) => {
        subject.marksObtained = updatedMarksArray[index];
      });
    } else {
      return res
        .status(400)
        .json({ error: "Mismatched number of updated marks" });
    }

    // Save the updated mark document
    const updatedMark = await mark.save();

    res.status(200).json(updatedMark);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(5656);
