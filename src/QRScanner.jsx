import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { db, ref, get, update } from './firebase'; 

const QRScanner = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const studentId = searchParams.get('id');
  const [message, setMessage] = useState('Processing...');

  useEffect(() => {
    if (!studentId) {
      setMessage("Invalid QR Code!");
      return;
    }

    const studentRef = ref(db, `students/${studentId}`);

    get(studentRef).then((snapshot) => {
      if (snapshot.exists()) {
        const studentData = snapshot.val();
        const newPoints = (studentData.points || 0) + 5;

        update(studentRef, { points: newPoints }).then(() => {
          setMessage(`✅ Points updated! ${studentData.name} now has ${newPoints} points.`);
          setTimeout(() => navigate("/"), 3000); // Redirect to home after 3s
        });
      } else {
        setMessage("❌ Student not found!");
      }
    }).catch(() => setMessage("❌ Error updating points!"));
  }, [studentId, navigate]);

  return (
    <div>
      <h2>{message}</h2>
    </div>
  );
};

export default QRScanner;
