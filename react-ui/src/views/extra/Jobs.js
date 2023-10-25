import React, { useState, useEffect } from 'react';
import { Card, Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const Jobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    // Fetch job data from your Django API endpoint
    axios.get('http://localhost:8000/available-opportunities/')
      .then((response) => {
        const formattedJobs = response.data.map((job) => ({
          ...job,
          created_at: formatDate(job.created_at),
          due_date: formatDate(job.due_date),
        }));

        // Filter jobs based on due date and status
        const currentDate = new Date();
        const filteredJobs = formattedJobs.filter((job) => {
          const dueDate = new Date(job.due_date);

          // Only include jobs that are open and have a due date in the future
          return job.status === 'Open' && dueDate > currentDate;
        });

        setJobs(filteredJobs);
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
                <td>
                  <Link to={`/opportunity/preview/${job.id}`}>{job.title}</Link>
                </td>
                <td>{job.created_at}</td>
                <td>{job.due_date}</td>
                <td>{job.status}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Link to="/opportunity/add">
          <Button className="btn-rounded text-capitalize" variant="success">
            Add New Job
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default Jobs;
