import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home/Home';
import QRScanner from './QRScanner';
import Student from './Student/Student';
import Header from './Header/Header';

function App() {
  return (
    <>
      <Header />
      <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/myStudent" element={<Student />} />
        <Route path="/scan" element={<QRScanner />} /> 
      </Routes>
    </Router>
    </>
  );
}

export default App;
