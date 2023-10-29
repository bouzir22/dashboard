import React, { useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Row, Col, Button, Alert } from 'react-bootstrap';
import * as Yup from 'yup';
import { Formik } from 'formik';
import axios from 'axios';
import useScriptRef from '../../../hooks/useScriptRef';
import { ACCOUNT_INITIALIZE } from './../../../store/actions';

const RestLogin = ({ className, ...rest }) => {
    const dispatcher = useDispatch();
    const scriptedRef = useScriptRef();
    const [errorMessage, setErrorMessage] = useState(null);
    const account = useSelector((state) => state.account);
    let history = useHistory();
    
    if (account.isLoggedIn) {
        
       // history.push('/public/job/list');
    }
    return (
        <React.Fragment>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                    password: Yup.string().max(255).required('Password is required')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        axios
                            .post('http://localhost:8000/api/login', {
                                password: values.password,
                                email: values.email
                            }) .then(response=>{
                                if (response.status === 200) { 
                                    console.log(response.data); 

                                localStorage.setItem('current', response.data.id);
                                localStorage.setItem('isLoggedIn', true);
                                if(response.data.is_superusr===true){
                                    localStorage.setItem('type', "hr");
                                    console.log("hr");
                                   history.push('/app/dashboard/default');
                                  
                                    
                                }else   history.push('/public/job/list');
                            
                            }
                            }
                            )
                             
                          
                    } catch (err) {
                        console.error(err);
                        if (scriptedRef.current) {
                            setStatus({ success: false });
                            setErrorMessage(err.message); // Set the error message
                            setSubmitting(false);
                        }
                    }
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit} className={className} {...rest}>
                        <div className="form-group mb-3">
                            <input
                                className="form-control"
                                error={touched.email && errors.email}
                                label="Email Address"
                                placeholder="Email Address"
                                name="email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                type="email"
                                value={values.email}
                            />
                            {touched.email && errors.email && <small className="text-danger form-text">{errors.email}</small>}
                        </div>
                        <div className="form-group mb-4">
                            <input
                                className="form-control"
                                error={touched.password && errors.password}
                                label="Password"
                                placeholder="Password"
                                name="password"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                type="password"
                                value={values.password}
                            />
                            {touched.password && errors.password && <small className="text-danger form-text">{errors.password}</small>}
                        </div>

                        {errorMessage && (
                            <Col sm={12}>
                                <Alert variant="danger">{errorMessage}</Alert>
                            </Col>
                        )}

                        <div className="custom-control custom-checkbox text-left mb-4 mt-2">
                            <input type="checkbox" className="custom-control-input" id="customCheck1" />
                            <label className="custom-control-label" htmlFor="customCheck1">
                                Save credentials.
                            </label>
                        </div>

                        <Row>
                            <Col mt={2}>
                                <Button
                                    className="btn-block"
                                    color="primary"
                                    disabled={isSubmitting}
                                    size="large"
                                    type="submit"
                                    variant="primary"
                                >
                                    Sign IN
                                </Button>
                            </Col>
                        </Row>
                    </form>
                )}
            </Formik>
            <hr />
        </React.Fragment>
    );
};

export default RestLogin;
