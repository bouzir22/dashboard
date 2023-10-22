import React, { useState, useEffect } from 'react';
import { Card, Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    // Fetch job data from your Django API endpoint
    axios.get('http://localhost:8000/opportunities')
      .then((response) => {
        setJobs(response.data);
      })
      .catch((error) => {
        console.error('Error fetching job data:', error);
      });
  }, []);

  return (
    <Card>
      <Card.Body>
        <Table responsive hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Job Title</th>
              <th>Publish Date</th>
              <th>Deadline</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job, index) => (
              <tr key={job.id}>
                <th scope="row">{index + 1}</th>
                <td>{job.title}</td>
                <td>{job.created_at}</td>
                <td>{job.due_date}</td>
                <td>{job.status === 'Open' ? 'Open' : 'Closed'}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Link to="/opportunity/add">
          <Button className="btn-rounded text-capitalize" variant="success">
            add new job
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default Jobs;
