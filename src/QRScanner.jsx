import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { db, ref, get, update } from './firebase'; 

const QRScanner = () => {
  const [searchParams] = useSearchParams();
  console.log("🔍 URL Params:", searchParams.toString());  // Debugging

  const studentId = searchParams.get('id');
  console.log("📌 Extracted studentId:", studentId);  // Debugging

  const navigate = useNavigate();
  const [message, setMessage] = useState('Processing...');

  useEffect(() => {
    if (!studentId) {
      setMessage("Invalid QR Code!");
      console.log("❌ No student ID found in URL!");
      return;
    }

    console.log(`🔍 Fetching student: ${studentId}`);
    const studentRef = ref(db, `students/${studentId}`);

    get(studentRef).then((snapshot) => {
      if (snapshot.exists()) {
        const studentData = snapshot.val();
        console.log("📌 Student Data:", studentData);

        const newPoints = (studentData.points || 0) + 5;
        console.log(`📈 Updating points to: ${newPoints}`);

        update(studentRef, { points: newPoints })
          .then(() => {
            console.log("✅ Points successfully updated!");
            setMessage(`✅ Points updated! ${studentData.name} now has ${newPoints} points.`);
            setTimeout(() => navigate("/"), 3000);
          })
          .catch((error) => {
            console.error("❌ Error updating points:", error);
            setMessage("❌ Error updating points!");
          });

      } else {
        console.log("❌ Student not found in Firebase!");
        setMessage("❌ Student not found!");
      }
    }).catch((error) => {
      console.error("❌ Error fetching student:", error);
      setMessage("❌ Error fetching student data!");
    });
  }, [studentId, navigate]);

  return (
    <div>
      <h2>{message}</h2>
    </div>
  );
};

export default QRScanner;
