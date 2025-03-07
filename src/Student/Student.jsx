import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { db, ref, push } from '../firebase.js'; 

const InsertData = () => {
  const [student, setStudent] = useState({ name: '', class: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const studentData = { name: student.name, class: student.class };

      // Push data to Realtime Database
      await push(ref(db, "students"), studentData);
      
      alert(`Student ${student.name} added successfully!`);
      setStudent({ name: '', class: '' });
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Failed to add student!");
    }

    setLoading(false);
  };

  return (
    <Container className='container-fluid'>
      <div className='my-5 pt-3'>
        <h2 className='fs-2'>Daftar Pelajar</h2>
        <p className='pb-2' style={{fontSize:'1.2rem'}}>Sekolah Kebangsaan Taman Rasah Jaya</p>
      </div>
      <Row>
        <Col>
          <div className="p-5 rounded bg-white border border-dark">
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="studentName">
                <Form.Label>Nama</Form.Label>
                <Form.Control
                  type="text"
                  className='border border-dark'
                  placeholder="Masukkan nama pelajar"
                  name="name"
                  value={student.name}
                  onChange={handleChange}
                  autoFocus
                  autoComplete='off'
                  required
                />
              </Form.Group>

              <Form.Group controlId="studentClass" className="my-4">
                <Form.Label>Kelas</Form.Label>
                <Form.Select
                  name="class"
                  className='border border-dark'
                  value={student.class}
                  onChange={handleChange}
                  required
                >
                  <option value=''>Pilih Kelas</option>
                  <option value="6 Pintar">6 Pintar</option>
                  <option value="6 Cerdas">6 Cerdas</option>
                  <option value="4 Arif">4 Arif</option>
                </Form.Select>
              </Form.Group>

              <Button variant="dark" type="submit" className="mt-3 w-100" disabled={loading}>
                {loading ? "Submitting..." : "Submit"}
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default InsertData;
