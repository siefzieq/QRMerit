import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, ref, get, update } from "./firebase";
import { Scanner } from "@yudiel/react-qr-scanner";

const QRScanner = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("Scan a QR Code to update points.");

  const handleScan = async (text) => {
    console.log("📸 Scanned QR Code:", text);

    if (!text.includes("id=")) {
      setMessage("❌ Invalid QR Code!");
      return;
    }

    const studentId = new URL(text).searchParams.get("id");
    console.log("📌 Extracted studentId:", studentId);

    if (!studentId) {
      setMessage("❌ No student ID found!");
      return;
    }

    try {
      console.log(`🔍 Fetching student: ${studentId}`);
      const studentRef = ref(db, `students/${studentId}`);
      const snapshot = await get(studentRef);

      if (snapshot.exists()) {
        const studentData = snapshot.val();
        console.log("📌 Student Data:", studentData);

        const newPoints = (studentData.points || 0) + 5;
        console.log(`📈 Updating points to: ${newPoints}`);

        await update(studentRef, { points: newPoints });
        console.log("✅ Points successfully updated!");

        setMessage(`✅ Points updated! ${studentData.name} now has ${newPoints} points.`);
        setTimeout(() => navigate("/"), 3000);
      } else {
        console.log("❌ Student not found in Firebase!");
        setMessage("❌ Student not found!");
      }
    } catch (error) {
      console.error("❌ Error updating points:", error);
      setMessage("❌ Error updating points!");
    }
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100">
      <h2>{message}</h2>
      <Scanner
        onResult={handleScan}
        onError={(error) => console.error("Scanner Error:", error?.message)}
      />
    </div>
  );
};

export default QRScanner;
