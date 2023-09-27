import React from 'react';
import { Card, Table } from 'react-bootstrap';

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
        <Table responsive hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Job Reference</th>
              <th>Job Title</th>
              <th>Publish Date</th>
              <th>Deadline</th>
              <th>blayes</th>
              <th>Nombre of Applies</th>
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
