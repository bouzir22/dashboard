import React, { useState } from 'react';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

const Opportunity = () => {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    selectValue: '1',
    description: '',
    due_date: new Date(),
    requirements: '',
    benefits: '',
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    try {
      // Format the due_date
      const formattedDate = formData.due_date.toLocaleDateString('en-US');

      // Prepare the data for the request
      const requestData = {
        title: formData.title,
        select_value: formData.selectValue,
        description: formData.description,
        due_date: formattedDate,
        requirements: formData.requirements,
        benefits: formData.benefits,
      };

      // Send the POST request
      const response = axios.post('http://localhost:8000/submit-opportunity', requestData).then((response) => {
   
      if (response.status === 201) {
        console.log('Opportunity submitted successfully');
        // Reset the form
        setFormData({
          title: '',
          selectValue: '1',
          description: '',
          due_date: new Date(),
          requirements: '',
          benefits: '',
        });
      } else {
        console.error('Error:', response.data);
      }
    } 
  )
    } catch (error) {console.error('Error:', error); }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const fieldName = name === 'selectValue' ? 'select_value' : name;
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      due_date: date,
    });
  };

  return (
    <Card>
      <Card.Header>
        <Card.Title as="h5">Post New Job Opportunity</Card.Title>
      </Card.Header>
      <Card.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
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
            <Col md={6}>
              <Form.Group controlId="selectValue">
                <Form.Label>Positions</Form.Label>
                <Form.Control
                  as="select"
                  name="select_value" 
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
            </Col>

          </Row>
          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows="5"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
          <Form.Group controlId="requirements">
            <Form.Label>Requirements</Form.Label>
            <Form.Control
                as="textarea"
                rows="5"
                name="requirements"
                value={formData.requirements}
                onChange={handleInputChange}
            />
          </Form.Group>
          </Form.Group>
          
          
              <Form.Group controlId="benefits">
                <Form.Label>Benefits</Form.Label>
                <Form.Control
                  as="textarea"
                  rows="5"
                  name="benefits"
                  value={formData.benefits}
                  onChange={handleInputChange}
                />
              </Form.Group>
            
            <Col>
              <Form.Group controlId="dueDate">
                <Form.Label>Due Date</Form.Label>
                <DatePicker
                  selected={formData.due_date}
                  onChange={handleDateChange}
                  dateFormat="MM/dd/yyyy" 
                />
              </Form.Group>
            </Col>
            
          
          <Col className="text-center"> 
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Col>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default Opportunity;
