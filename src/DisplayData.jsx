import React, { useEffect, useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { db, ref, onValue } from './firebase'; // Import Firebase

const DisplayData = () => {
  const [students, setStudents] = useState([]);

  // Fetch data from Firebase Realtime Database
  useEffect(() => {
    const studentsRef = ref(db, "students"); // Path to Firebase database
    onValue(studentsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Convert Firebase object to an array
        const studentArray = Object.keys(data).map((key) => ({
          id: key, // Firebase unique key
          ...data[key] // Student data
        }));
        setStudents(studentArray);
      }
    });
  }, []);

  let i = 0;

  return (
    <div className='px-5 container-fluid'>
      <h2>Student Records</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Class</th>
            <th>Points Obtained</th>
            <th>QR Code</th>
            <th>Logo Print</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student,index) => (
            <tr key={student.id}>
              <td>{index+1}.</td>
              <td>{student.name}</td>
              <td>{student.class}</td>
              <td>{student.points}</td>
              <td>
                <QRCodeCanvas 
                  value={`https://yourwebsite.com/scan?id=${student.id}`}             
                  size={75} 
                />
              </td>
              <td>
                <img 
                  src={student.logo ? student.logo : "/default-logo.png"} 
                  alt="Logo Print" 
                  width="50" 
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DisplayData;
