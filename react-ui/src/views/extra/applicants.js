import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import axios from 'axios';

const ApplicantList = () => {
  const [applicants, setApplicants] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch applicant data from your Django API
    axios.get('http://localhost:8000/applicants') // Adjust the API endpoint as needed
      .then((response) => {
        setApplicants(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const filteredApplicants = applicants.filter((applicant) =>
    applicant.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    applicant.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    applicant.email.toLowerCase().includes(searchQuery.toLowerCase())
    // Add more fields to search here as needed
  );

  const handleDeleteApplicant = (applicantId) => {
    // You can implement the logic to delete the applicant with the given ID here
    // Send a DELETE request to your API endpoint
    axios.delete(`http://localhost:8000/api/applicants/${applicantId}/`)
      .then(() => {
        // If deletion is successful, update the list of applicants
        setApplicants((prevApplicants) => prevApplicants.filter((applicant) => applicant.id !== applicantId));
      })
      .catch((error) => {
        console.error('Error deleting applicant:', error);
      });
  };

  return (
    <Card>
      <Card.Header>
        <Card.Title as="h5">Applicant List</Card.Title>
        <span className="d-block m-t-5">View the list of applicants</span>
      </Card.Header>
      <Card.Body>
        <div className="mb-3">
          <label htmlFor="searchInput" className="form-label">Search Applicants</label>
          <input
            type="text"
            id="searchInput"
            className="form-control"
            placeholder="Enter search query"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>LinkedIn Profile</th>
              <th>City</th>
              <th>State</th>
              <th>Zip Code</th>
              
            </tr>
          </thead>
          <tbody>
            {filteredApplicants.map((applicant, index) => (
              <tr key={applicant.id}>
                <th scope="row">{index + 1}</th>
                <td>{applicant.first_name}</td>
                <td>{applicant.last_name}</td>
                <td>{applicant.username}</td>
                <td>{applicant.email}</td>
                <td>{applicant.phone_number}</td>
                <td>{applicant.linkedin_profile}</td>
                <td>{applicant.city}</td>
                <td>{applicant.state}</td>
                <td>{applicant.zip_code}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDeleteApplicant(applicant.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card.Body>
    </Card>
  );
};

export default ApplicantList;
