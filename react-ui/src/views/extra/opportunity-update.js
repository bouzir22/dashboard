import React, { useState } from 'react';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

const OpportunityUpdate = ({ opportunityData }) => {
  const [formData, setFormData] = useState({
    title: opportunityData.title || '',
    selectValue: opportunityData.select_value || '1', // Change to select_value
    description: opportunityData.description || '',
    due_date: new Date(opportunityData.due_date) || new Date(),
    requirements: opportunityData.requirements || '',
    benefits: opportunityData.benefits || '',
  });
  const id = opportunityData.id;

  const handleSubmit = async (event) => {
    
    try {
      const formattedDate = formData.due_date.toISOString(); // Format date correctly
      const requestData = {
        title: formData.title,
        select_value: formData.selectValue, // Change to selectValue
        description: formData.description,
        due_date: formattedDate,
        requirements: formData.requirements,
        benefits: formData.benefits,
      };

      const response = await axios.patch(`http://localhost:8000/opportunity/${id}/`, requestData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        console.log('Opportunity updated successfully');
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
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const fieldName = name === 'selectValue' ? 'selectValue' : name; // Change to selectValue
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
        <Card.Title as="h5">Edit Job Opportunity</Card.Title>
      </Card.Header>
      <Card.Body>
        <Form  onSubmit={handleSubmit}>
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
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="selectValue">
                <Form.Label>Positions</Form.Label>
                <Form.Control
                  as="select"
                  name="selectValue"
                  value={formData.selectValue}
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
          </Form.Group>
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
              Update
            </Button>
          </Col>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default OpportunityUpdate;
