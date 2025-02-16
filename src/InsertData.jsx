import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { db, ref, push } from './firebase.js'; 

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
    <Container fluid className="d-flex justify-content-center align-items-center vh-100">
      <Row>
        <Col>
          <div className="p-4 shadow-lg rounded bg-white">
            <h2 className="mb-4 text-center">Insert Student Data</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="studentName">
                <Form.Label>Student Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter student name"
                  name="name"
                  value={student.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="studentClass" className="mt-3">
                <Form.Label>Kelas</Form.Label>
                <Form.Select
                  name="class"
                  value={student.class}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a class</option>
                  <option value="6 Pintar">6 Pintar</option>
                  <option value="6 Cerdas">6 Cerdas</option>
                  <option value="4 Arif">4 Arif</option>
                </Form.Select>
              </Form.Group>

              <Button variant="primary" type="submit" className="mt-3 w-100" disabled={loading}>
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
