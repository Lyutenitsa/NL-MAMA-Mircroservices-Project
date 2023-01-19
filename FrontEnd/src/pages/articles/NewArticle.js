// React
import React, {useEffect, useState} from 'react';

// Store
import {useState as useStateHook} from '@hookstate/core';
import store from '../../store/store';

// Libraries
import {Container, Row, Col, Form, Button, Card} from 'react-bootstrap';
import {useForm} from 'react-hook-form';
import {Redirect, useParams} from 'react-router-dom';
import {toast} from 'react-toastify';

// Hooks
import useToastOptions from '../../hooks/useToastOptions';

// Services
import articleService from '../../services/articleService';
import topicService from "../../services/topicService";

const NewArticle = () => {
    const {id} = useParams();

    const [topics, setTopics] = useState([]);

    const [redirect, setRedirect] = useState();
    const {register, handleSubmit, setValue} = useForm();
    const {data, setData} = useState([]);
    // Toast - errormessage handling
    const options = useToastOptions();
    const notifyError = (message) => toast.error(message, options);


    useEffect(() => {
        const findOne = () => {
            articleService
                .findOne({
                    id: id,
                })
                .then((response) => {
                    let article = response.data;

                    setValue("title", article.title);
                    setValue("description", article.description);
                    setValue("content", article.content);
                    setValue("author_user_id", article.author_user_id);
                    setValue("topic_id", article.topic_id);
                })
                .catch((error) => {
                    console.log(error);
                });
        }

        // const findAllTopics = () => {
        //     topicService
        //         .findAll()
        //         .then((response) => {
        //             let serverTopics = response.data;
        //             setTopics(serverTopics);
        //         })
        //         .catch((error) => {
        //             console.log(error);
        //         });
        // }
        findOne();
        // findAllTopics();
    });


        const onSubmit = (data) => {

            articleService
                .save({
                    title: data.title,
                    description: data.description,
                    content: data.content,
                    author_user_id: data.author_user_id,
                    topic_id: data.topic_id
                })
                .then((response) => {
                    // Update store and sets loginstate
                    setData(response.data);
                })
                .catch(() => {
                    notifyError('Foutieve data');
                });
        }

        if (redirect) {
            return <Redirect push to={redirect}/>;
        }

        return (
            <Container className="mt-5">
                <Row>
                    <Col></Col>
                    <Col xs={8}>
                        <Card>
                            <Card.Body>
                                <Card.Title>New Article</Card.Title>

                                <Card.Text as="div">
                                    <Form onSubmit={handleSubmit(onSubmit)}>

                                        <Form.Group controlId="formTitle">
                                            <Form.Label>Title</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="title"
                                                {...register("title")}
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="formDescription">
                                            <Form.Label>Description</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="description"
                                                {...register("description")}
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="formContent">
                                            <Form.Label>Content</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="content"
                                                {...register("content")}
                                            />
                                        </Form.Group>
                                        <Form.Group controlId="formAuthor_user_id">
                                            <Form.Label>Author</Form.Label><br/>
                                            <Form.Control
                                                type="text"
                                                placeholder="author"
                                                {...register("author_user_id")}
                                            />
                                        </Form.Group>

                                        <Form.Group controlId="formTopic">
                                            <Form.Label>Topic</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="topic"
                                                {...register("topic_id",)}
                                            />
                                        </Form.Group>

                                        <Button variant="primary" type="submit" className="mr-3"
                                                onClick={() => setRedirect("/articles")}>
                                            Add
                                        </Button>

                                        <Button variant="secondary" className="mr-3"
                                                onClick={() => setRedirect("/newTopic")}>
                                            Cancel
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

    export default NewArticle;