import React, { useState } from 'react';
import { Row, Col, Card, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ApplicationTable from './users-applications-table'

import avatar1 from '../../../assets/images/user/avatar-1.jpg';
 

const UsersApplications = (props) => {
    const [applications, setApplications] = useState([
        { userName: "Med Ahmed", score: "50%" ,appRef:"app52" },
        { userName: "Anas Test", score: "36%",appRef:"app12" },
        { userName: "Test Test", score: "70%",appRef:"app10" },
    ]);

    const [sortedApplications, setSortedApplications] = useState([...applications]);
    const [sortBy, setSortBy] = useState(null);
    const handleSort = (sortKey) => {
        const sorted = [...sortedApplications];
        if (sortKey === sortBy) {
          // Reverse the order if clicking the same column again
          sorted.reverse();
        } else {
          sorted.sort((a, b) => a[sortKey] - b[sortKey]);
        }
        setSortedApplications(sorted);
        setSortBy(sortKey);
      };
    

        // Add more application objects as needed

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
        <Card.Title as="h5">Recent Applications</Card.Title>
        <Table responsive hover>
          <thead>
          
            <Row>
                <Col md={1}></Col>
                <Col  md={6}> <div className='btn btn' onClick={() => handleSort('userName')}>User Name</div>
           
                 <div className='btn' onClick={() => handleSort('score')}>Score</div></Col>
               
                <Col> <div  className='btn'> Date</div>  </Col>
                
             

            </Row>
      <th>actions</th>
             
         
          </thead>
        </Table>
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
                                    <p className="m-0">  <a href='#'>{application.appRef} </a>application scored {application.score}</p>
                                </td>
                                <td>
                                    <h6 className="text-muted">
                                        <i className="fa fa-circle text-c-green f-10 m-r-15" />
                                        11 MAY 12:56
                                    </h6>
                                </td>
                                <td>
                                    <Link to="#" className="label theme-bg2 text-white f-12">
                                        Reject
                                    </Link>
                                    <Link to="#" className="label theme-bg text-white f-12">
                                        Approve
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

export default UsersApplications;
