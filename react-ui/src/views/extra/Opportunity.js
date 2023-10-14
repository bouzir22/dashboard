import React, { useState } from 'react';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import axios from 'axios'; 
const Opportunity = () => {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    select_value: '1',
    description: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    setValidated(false);

    console.log(formData);






    
    try {
        // Send an HTTP POST request to your API endpoint
        const response =  axios.post('http://localhost:8000/submit-opportunity', formData);
  
        // Handle the response (e.g., show success message, redirect, etc.)
        console.log('Response from server:', response.data);
      } catch (error) {
        // Handle any errors (e.g., show error message)
        console.error('Error:', error);
      }





















    
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <Card>
      <Card.Header>
        <Card.Title as="h5">Post new job opportunity</Card.Title>
      </Card.Header>
      <Card.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row>
            <Col md={12}>
              <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a title.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group controlId="selectValue">
                <Form.Label>positions</Form.Label>
                <Form.Control
                  as="select"
                  name="selectValue"
                  value={formData.select_value}
                  onChange={handleInputChange}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="dueDate">
                <Form.Label>due date</Form.Label>
                <Form.Control
                  type="date"
                  name="due_date"
                  value={formData.due_date}
                  onChange={handleInputChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a title.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows="5"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default Opportunity;
