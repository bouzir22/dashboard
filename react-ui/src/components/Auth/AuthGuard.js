import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AuthGuard = ({ children }) => {
    const account = useSelector((state) => state.account);
    const { isLoggedIn } = account;

    if (localStorage.getItem('current') === null||localStorage.getItem('type') != "hr") {
      return <Redirect to="/auth/signin" />;
    }

    return children;
};

export default AuthGuard;
