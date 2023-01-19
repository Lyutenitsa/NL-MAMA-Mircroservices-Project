// React
import React from 'react';

// Store
import { useState as useStateHook } from '@hookstate/core';
import store from '../store/store';

// Libraries
import {Navbar, Nav} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

// Hooks
import useLoggedInName from '../hooks/useLoggedInName';

const Menubar = () => {
    const { loginState } = useStateHook(store);
    // const username = useLoggedInName();

    //empty variables for link components 
    let homeLink = '';
    let loginLink = '';
    let registerLink = '';
    let usersLink = '';
    let articlesLink = '';
    let newTopicLink = '';
    let logoutLink = '';
    let loggedInName = '';

    //This if statement checks whether a user is logged in and displays links and text accordingly in menubar
    if (!loginState.get()) {
        loginLink = (
            <LinkContainer to='/login'>
                <Nav.Link>Login</Nav.Link>
            </LinkContainer>
        );

        registerLink = (
            <LinkContainer to='/register'>
                <Nav.Link>Register</Nav.Link>
            </LinkContainer>
        );
    } else {

        //link to homescreen
        homeLink = (
            <LinkContainer to='/homescreen'>
                <Nav.Link><b>NL-MAMA</b></Nav.Link>
            </LinkContainer>

        )

        //link logging out
        logoutLink = (
            <LinkContainer to='/logout'>
                <Nav.Link>Logout</Nav.Link>
            </LinkContainer>
        );

        //link article uploading
        articlesLink = (
            <LinkContainer to='/articles'>
                <Nav.Link>Articles</Nav.Link>
            </LinkContainer>
        );
        newTopicLink = (
            <LinkContainer to='/newTopic'>
                <Nav.Link>New Topic</Nav.Link>
            </LinkContainer>
        );

        // //name of logged-in user
        // loggedInName = (
        //     <Navbar.Text>
        //        {username} is ingelogd.
        //     </Navbar.Text>
        // );
    }

    return (
        <Navbar bg='dark' variant='dark' expand='lg'>
            <Navbar.Collapse id='basic-navbar-nav'>
                <Nav className='mr-auto'>
                    {loginLink}
                    {registerLink}
                    {homeLink}
                    {usersLink}
                    {articlesLink}
                    {newTopicLink}
                    {logoutLink}
                </Nav>
                {loggedInName}
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Menubar;
