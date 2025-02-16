import React, { useState } from "react";
import { QrReader } from "modern-react-qr-reader";
import { db, ref, get, update } from "./firebase.js"; // Import Firebase functions
import { useNavigate } from "react-router-dom";

const QRScanner = () => {
  const [scanResult, setScanResult] = useState(null);
  const navigate = useNavigate();

  const handleScan = async (data) => {
    if (!data) return;

    console.log("Scanned Data:", data); // Debugging output

    try {
      const studentData = JSON.parse(data); // Parse QR code data
      setScanResult(studentData);
      
      console.log("Parsed Data:", studentData); // Debugging output

      const studentRef = ref(db, `students/${studentData.id}`);
      const snapshot = await get(studentRef);

      if (snapshot.exists()) {
        const currentPoints = snapshot.val().points || 0;
        const newPoints = currentPoints + 5;

        console.log(`Updating ${studentData.name} points: ${currentPoints} → ${newPoints}`);

        await update(studentRef, { points: newPoints });

        alert(`✅ ${studentData.name} received +5 points!`);
        
        navigate("/"); // Redirect to DisplayData
      } else {
        alert("❌ Student not found in the database!");
      }
    } catch (error) {
      console.error("QR Scan Error:", error);
      alert("❌ Invalid QR Code format!");
    }
  };

  return (
    <div>
      <h2>Scan QR Code</h2>
      <QrReader
        delay={300}
        style={{ width: "100%" }}
        onScan={handleScan}
        onError={(err) => console.error("Scanner Error:", err)}
      />
      {scanResult && (
        <div>
          <h3>Scanned Student:</h3>
          <p><strong>ID:</strong> {scanResult.id}</p>
          <p><strong>Name:</strong> {scanResult.name}</p>
          <p><strong>Class:</strong> {scanResult.class}</p>
          <p><strong>Points:</strong> {scanResult.points}</p>
        </div>
      )}
    </div>
  );
};

export default QRScanner;
