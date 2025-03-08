import React, { useEffect, useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { db, ref, onValue } from '../firebase.js';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';

const DisplayData = () => {
  const [students, setStudents] = useState([]);
  useEffect(() => {
    const studentsRef = ref(db, "students"); 
    onValue(studentsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const studentArray = Object.keys(data).map((key) => ({
          id: key, 
          ...data[key] 
        }));
        setStudents(studentArray);
      }
    });
  }, []);

  let i = 0;

  return (
    <Container className='container-fluid'>
      <div className='home my-5 pt-3'>
        <h2 className='fs-2'>QRMerit 6 Pintar</h2>
        <p className='pb-3' style={{fontSize:'1.2rem'}}>Sekolah Kebangsaan Taman Rasah Jaya</p>
        <div className='table-responsive'>
        <table border="1" cellPadding="10" className="table table-bordered border-dark w-100 justify-content-center">
          <thead className='py-3 text-center'>
            <tr>
              <th>No.</th>
              <th>Nama</th>
              <th>Kelas</th>
              <th>Mata Terkumpul</th>
              <th>Kod QR</th>
            </tr>
          </thead>
          <tbody className='py-3 text-center align-middle'>
            {students.map((student,index) => (
              <tr key={student.id}>
                <td>{index+1}.</td>
                <td>{student.name.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase())}</td>
                <td>{student.class}</td>
                <td>{student.points}</td>
                <td>
                  <QRCodeCanvas 
                    value={`https://qrmerit.netlify.app/scan?id=${student.id}`}         
                    size={60} 
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </Container>
    
  );
};

export default DisplayData;
