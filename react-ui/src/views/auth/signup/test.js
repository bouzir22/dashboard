import React, { Component } from 'react';
import { useHistory } from 'react-router-dom';
import { Row, Col, Button, Alert } from 'react-bootstrap';
import * as Yup from 'yup';
import { Formik } from 'formik';
import axios from 'axios';
import useScriptRef from '../../../hooks/useScriptRef';
import qs from 'qs';

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
          this.props.history.push('/public/job/list');
          localStorage.setItem('current', response.data.id);
          localStorage.setItem('isLoggedIn', true);
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
        <React.Fragment>
            
      <div>
        <h1>User Registration</h1>
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="username" placeholder="Username" onChange={this.handleChange} />
          <input type="email" name="email" placeholder="Email" onChange={this.handleChange} />
          <input type="password" name="password" placeholder="Password" onChange={this.handleChange} />
          <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={this.handleChange} />
          <input type="text" name="first_name" placeholder="First Name" onChange={this.handleChange} />
          <input type="text" name="last_name" placeholder="Last Name" onChange={this.handleChange} />
          <input type="text" name="phone_number" placeholder="Phone Number" onChange={this.handleChange} />
          <input type="text" name="linkedin_profile" placeholder="LinkedIn Profile" onChange={this.handleChange} />
          <input type="text" name="city" placeholder="City" onChange={this.handleChange} />
          <input type="text" name="state" placeholder="State" onChange={this.handleChange} />
          <input type="text" name="zip_code" placeholder="ZIP Code" onChange={this.handleChange} />
          <input type="file" name="cv" onChange={this.handleChange} />
          <button onClick={this.handleCVUpload} disabled={this.state.isUploading}>Upload CV</button>
          <button type="submit" disabled={this.state.isUploading}>Register</button>
        </form>
      </div>
        </React.Fragment>   
       
    );
  }
}

export default Registration;
