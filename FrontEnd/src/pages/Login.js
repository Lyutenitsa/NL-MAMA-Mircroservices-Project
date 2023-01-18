// React
import React, { useState } from 'react';

// Store
import { useState as useStateHook } from '@hookstate/core';
import store from '../store/store';

// Libraries
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

// Hooks
import useToastOptions from '../hooks/useToastOptions';

// Services
import userService from '../services/userService';

const Login = () => {

    const { loginState } = useStateHook(store);
    const [redirect, setRedirect] = useState();
    const { register, handleSubmit } = useForm();

    // Toast - errormessage handling
    const options = useToastOptions();
    const notifyError = (message) => toast.error(message, options);

    const onSubmit = (data) => {

        userService
            .login({
                username: data.name,
                password: data.password,
            })
            .then((response) => {
                // Update store
                loginState.set(response.data);
                setRedirect('/homescreen');
            })
            .catch(() => {
                notifyError('Foutieve data');
            });
    };

    if (redirect) {
        return <Redirect push to={redirect} />;
    }

    return (
        <Container className='mt-5'>
            <Row>
                <Col></Col>
                <Col xs={6}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Login</Card.Title>
                            <Card.Text as='div'>
                                <Form onSubmit={handleSubmit(onSubmit)}>

                                    <Form.Group controlId='formName'>
                                        <Form.Label>Naam</Form.Label>
                                        <Form.Control
                                            data-cy='usernameField'
                                            placeholder='Naam'
                                            {...register('name',
                                            )}
                                            
                                        />
                                    </Form.Group>

                                    <Form.Group controlId='formPassword'>
                                        <Form.Label>Wachtwoord</Form.Label>
                                        <Form.Control
                                            data-cy='passwordField'
                                            type='password'
                                            placeholder='Wachtwoord'
                                            {...register('password')}
                                        />
                                        
                                    </Form.Group>

                                    <Button data-cy='loginButton' variant='primary' type='submit' className='mr-3'>
                                        Login
                                    </Button>

                                    <Button data-cy='registerButton' variant='secondary' type='button' className='mr-3' onClick={() => setRedirect('/register')}>
                                        Registreren
                                    </Button>

                                </Form>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>

                <Col></Col>
            </Row>
        </Container>
    );
};

export default Login;
