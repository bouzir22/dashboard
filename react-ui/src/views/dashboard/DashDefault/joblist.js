import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Card, Table } from 'react-bootstrap';

const JobListSummary = () => {
  // Example job data
  const jobData = [
    { id: 1, title: 'Front-end Developer', dueDate: '2023-11-15', availability: 'Available' },
    { id: 2, title: 'UX Designer', dueDate: '2023-11-20', availability: 'Available' },
    { id: 3, title: 'Data Analyst', dueDate: '2023-11-18', availability: 'Not Available' },
    { id: 4, title: 'Software Engineer', dueDate: '2023-11-17', availability: 'Available' },
    { id: 5, title: 'Product Manager', dueDate: '2023-11-19', availability: 'Not Available' },
  ];

  return (
    <Col md={6} xl={4}>
      <Link to="/jobs">
        <Card>
          <Card.Header>
            <Card.Title as="h5">Posted Jobs</Card.Title>
            <span className="d-block m-t-5">  <code>there is 23 posted jobs </code>  </span>
          </Card.Header>
          <Card.Body>
            <Table responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Job Title</th>
                  <th>Due Date</th>
                  <th>Availability</th>
                </tr>
              </thead>
              <tbody>
                {jobData.map((job) => (
                  <tr key={job.id}>
                    <th scope="row">{job.id}</th>
                    <td>{job.title}</td>
                    <td>{job.dueDate}</td>
                    <td>
                      <h6 className="text-muted">
                        <i className="fa fa-circle text-c-red f-10 m-r-15" />
                        {job.availability}
                      </h6>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Link>
    </Col>
  );
};

export default JobListSummary;
