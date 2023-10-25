import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import { Row, Col, Card, Table } from 'react-bootstrap';
import axios from 'axios';

import avatar1 from '../../../assets/images/user/avatar-1.jpg';

const UsersApplications = (props) => {
    const [applications, setApplications] = useState([]);
    const [sortedApplications, setSortedApplications] = useState([]);
    const [sortBy, setSortBy] = useState(null);

    useEffect(() => {
      // Fetch applications from your API endpoint
      axios.get('http://localhost:8000/get-recent-applications/')
          .then((response) => {
              // Assuming the API response is an array of applications
              setApplications(response.data);
              setSortedApplications(response.data);
          })
          .catch((error) => {
              console.error('Error fetching applications:', error);
          });
  }, []);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, options);
    };

    const handleSort = (sortKey) => {
        const sorted = [...sortedApplications];
        if (sortKey === sortBy) {
            // Reverse the order if clicking the same column again
            sorted.reverse();
        } else {
            if (sortKey === 'score') {
                sorted.sort((a, b) => a[sortKey] - b[sortKey]);
            } else if (sortKey === 'created_date') {
                sorted.sort((a, b) => new Date(a[sortKey]) - new Date(b[sortKey]));
            }
        }
        setSortedApplications(sorted);
        setSortBy(sortKey);
    };

    const handleAction = (applicationId, action) => {
        // Send a POST request to either the reject-application or accept-application endpoint
        const endpoint = action === 'reject' ? `http://localhost:8000/reject-application/${applicationId}/` : `http://localhost:8000/accept-application/${applicationId}/`;

        axios.post(endpoint)
            .then((response) => {
                // Handle success, remove the application from the UI
                const updatedApplications = sortedApplications.filter(application => application.id !== applicationId);
                setSortedApplications(updatedApplications);
            })
            .catch((error) => {
                console.error(`Error ${action}ing application:`, error);
            });
    };

    return (
        <div>
            <Col md={12} xl={12}>
                <Card className="Recent-Users">
                    <Card.Header>
                        <Table responsive hover>
                            <thead>
                                <Row>
                                    <Col md={1}></Col>
                                    <Col md={6}>
                                        <div className='btn btn' onClick={() => handleSort('applicantFullName')}>Fullname</div>
                                        <div className='btn' onClick={() => handleSort('score')}>Score</div>
                                    </Col>
                                    <Col>
                                        <div className='btn'> Date</div>
                                    </Col>
                                </Row>
                                <th>actions</th>
                            </thead>
                        </Table>
                    </Card.Header>
                    <Card.Body className="px-0 py-2">
                        <Table responsive hover>
                            <tbody>
                                {sortedApplications.length > 0 ? (
                                    sortedApplications.map((application, index) => (
                                        <tr className="unread" key={`application-${index}`}>
                                            <td>
                                                <img className="rounded-circle" style={{ width: '40px' }} src={avatar1} alt="activity-user" />
                                            </td>
                                            <td>
                                                <Link to={`/public/application/preview/${application.id}`}>{/* Link to preview page */}
                                                    <h6 className="mb-1">{application.applicant.full_name}</h6>
                                                </Link>

                                                <p className="m-0">
                                                    <a href='#'>{application.appRef}</a> application scored {((application.score * 100).toFixed(2))}
                                                </p>
                                            </td>
                                            <td>
                                                <h6 className="text-muted">
                                                    <i className={`fa fa-circle text-c-${application.status === 'Open' ? 'green' : 'red'} f-10 m-r-15`} />
                                                    {formatDate(application.created_date)}
                                                </h6>
                                            </td>
                                            <td>
                                                <Link
                                                    to="#"
                                                    className="label theme-bg2 text-white f-12"
                                                    onClick={() => handleAction(application.id, 'reject')}
                                                    key={`reject-button-${index}`}
                                                >
                                                    Reject
                                                </Link>
                                                <Link
                                                    to="#"
                                                    className="label theme-bg text-white f-12"
                                                    onClick={() => handleAction(application.id, 'approve')}
                                                    key={`approve-button-${index}`}
                                                >
                                                    Approve
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4">No applications to display</td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </Col>
        </div>
    );
};

export default UsersApplications;
