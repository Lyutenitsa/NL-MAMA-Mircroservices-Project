// React
import React, {useEffect, useState} from 'react';

// Store
import {useState as useStateHook} from '@hookstate/core';
import store from '../store/store';

// Libraries
import {Redirect} from 'react-router-dom';

// Components
import useLoggedIn from '../hooks/useLoggedIn';

const Logout = () => {
    const isLoggedIn = useLoggedIn();
    const [redirect, setRedirect] = useState();
    const {loginState} = useStateHook(store);

    useEffect(() => {
        const destroySession = () => {
            loginState.set(null);
        }

        if (!isLoggedIn) {
            setRedirect('/error');
        }

        destroySession();
    }, [isLoggedIn, loginState]);

    if (redirect) {
        return <Redirect push to={redirect}/>;
    }

    return <Redirect push to='/login'/>;
};

export default Logout;
