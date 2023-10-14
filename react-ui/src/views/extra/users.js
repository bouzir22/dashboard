import React, { useState } from 'react';
import { Row, Col, Card, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import avatar1 from '../../assets/images/user/avatar-1.jpg';
 
const Users  = (props) => {
    const [applications, setApplications] = useState([
        { userName: "Med Ahmed", applications: 3,appRef:" " },
        { userName: "Anas Test", applications:1,appRef:" " },
        { userName: "Test Test", applications: 1,appRef:" " },
     
        // Add more application objects as needed
    ]);
    let  i=1

    
     return(
        <div>        <Col md={6} xl={4}>
        {/* Your existing code for Daily Sales card */}
    </Col>
    <Col md={6} xl={4}>
        {/* Your existing code for Monthly Sales card */}
    </Col>
    <Col xl={4}>
        {/* Your existing code for Yearly Sales card */}
    </Col>
    <Col md={6} xl={8}>
        {/* Your existing code for Statistics */}
    </Col>
    <Col md={6} xl={4}>
        <Link to="/jobs">
            {/* Your existing code for Basic Table */}
        </Link>
    </Col>
    <Col md={12} xl={12}>
        <Card className="Recent-Users">
            <Card.Header>
                <Card.Title as="h5">Users</Card.Title>
            </Card.Header>
            <Card.Body className="px-0 py-2">
                <Table responsive hover>
                    <tbody>
                        {applications.map((application, index) => (
                         

                            <tr className="unread" key={index}>
                                <td>
                                    <img className="rounded-circle" style={{ width: '40px' }} src={avatar1} alt="activity-user" />
                                </td>
                                <td>
                                    <h6 className="mb-1">{application.userName}</h6>
                                    <p className="m-0">  <a href='#'>{application.appRef} </a>applied in{application.applications} jobs</p>
                                </td>
                                <td>
                                    <h6 className="text-muted">
                                        <i className="fa fa-circle text-c-green f-10 m-r-15" />
                                        11 MAY 12:56
                                    </h6>
                                </td>
                                <td>
                                    <Link to="user/data" className="label theme-bg2 text-white f-12">
                                        View
                                    </Link>
                                    <Link to="#" className="label theme-bg text-white f-12">
                                        Block
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    </Col></div>
         
    );
};

export default Users;