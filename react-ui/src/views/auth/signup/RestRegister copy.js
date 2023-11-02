import React, { Component } from 'react';
import { useHistory } from 'react-router-dom';
import { Row, Col, Button, Form, Card } from 'react-bootstrap';
import * as Yup from 'yup';
import { Formik } from 'formik';
import axios from 'axios';
import useScriptRef from '../../../hooks/useScriptRef';
import qs from 'qs';
import { withRouter } from 'react-router';


class Registration extends Component {
    constructor(props) {
      super(props);
      this.state = {
        // Existing fields
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        first_name: '',
        last_name: '',
        phone_number: '',
        linkedin_profile: '',
        city: '',
        state: '',
        zip_code: '',
        
        // New field for CV (PDF)
        document: null,
        cvId: null,
        isUploading: false, // New state to track CV upload status
      };
    }
  
    handleChange = (e) => {
      const { name, value, type, files } = e.target;
  
      if (type === 'file') {
        // Handle file input separately
        this.setState({ document: files[0] });
      } else {
        // Handle other input fields
        this.setState({ [name]: value });
      }
    };
  
    handleCVUpload = () => {
      this.setState({ isUploading: true });
    
      // Check if a file is selected
      if (this.state.document) {
        const formData = new FormData();
        const reader = new FileReader();
    
        reader.onload = (event) => {
          const base64Data = event.target.result.split(',')[1]; // Remove the data type prefix
          formData.append('base64_data', base64Data);
    
          axios
            .post('http://localhost:8000/api/documents/create/', formData)
            .then((response) => {
              this.setState({ cvId: response.data.document_id, isUploading: false });
            })
            .catch((error) => {
              console.error('Document creation error', error);
              this.setState({ isUploading: false });
            });
        };
    
        // Start reading the file as data URL (base64)
        reader.readAsDataURL(this.state.document);
      } else {
        alert('Please select a file before uploading.');
        this.setState({ isUploading: false });
      }
    };
    
  
    handleSubmit = (e) => {
      e.preventDefault();
  
      // Validate password strength
      if (this.state.password !== this.state.confirmPassword) {
        alert('Password and confirm password must match.');
        return;
      }
      // Password validation rules for security (e.g., minimum length, uppercase, lowercase, digit)
      const passwordValidation = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
      if (!passwordValidation.test(this.state.password)) {
        alert('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one digit.');
        return;
      }
  
      if (!this.state.isUploading) {
        
        const registrationData = new FormData();
        registrationData.append('username', this.state.username);
        registrationData.append('email', this.state.email);
        registrationData.append('password', this.state.password);
        registrationData.append('first_name', this.state.first_name);
        registrationData.append('last_name', this.state.last_name);
        registrationData.append('phone_number', this.state.phone_number);
        registrationData.append('linkedin_profile', this.state.linkedin_profile);
        registrationData.append('city', this.state.city);
        registrationData.append('state', this.state.state);
        registrationData.append('zip_code', this.state.zip_code);
  
        if (this.state.cvId) {
          registrationData.append('document', this.state.cvId);
        }
  
        axios
          .post('http://localhost:8000/api/applicants/register/', registrationData)
          .then((response) => {
            console.log('Registration successful', response.data);
            
            this.props.history.push('/auth/signin');
          })
          .catch((error) => {
            console.error('Registration error', error);
          });
      } else {
        alert('Please wait for the CV upload to complete.');
      }
    };

    render() {
        return (
            <Card>
                <Card.Body>
                    <h5>User Registration</h5>
                    <Form onSubmit={this.handleSubmit}>
                       
                                <Form.Group controlId="username">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="username"
                                        placeholder="Username"
                                        value={this.state.username}
                                        onChange={this.handleChange}
                                    />
                                </Form.Group>
                            
                                <Form.Group controlId="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        value={this.state.email}
                                        onChange={this.handleChange}
                                    />
                                </Form.Group>
                           
                        
                                <Form.Group controlId="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        value={this.state.password}
                                        onChange={this.handleChange}
                                    />
                                </Form.Group>
                            
                                <Form.Group controlId="confirmPassword">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="confirmPassword"
                                        placeholder="Confirm Password"
                                        value={this.state.confirmPassword}
                                        onChange={this.handleChange}
                                    />
                                </Form.Group>
                            
                        <Form.Group controlId="first_name">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="first_name"
                                placeholder="First Name"
                                value={this.state.first_name}
                                onChange={this.handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="last_name">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="last_name"
                                placeholder="Last Name"
                                value={this.state.last_name}
                                onChange={this.handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="phone_number">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                                type="text"
                                name="phone_number"
                                placeholder="Phone Number"
                                value={this.state.phone_number}
                                onChange={this.handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="linkedin_profile">
                            <Form.Label>LinkedIn Profile</Form.Label>
                            <Form.Control
                                type="text"
                                name="linkedin_profile"
                                placeholder="LinkedIn Profile"
                                value={this.state.linkedin_profile}
                                onChange={this.handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="city">
                            <Form.Label>City</Form.Label>
                            <Form.Control
                                type="text"
                                name="city"
                                placeholder="City"
                                value={this.state.city}
                                onChange={this.handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="state">
                            <Form.Label>State</Form.Label>
                            <Form.Control
                                type="text"
                                name="state"
                                placeholder="State"
                                value={this.state.state}
                                onChange={this.handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="zip_code">
                            <Form.Label>ZIP Code</Form.Label>
                            <Form.Control
                                type="text"
                                name="zip_code"
                                placeholder="ZIP Code"
                                value={this.state.zip_code}
                                onChange={this.handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="document">
                        <input type="file" name="cv" onChange={this.handleChange} />
                        </Form.Group>
                        <Button onClick={this.handleCVUpload} disabled={this.state.isUploading}>Upload CV</Button>
                        <Button type="submit" disabled={this.state.isUploading}>Register</Button>
                    </Form>
                </Card.Body>
            </Card>
        );
    }
}

export default withRouter(Registration);
