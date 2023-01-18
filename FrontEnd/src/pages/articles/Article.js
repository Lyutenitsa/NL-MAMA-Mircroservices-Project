// React
import React, {useCallback, useEffect, useState} from 'react';

// Libraries
import {Row, Col, Button} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';

// DataGrid
import ReactDataGrid from '@inovua/reactdatagrid-community';
import '@inovua/reactdatagrid-community/index.css';

// Hooks
import useLoggedIn from '../../hooks/useLoggedIn';

// Services
import articleService from '../../services/articleService';


const Article = () => {
    const [data, setData] = useState([]);
    const [redirect, setRedirect] = useState();

    const onSubmit = () => {
        articleService
            .findAll()
            .then((response) => {
                setData(response.data);
            })
            .catch(() => {
            });
    };

    if (redirect) {
        return <Redirect push to={redirect}/>;
    }


    return (
        <>
            <Row>
                <Col>
                    <span>
                        Testing
                    </span>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button onClick={onSubmit}> Hey</Button>
                </Col>
                {data.length > 0 && <p>{data}</p>}
            </Row>
        </>
    );
}

export default Article;