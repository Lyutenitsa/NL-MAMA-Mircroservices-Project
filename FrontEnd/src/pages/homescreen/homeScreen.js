// React
import React, { useEffect, useState} from 'react';

// Libraries
import { Container, Row, Col } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

// Hooks
import useLoggedIn from '../../hooks/useLoggedIn';
import useLoggedInName from '../../hooks/useLoggedInName';

const HomeScreen = () => {

    //to facilitate the redirection to other page
    const [redirect, setRedirect] = useState();
    
    let alertMessage = '';   

    //two hooks to check status logged in and name of logged in user

    //1. checks whether logged in
    const isLoggedIn = useLoggedIn();

    //2. sets the name of logged in user in variable
    const loggedInName = useLoggedInName(); 
    
    //checks if a user is logged in - if not logged in - redirect to error page
    useEffect(() => {
        if (!isLoggedIn){     
            return <Redirect push to='/error'/>;
        }

        }, [isLoggedIn]
    );    

    //if there is a redirect (clicked on button), then go to page in props (/users)
    if (redirect) {
        return <Redirect push to={redirect}/>;
    }

    return (
        //bootstrap container with large card for message and div below for the redirecting button.
        //welcome message gets the name of the logged-in user using a hook
        <Container className='mt-5'>
            <Row>
                <Col> 
                    {alertMessage}
                    <div className='mb-3'>
                        <h4>

                        </h4>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default HomeScreen;