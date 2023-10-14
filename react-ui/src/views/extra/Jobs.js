import React from 'react';
import { Card, Table,Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Jobs = () => {
//fetch jobs


  return (
    <Card>
      <Card.Header>
        <Card.Title as="h5">Hover Table</Card.Title>
        <span className="d-block m-t-5">
          use props <code>hover</code> with <code>Table</code> component
        </span>
      </Card.Header>
      <Card.Body>
      <Link to="/opportunity/add">
  <Button className="btn-rounded text-capitalize" variant="success">
    apply
  </Button>
</Link>
        <Table responsive hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Job Title</th>
              <th>Publish Date</th>
              <th>Deadline</th>
              <th>availability</th>
              <th>Number of Applications</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Larry</td>
              <td>the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default Jobs;
