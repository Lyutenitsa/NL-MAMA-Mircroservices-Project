import React, {useEffect, useState} from "react";

// Libraries
import {Container, Row, Col, Form, Button, Card} from "react-bootstrap";
import {useForm} from "react-hook-form";
import {Redirect, useParams} from "react-router-dom";
import {toast} from 'react-toastify';

// Hooks
import useLoggedIn from '../../hooks/useLoggedIn';
import useToastOptions from '../../hooks/useToastOptions';

// Services
import topicService from "../../services/topicService";

const Topic = () => {
    const {id} = useParams();

    const [redirect, setRedirect] = useState();
    const [data, setData] = useState([{}]);

    const isLoggedIn = useLoggedIn();
    const {register, handleSubmit, setValue} = useForm();

    // Toast
    const options = useToastOptions();
    const notifyError = (message) => toast.error(message, options);
    const notifySuccess = (message) => toast.success(message, options);

    useEffect(() => {
        const findOne = () => {
            topicService
                .findOne({id: id})
                .then((response) => {
                    let new_topic = response.data;
                    setValue("name", new_topic.name);
                    setValue("description", new_topic.description);
                    setValue("category", new_topic.category);
                    setValue("author_user_id", new_topic.author_user_id);
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        if (id) {
            findOne();
        }
    }, [isLoggedIn, id, setValue]);

    const onSubmit = (data) => {
        topicService
            .save({
                name: data.name,
                description: data.description,
                category: data.category,
                author_user_id: data.author_user_id
            })
            .then((response) => {
                setData(response.data);
                console.log(response.data.id)
                notifySuccess("Data is opgeslagen");
                setRedirect("/articles");
            })
            .catch(() => {
                notifyError("Foutieve data");
            });
    };

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
                            <Card.Title>New Topic</Card.Title>

                            <Card.Text as="div">
                                <Form onSubmit={handleSubmit(onSubmit)}>

                                    <Form.Group controlId="formOrderNumber">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            {...register("name")}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formSaleNumber">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control
                                            type="text"
                                            {...register("description")}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formSupplierName">
                                        <Form.Label>Category</Form.Label>
                                        <Form.Control
                                            type="text"
                                            {...register("category")}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formDeliveryDate">
                                        <Form.Label>Author</Form.Label><br/>
                                        <Form.Control
                                            type="text"
                                            {...register("author_user_id")}
                                        />
                                    </Form.Group>

                                    <Button variant="primary" type="submit" className="mr-3" >
                                        Add
                                    </Button>

                                    <Button variant="secondary" className="mr-3"
                                            onClick={() => setRedirect("/homescreen")}>
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

export default Topic;
