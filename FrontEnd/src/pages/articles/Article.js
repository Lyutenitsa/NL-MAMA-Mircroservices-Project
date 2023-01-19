import React, {useEffect, useState} from "react";

// Libraries
import {Container, Row, Col, Button, Card} from "react-bootstrap";
import {useParams, Redirect} from "react-router-dom";

// DataGrid
import "@inovua/reactdatagrid-community/index.css";
import ReactDataGrid from "@inovua/reactdatagrid-community";

// Hooks
import useLoggedIn from "../../hooks/useLoggedIn";

// Services
import articleService from "../../services/articleService";
import {useForm} from "react-hook-form";


const Article = () => {
    const {id} = useParams();

    const [redirect, setRedirect] = useState();

    // const isLoggedIn = useLoggedIn();
    const isLoggedIn = useLoggedIn();


    const [data, setData] = useState([{}]);

    useEffect(() => {
        const findOne = () => {
            articleService
                .findOne({id: id})
                .then((response) => {
                    let order = response.data;
                    setData(order)
                })
                .catch((error) => {
                    console.log(error);
                });
        }

        if (id) {
            findOne();
        }
    }, [isLoggedIn, id]);


    if (redirect) {
        return <Redirect push to={redirect}/>;
    }

    const orderItemsColumns = [
        {key: 'item', name: 'item', header: 'Bestelling Artikelen', minWidth: 80, defaultFlex: 1},
        {key: 'quantity', name: 'quantity', header: 'Artikelen Hoeveelheid', minWidth: 80, defaultFlex: 1},
    ]
    const gridStyle = {minHeight: 200};

    return (
        <Container className="mt-5">
            <Row>
                <Col></Col>
                <Col xs={8}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Article</Card.Title>
                            <Card.Text as="div" key={data.id}>
                                <Card.Text as="div">
                                    <Card.Text as="div">Title: {data.title}</Card.Text>
                                    <Card.Text as="div">Description: {data.description}</Card.Text>
                                    <Card.Text as="div">Content: {data.content}</Card.Text>
                                    <Card.Text as="div">Author: {data.author_user_id}</Card.Text>
                                    <Card.Text as="div">Topic: {data.topic_id}</Card.Text>
                                </Card.Text>
                            </Card.Text>
                        </Card.Body>
                    </Card>

                    <Button variant="primary" className="mr-3"
                            onClick={() => setRedirect("/articles")}>
                        Terug
                    </Button>
                </Col>

                <Col></Col>
            </Row>
        </Container>
    );
};

export default Article;
