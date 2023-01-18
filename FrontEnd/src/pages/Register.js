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

const Register = () => {

    const { loginState } = useStateHook(store);
    const [redirect, setRedirect] = useState();
    const { register, handleSubmit } = useForm();

    // Toast - errormessage handling
    const options = useToastOptions();
    const notifyError = (message) => toast.error(message, options);

    const onSubmit = (data) => {

        userService
            .register({
                username: data.name,
                password: data.password,
                first_name: "test",
                last_name: "test",
            })
            .then((response) => {
                // Update store and sets loginstate 
                loginState.set(response.data);
                setRedirect('/homescreen');
            })
            .catch(() => {
                notifyError('Foutieve data');
            });
    }

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
                            <Card.Title>Registreren</Card.Title>
                            <Card.Text as='div'>
                                <Form onSubmit={handleSubmit(onSubmit)}>

                                    <Form.Group controlId='formName'>
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control
                                            data-cy='usernameField'
                                            placeholder='Username'
                                            {...register('name')}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId='formName'>
                                        <Form.Label>First name</Form.Label>
                                        <Form.Control
                                            data-cy='usernameField'
                                            placeholder='First Name'
                                            {...register('name')}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId='formName'>
                                        <Form.Label>Last name</Form.Label>
                                        <Form.Control
                                            data-cy='usernameField'
                                            placeholder='Last Name'
                                            {...register('name')}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId='formPassword'>
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type='password'
                                            data-cy='passwordField'
                                            placeholder='Wachtwoord'
                                            {...register('password')}
                                        />
                                    </Form.Group>

                                    <Button data-cy='registerButton' variant='primary' type='submit' className='mr-3'>
                                        Registreren
                                    </Button>

                                    <Button data-cy='cancelButton' variant='secondary' type='button' className='mr-3' onClick={() => setRedirect('/login')}>
                                        Annuleren
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
}

export default Register;