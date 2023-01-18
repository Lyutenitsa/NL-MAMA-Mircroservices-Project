// React
import React from 'react';

// Libraries
import {Container, Row, Col, Jumbotron} from 'react-bootstrap';

const Error = () => {

    return (
        <Container className='mt-5'>
            <Row>
                <Col>
                    <Jumbotron>
                        <h1>Helaas...</h1>

                        <p>De pagina die u zoekt, is niet beschikbaar.</p>
                    </Jumbotron>
                </Col>
            </Row>
        </Container>
    );
};

export default Error;