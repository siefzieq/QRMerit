import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { db, ref, get, update } from "./firebase";
import { Scanner } from "@yudiel/react-qr-scanner";

const QRScanner = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [message, setMessage] = useState("Scan a QR Code to update points.");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const studentId = params.get("id");

    if (studentId) {
      handleUpdatePoints(studentId);
    }
  }, [location.search]);

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

    handleUpdatePoints(studentId);
  };

  const handleUpdatePoints = async (studentId) => {
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

        alert(`✅ 5 points added successfully for ${studentData.name}!`);
        navigate("/"); // Redirect to home after alert
      } else {
        console.log("❌ Student not found in Firebase!");
        alert("❌ Student not found!");
        navigate("/");
      }
    } catch (error) {
      console.error("❌ Error updating points:", error);
      alert("❌ Error updating points!");
      navigate("/");
    }
  };

  return (
    <>
      <h2>{message}</h2>
      <Scanner
        onResult={handleScan}
        onError={(error) => console.error("Scanner Error:", error?.message)}
        constraints={{
          video: {
            facingMode: "environment", // Uses rear camera
          },
        }}
      />
    </>
  );
};

export default QRScanner;
