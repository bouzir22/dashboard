import React from 'react';
import { useHistory } from 'react-router-dom';
import { Row, Col, Button, Alert } from 'react-bootstrap';
import * as Yup from 'yup';
import { Formik } from 'formik';
import axios from 'axios';
import useScriptRef from '../../../hooks/useScriptRef';
import qs from 'qs';


const RestRegister = ({ className, ...rest }) => {
    let history = useHistory();
    const scriptedRef = useScriptRef();

    return (
        <React.Fragment>
            <Formik
                initialValues={{
                    username: '',
                    email: '',
                    password: '',
                    retypePassword: '',
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string()
                        .email('Must be a valid email')
                        .max(255)
                        .required('Email is required'),
                    username: Yup.string().required('Username is required'),
                    password: Yup.string()
                        .matches(
                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                            'Password must include at least one uppercase letter, one lowercase letter, and one digit'
                        )
                        .max(255)
                        .required('Password is required'),
                    retypePassword: Yup.string()
                        .oneOf([Yup.ref('password'), null], 'Passwords must match')
                        .required('Retype Password is required'),
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        axios
                            .post('http://localhost:8000/api/register/', 
                            qs.stringify({
                                username: values.username,
                                email: values.email,
                                password: values.password
                                
                            }),{
                                headers: {  'Content-Type': 'application/x-www-form-urlencoded',
                                  'Accept': '*/*'
                                  }
                              })
                            .then(function (response) {
                                console.log(response);
                                if (response.status===201) {
                                    localStorage.setItem('current', response.data.id);
                                    localStorage.setItem('isLoggedIn', true);
                                    history.push('/public/job/apply');
                                } else {
                                    setStatus({ success: false });
                                    setErrors({ submit: response.data.msg });
                                    setSubmitting(false);
                                }
                            })
                            .catch(function (error) {
                                setStatus({ success: false });
                                setErrors({ submit: error.response.data.msg });
                                setSubmitting(false);
                            });
                    } catch (err) {
                        console.error(err);
                        if (scriptedRef.current) {
                            setStatus({ success: false });
                            setErrors({ submit: err.message });
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
                                error={touched.username && errors.username}
                                label="Username"
                                placeholder="Username"
                                name="username"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                type="email"
                                value={values.username}
                            />
                            {touched.username && errors.username && <small className="text-danger form-text">{errors.username}</small>}
                        </div>
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
                        <div className="form-group mb-4">
                            <input
                                className="form-control"
                                error={touched.retypePassword && errors.retypePassword}
                                label="Retype Password"
                                placeholder="Retype Password"
                                name="retypePassword"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                type="password"
                                value={values.retypePassword}
                            />
                            {touched.retypePassword && errors.retypePassword && (
                                <small className="text-danger form-text">{errors.retypePassword}</small>
                            )}
                        </div>

                        {errors.submit && (
                            <Col sm={12}>
                                <Alert variant="danger">{errors.submit}</Alert>
                            </Col>
                        )}

                        <div className="custom-control custom-checkbox  text-left mb-4 mt-2">
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
                                    Sign UP
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

export default RestRegister;
