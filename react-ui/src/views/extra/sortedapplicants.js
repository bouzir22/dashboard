import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const SortedApplicantList = () => {
  const { accepted } = useParams();
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    // Fetch sorted applicant data based on the 'accepted' value from the route parameter
    axios
      .get(`http://localhost:8000/filtered/applicants/?accepted=${accepted}`)
      .then((response) => {
        setApplicants(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [accepted]);

  return (
    <Card>
      <Card.Header>
        <Card.Title as="h5">Applicant List</Card.Title>
        <span className="d-block m-t-5">View the list of applicants</span>
      </Card.Header>
      <Card.Body>
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
            {applicants.map((applicant, index) => (
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
              </tr>
            ))}
          </tbody>
        </table>
      </Card.Body>
    </Card>
  );
};

export default SortedApplicantList;
