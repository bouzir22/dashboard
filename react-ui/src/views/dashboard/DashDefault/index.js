import React from 'react';
import { Row, Col, Card, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import AmChartEarnings from './chart/AmChartEarnings';
import AmChartStatistics6 from './chart/AmChartStatistics6';

import avatar1 from '../../../assets/images/user/avatar-1.jpg';
import avatar2 from '../../../assets/images/user/avatar-2.jpg';
import avatar3 from '../../../assets/images/user/avatar-3.jpg';

const DashDefault = () => {
    return (
        <React.Fragment>
            <Row>
                <Col md={6} xl={4}>
                    <Card>
                        <Card.Body>
                            <h6 className="mb-4">Daily Sales</h6>
                            <div className="row d-flex align-items-center">
                                <div className="col-9">
                                    <h3 className="f-w-300 d-flex align-items-center m-b-0">
                                        <i className="feather icon-arrow-up text-c-green f-30 m-r-5" /> $249.95
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
                            <h6 className="mb-4">Monthly Sales</h6>
                            <div className="row d-flex align-items-center">
                                <div className="col-9">
                                    <h3 className="f-w-300 d-flex align-items-center m-b-0">
                                        <i className="feather icon-arrow-down text-c-red f-30 m-r-5" /> $2.942.32
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
                            <h6 className="mb-4">Yearly Sales</h6>
                            <div className="row d-flex align-items-center">
                                <div className="col-9">
                                    <h3 className="f-w-300 d-flex align-items-center m-b-0">
                                        <i className="feather icon-arrow-up text-c-green f-30 m-r-5" /> $8.638.32
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
                <Col md={6} xl={4}>
                    <Card className="bg-c-blue">
                        <Card.Header className="borderless">
                            <Card.Title as="h5" className="text-white">
                                Earnings
                            </Card.Title>
                        </Card.Header>
                        <Card.Body style={{ padding: '0 25px' }}>
                            <div className="earning-text mb-0">
                                <h3 className="mb-2 text-white f-w-300">
                                    {' '}
                                    $4295.36 <i className="feather icon-arrow-up teal accent-3" />
                                </h3>
                                <span className="text-uppercase text-white d-block">Total Earnings</span>
                            </div>
                            <AmChartEarnings height="180px" />
                        </Card.Body>
                    </Card>
                    <Link to="/jobs"> 
                    <Card>
                        <Card.Body className="border-bottom">
                            <div className="row d-flex align-items-center">
                                <div className="col-auto">
                                    <i className="feather icon-zap f-30 text-c-green" />
                                </div>
                                <div className="col">
                                    <h3 className="f-w-300">235</h3>
                                    <span className="d-block text-uppercase">total ideas</span>
                                </div>
                            </div>
                        </Card.Body>
                        <Card.Body>
                            <div className="row d-flex align-items-center">
                                <div className="col-auto">
                                    <i className="feather icon-map-pin f-30 text-c-blue" />
                                </div>
                                <div className="col">
                                    <h3 className="f-w-300">26</h3>
                                    <span className="d-block text-uppercase">total locations</span>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                    </Link>
                </Col>
      
               
          
                <Col md={12} xl={12}>
                    <Card className="Recent-Users">
                        <Card.Header>
                            <Card.Title as="h5">Recent Applications</Card.Title>
                        </Card.Header>
                        <Card.Body className="px-0 py-2">
                            <Table responsive hover>
                                <tbody>
                                    <tr className="unread">
                                        <td>
                                            <img className="rounded-circle" style={{ width: '40px' }} src={avatar1} alt="activity-user" />
                                        </td>
                                        <td>
                                            <h6 className="mb-1">Isabella Christensen</h6>
                                            <p className="m-0">job550 with score of 50%</p>
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
                                    <tr className="unread">
                                        <td>
                                            <img className="rounded-circle" style={{ width: '40px' }} src={avatar2} alt="activity-user" />
                                        </td>
                                        <td>
                                            <h6 className="mb-1">Mathilde Andersen</h6>
                                            <p className="m-0">Lorem Ipsum is simply dummy text of…</p>
                                        </td>
                                        <td>
                                            <h6 className="text-muted">
                                                <i className="fa fa-circle text-c-red f-10 m-r-15" />
                                                11 MAY 10:35
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
                                    <tr className="unread">
                                        <td>
                                            <img className="rounded-circle" style={{ width: '40px' }} src={avatar3} alt="activity-user" />
                                        </td>
                                        <td>
                                            <h6 className="mb-1">Karla Sorensen</h6>
                                            <p className="m-0">Lorem Ipsum is simply dummy text of…</p>
                                        </td>
                                        <td>
                                            <h6 className="text-muted">
                                                <i className="fa fa-circle text-c-green f-10 m-r-15" />9 MAY 17:38
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
                                    <tr className="unread">
                                        <td>
                                            <img className="rounded-circle" style={{ width: '40px' }} src={avatar1} alt="activity-user" />
                                        </td>
                                        <td>
                                            <h6 className="mb-1">Ida Jorgensen</h6>
                                            <p className="m-0">Lorem Ipsum is simply dummy text of…</p>
                                        </td>
                                        <td>
                                            <h6 className="text-muted f-w-300">
                                                <i className="fa fa-circle text-c-red f-10 m-r-15" />
                                                19 MAY 12:56
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
                                    <tr className="unread">
                                        <td>
                                            <img className="rounded-circle" style={{ width: '40px' }} src={avatar2} alt="activity-user" />
                                        </td>
                                        <td>
                                            <h6 className="mb-1">Albert Andersen</h6>
                                            <p className="m-0">Lorem Ipsum is simply dummy text of…</p>
                                        </td>
                                        <td>
                                            <h6 className="text-muted">
                                                <i className="fa fa-circle text-c-green f-10 m-r-15" />
                                                21 July 12:56
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
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default DashDefault;
