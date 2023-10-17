import React, { useState } from 'react';
import React, { useState } from 'react';
import { Row, Col, Card, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import AmChartEarnings from './chart/AmChartEarnings';
import AmChartStatistics6 from './chart/AmChartStatistics6';

import avatar1 from '../../../assets/images/user/avatar-1.jpg';
import avatar2 from '../../../assets/images/user/avatar-2.jpg';
import avatar3 from '../../../assets/images/user/avatar-3.jpg';
import UsersApplications from './usersApplications';
import JobList from '../../extra/job-list';
import JobListSummary from './joblist';

const DashDefault = () => { const applications =useState(()=>[{userNname:"test",score:"test"}])

    return (
        <React.Fragment>
            <Row>
                <Col md={6} xl={4}>
                    <Card>
                        <Card.Body>
                            <h6 className="mb-4">Applicants</h6>
                            <div className="row d-flex align-items-center">
                                <div className="col-9">
                                    <h3 className="f-w-300 d-flex align-items-center m-b-0">
                                        <i className="feather icon-arrow-up text-c-green f-30 m-r-5" /> 200
                                    </h3>
                                </div>

                                <div className="col-3 text-right">
                                    <p className="m-b-0">50%</p>
                                </div>
                            </div>
                            <div className="progress m-t-30" style={{ height: '7px' }}>
                                <div
                                    className="progress-bar progress-c-theme"
                                    role="progressbar"
                                    style={{ width: '50%' }}
                                    aria-valuenow="50"
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                />
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6} xl={4}>
                    <Card>
                        <Card.Body>
                            <h6 className="mb-4">Accepted Applications</h6>
                            <div className="row d-flex align-items-center">
                                <div className="col-9">
                                    <h3 className="f-w-300 d-flex align-items-center m-b-0">
                                        <i className="feather icon-arrow-down text-c-red f-30 m-r-5" /> 30
                                    </h3>
                                </div>

                                <div className="col-3 text-right">
                                    <p className="m-b-0">36%</p>
                                </div>
                            </div>
                            <div className="progress m-t-30" style={{ height: '7px' }}>
                                <div
                                    className="progress-bar progress-c-theme2"
                                    role="progressbar"
                                    style={{ width: '35%' }}
                                    aria-valuenow="35"
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                />
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col xl={4}>
                    <Card>
                        <Card.Body>
                            <h6 className="mb-4">App Users</h6>
                            <div className="row d-flex align-items-center">
                                <div className="col-9">
                                    <h3 className="f-w-300 d-flex align-items-center m-b-0">
                                        <i className="feather icon-arrow-up text-c-green f-30 m-r-5" /> 355
                                    </h3>
                                </div>

                                <div className="col-3 text-right">
                                    <p className="m-b-0">70%</p>
                                </div>
                            </div>
                            <div className="progress m-t-30" style={{ height: '7px' }}>
                                <div
                                    className="progress-bar progress-c-theme"
                                    role="progressbar"
                                    style={{ width: '70%' }}
                                    aria-valuenow="70"
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                />
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6} xl={8}>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Statistics</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <AmChartStatistics6 height="450px" />
                        </Card.Body>
                    </Card>
                </Col>
              <JobListSummary/> 
               <Col>
               
               <UsersApplications />
               
               
               </Col>
          
       
            </Row>
        </React.Fragment>
    );
};

export default DashDefault;
