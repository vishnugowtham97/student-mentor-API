const express = require("express");
const app = express();
app.use(express.json());

// Local database objects
const database = {
  mentors: [
    {
      _id: "6157f75a28acda3a2a2d4a2c",
      name: "Gowtham",
      email: "johndoe@example.com",
      mobileNo: "1234567890",
      pic: "https://example.com/johndoe.jpg",
      students: ["6157f75a28acda3a2a2d4a2d", "6157f75a28acda3a2a2d4a2e"],
    },
    {
      _id: "6157f75a28acda3a2a2d4a2f",
      name: "Vishnu",
      email: "janesmith@example.com",
      mobileNo: "9876543210",
      pic: "https://example.com/janesmith.jpg",
      students: [
        "6157f75a28acda3a2a2d4a30",
        "6157f75a28acda3a2a2d4a31",
        "6157f75a28acda3a2a2d4a32",
      ],
    },
  ],
  students: [
    {
      _id: "6157f75a28acda3a2a2d4a2d",
      name: "Alexa",
      mentor: "6157f75a28acda3a2a2d4a2c",
      grade: 8,
      email: "alice@example.com",
      mobileNo: "9876543210",
      pic: "https://example.com/alice.jpg",
    },
    {
      _id: "6157f75a28acda3a2a2d4a2e",
      name: "Dom",
      mentor: "6157f75a28acda3a2a2d4a2c",
      grade: 7,
      email: "bob@example.com",
      mobileNo: "1234567890",
      pic: "https://example.com/bob.jpg",
    },
    {
      _id: "6157f75a28acda3a2a2d4a2f",
      name: "Charlie",
      mentor: "6157f75a28acda3a2a2d4a2f",
      grade: 9,
      email: "charlie@example.com",
      mobileNo: "9876543210",
      pic: "https://example.com/charlie.jpg",
    },
    {
      _id: "6157f75a28acda3a2a2d4a30",
      name: "Maxwell",
      mentor: "6157f75a28acda3a2a2d4a2f",
      grade: 7,
      email: "dave@example.com",
      mobileNo: "1234567890",
      pic: "https://example.com/dave.jpg",
    },
    {
      _id: "6157f75a28acda3a2a2d4a31",
      name: "June",
      mentor: "6157f75a28acda3a2a2d4a2f",
      grade: 8,
      email: "eve@example.com",
      mobileNo: "9876543210",
      pic: "https://example.com/eve.jpg",
    },
    {
      _id: "6157f75a28acda3a2a2d4a32",
      name: "Friday",
      mentor: "6157f75a28acda3a2a2d4a2f",
      grade: 9,
      email: "frank@example.com",
      mobileNo: "1234567890",
      pic: "https://example.com/frank.jpg",
    },
  ],
};

app.get("/", (req, res) => {
  res.send("Welcome to the home page");
});

// Get all mentors
app.get("/mentors", (req, res) => {
  res.json(database.mentors);
});

// Get all students
app.get("/students", (req, res) => {
  res.json(database.students);
});

// Assign a student to a mentor
app.get("/students/:studentId/assign-mentor/:mentorId", (req, res) => {
  const { studentId, mentorId } = req.params;

  // Find the student and mentor
  const student = database.students.find((student) => student.id === studentId);
  const mentor = database.mentors.find((mentor) => mentor.id === mentorId);

  // Check if student or mentor is not found
  if (!student || !mentor) {
    return res.status(404).json({ message: "Student or mentor not found." });
  }

  // Check if the student already has a mentor
  if (student.mentorId) {
    return res.status(400).json({ message: "Student already has a mentor." });
  }

  // Assign the student to the mentor
  student.mentorId = mentorId;
  mentor.students.push(student);
  res.json(student);
});

// Get all students for a particular mentor
app.get("/mentors/:mentorId/students", (req, res) => {
  const { mentorId } = req.params;

  // Find the mentor
  const mentor = database.mentors.find((mentor) => mentor.id === mentorId);

  // Check if mentor is not found
  if (!mentor) {
    return res.status(404).json({ message: "Mentor not found." });
  }

  res.json(mentor.students);
});

// Get the previously assigned mentor for a particular student
app.get("/students/:studentId/previous-mentor", (req, res) => {
  const { studentId } = req.params;

  // Find the student
  const student = database.students.find((student) => student.id === studentId);

  // Check if student is not found
  if (!student) {
    return res.status(404).json({ message: "Student not found." });
  }

  // Find the previously assigned mentor
  const mentor = database.mentors.find((mentor) =>
    mentor.students.some((s) => s.id === studentId)
  );
  if (!mentor) {
    return res
      .status(404)
      .json({ message: "Previously assigned mentor not found." });
  }

  res.json(mentor);
});

// Start the server
app.listen(4000, () => {
  console.log("Server started on port 4000");
});
