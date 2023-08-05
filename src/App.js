import React, { useState } from "react";
import "./App.css";

const StudentResult = () => {
  const [studentData, setStudentData] = useState([]);
  const [rollNo, setRollNo] = useState("");
  const [name, setName] = useState("");
  const [subject1, setSubject1] = useState("");
  const [subject2, setSubject2] = useState("");
  const [subject3, setSubject3] = useState("");
  const [subject4, setSubject4] = useState("");
  const [subject5, setSubject5] = useState("");
  const [search, setSearch] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editFormData, setEditFormData] = useState({
    rollNo: "",
    name: "",
    subject1: "",
    subject2: "",
    subject3: "",
    subject4: "",
    subject5: "",
  });

  const editStudent = (index) => {
    setEditIndex(index);
    const updateStudent = studentData[index];
    setEditFormData({
      rollNo: updateStudent.rollNo,
      name: updateStudent.name,
      subject1: updateStudent.subjects[0],
      subject2: updateStudent.subjects[1],
      subject3: updateStudent.subjects[2],
      subject4: updateStudent.subjects[3],
      subject5: updateStudent.subjects[4],
    });
  };

  const handleEditFormChange = (e) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditFormSubmit = (e) => {
    e.preventDefault();
    const updatedStudent = {
      rollNo: editFormData.rollNo,
      name: editFormData.name,
      subjects: [
        editFormData.subject1,
        editFormData.subject2,
        editFormData.subject3,
        editFormData.subject4,
        editFormData.subject5,
      ],
    };

    const updatedStudentData = [...studentData];
    updatedStudentData[editIndex] = updatedStudent;
    setStudentData(updatedStudentData);
    setEditIndex(null);
    setEditFormData({
      rollNo: "",
      name: "",
      subject1: "",
      subject2: "",
      subject3: "",
      subject4: "",
      subject5: "",
    });
  };

  const calculateTotalMarks = (subjects) => {
    return subjects.reduce((total, subject) => total + parseInt(subject), 0);
  };

  const calculatePrestige = (totalMarks) => {
    return (totalMarks / 500) * 100;
  };

  const addStudent = (e) => {
    e.preventDefault();

    const student = {
      rollNo,
      name,
      subjects: [subject1, subject2, subject3, subject4, subject5],
    };

    const totalMarks = calculateTotalMarks(student.subjects);
    student.totalMarks = totalMarks;

    const prestige = calculatePrestige(totalMarks);
    student.prestige = prestige;

    setStudentData([...studentData, student]);
    setRollNo("");
    setName("");
    setSubject1("");
    setSubject2("");
    setSubject3("");
    setSubject4("");
    setSubject5("");
  };

  const deleteStudent = (index) => {
    const updatedStudentData = studentData.filter((_,i) => i !== index);
    setStudentData(updatedStudentData);
  };

  const searchStudents = studentData.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <body>
      <form className="form-container" onSubmit={addStudent}>
        <div>
          <label htmlFor="rollNo">Roll No:</label>
          <input
            type="text"
            id="rollNo"
            value={rollNo}
            onChange={(e) => setRollNo(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="subject1">Android:</label>
          <input
            type="text"
            id="subject1"
            value={subject1}
            onChange={(e) => setSubject1(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="subject2">JAVA:</label>
          <input
            type="text"
            id="subject2"
            value={subject2}
            onChange={(e) => setSubject2(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="subject3">PHP:</label>
          <input
            type="text"
            id="subject3"
            value={subject3}
            onChange={(e) => setSubject3(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="subject4">Python:</label>
          <input
            type="text"
            id="subject4"
            value={subject4}
            onChange={(e) => setSubject4(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="subject5">JS:</label>
          <input
            type="text"
            id="subject5"
            value={subject5}
            onChange={(e) => setSubject5(e.target.value)}
          />
        </div>
        <br />
        <button type="submit">Add Student</button>
      </form>
      <br />
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <br />
      <div className="edit-popup">
            <form onSubmit={handleEditFormSubmit}>
              <input
                type="text"
                name="rollNo"
                value={editFormData.rollNo}
                onChange={handleEditFormChange}
              />
              <input
                type="text"
                name="name"
                value={editFormData.name}
                onChange={handleEditFormChange}
              />
              <input
                type="text"
                name="subject1"
                value={editFormData.subject1}
                onChange={handleEditFormChange}
              />
              <input
                type="text"
                name="subject2"
                value={editFormData.subject2}
                onChange={handleEditFormChange}
              />
              <input
                type="text"
                name="subject3"
                value={editFormData.subject3}
                onChange={handleEditFormChange}
              />
              <input
                type="text"
                name="subject4"
                value={editFormData.subject4}
                onChange={handleEditFormChange}
              />
              <input
                type="text"
                name="subject5"
                value={editFormData.subject5}
                onChange={handleEditFormChange}
              />
              <button type="submit">Save</button>
            </form>
          </div>
      <table>
        <thead>
          <tr>
            <th>Roll No</th>
            <th>Name</th>
            <th>Android</th>
            <th>JAVA</th>
            <th>PHP</th>
            <th>Python</th>
            <th>JS</th>
            <th>Total Marks</th>
            <th>Prestige</th>
            <th>Delete</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {searchStudents.map((student, index) => (
            <tr key={index}>
              <td>{student.rollNo}</td>
              <td>{student.name}</td>
              <td>{student.subjects[0]}</td>
              <td>{student.subjects[1]}</td>
              <td>{student.subjects[2]}</td>
              <td>{student.subjects[3]}</td>
              <td>{student.subjects[4]}</td>
              <td>{student.totalMarks}</td>
              <td>{student.prestige}</td>
              <td>
                <button
                  className="delete" onClick={() => deleteStudent(index)}>
                  Delete
                </button>
              </td>
              <td>
                <button className="edit" onClick={() => editStudent(index)}>
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </body>
  );
};

export default StudentResult;
