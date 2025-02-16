import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DisplayData from "./DisplayData";
import InsertData from "./InsertData";
import QRScanner from "./QRScanner";

function App() {
  return (
    <>
    <InsertData />
      <Router>
      <Routes>
        <Route path="/" element={<DisplayData />} />
        <Route path="/scan" element={<QRScanner />} />
      </Routes>
    </Router>
    </>
    
  );
}

export default App;
