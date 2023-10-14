import React from 'react';
import { Card, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons';

const Jobs = () => {
  return (
    <Card>
      <Card.Header>
        <Card.Title as="h5">Job List</Card.Title>
      </Card.Header>
      <Card.Body>
        <Table responsive hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Job Title</th>
              <th>Publish Date</th>
              <th>Deadline</th>
              <th>Availability</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Job 1</td>
              <td>01/01/2023</td>
              <td>01/31/2023</td>
              <td>Open</td>
              <td>
                <a href="/check" className="btn-circle">
                  <FontAwesomeIcon icon={faCheckCircle} size="lg" className="text-success mx-2" />
                </a>
                <a href="/edit" className="btn-circle">
                  <FontAwesomeIcon icon={faEdit} size="lg" className="text-primary mx-2" />
                </a>
                <a href="/delete" className="btn-circle">
                  <FontAwesomeIcon icon={faTrashAlt} size="lg" className="text-danger mx-2" />
                </a>
              </td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Job 2</td>
              <td>02/01/2023</td>
              <td>02/28/2023</td>
              <td>Closed</td>
              <td>
                <a href="/check" className="btn-circle">
                  <FontAwesomeIcon icon={faCheckCircle} size="lg" className="text-success mx-2" />
                </a>
                <a href="/edit" className="btn-circle">
                  <FontAwesomeIcon icon={faEdit} size="lg" className="text-primary mx-2" />
                </a>
                <a href="/delete" className="btn-circle">
                  <FontAwesomeIcon icon={faTrashAlt} size="lg" className="text-danger mx-2" />
                </a>
              </td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Job 3</td>
              <td>03/01/2023</td>
              <td>03/15/2023</td>
              <td>Open</td>
              <td>
                <a href="/check" className="btn-circle">
                  <FontAwesomeIcon icon={faCheckCircle} size="lg" className="text-success mx-2" />
                </a>
                <a href="/edit" className="btn-circle">
                  <FontAwesomeIcon icon={faEdit} size="lg" className="text-primary mx-2" />
                </a>
                <a href="/delete" className="btn-circle">
                  <FontAwesomeIcon icon={faTrashAlt} size="lg" className="text-danger mx-2" />
                </a>
              </td>
            </tr>
            {/* Add more job rows as needed */}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default Jobs;
