import React, {useEffect, useState} from "react";

// Libraries
import {Container, Row, Col, Button, Table} from "react-bootstrap";
import {Redirect, useParams} from "react-router-dom";

// Hooks
import useLoggedIn from "../../hooks/useLoggedIn";

// DataGrid
import ReactDataGrid from "@inovua/reactdatagrid-community";
import "@inovua/reactdatagrid-community/index.css";
import useDataGridTranslations from "../../hooks/useDataGridTranslations";

// Services
import articleService from "../../services/articleService";


const Articles = () => {
    const [redirect, setRedirect] = useState();
    const [data, setData] = useState([]);

    const isLoggedIn = useLoggedIn();
    const i18n = useDataGridTranslations();

    useEffect(() => {
            function findAll() {
                articleService
                    .findAll()
                    .then((response) => {
                        let serverArticles = response.data;
                        setData(serverArticles);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }

            if (!isLoggedIn) {
                setRedirect("/error");
            }

            findAll();
        }

        ,
        [isLoggedIn]
    );

    const onRowClickHandler = (selected) => {
        setRedirect("/article/" + selected.data.id);
    };

    if (redirect) {
        return <Redirect push to={redirect}/>;
    }

    const columns = [
        {key: "title", name: "title", header: "Title", minWidth: 50, defaultFlex: 1},
        {key: "description", name:"description", header: "Description", minWidth: 50, defaultFlex: 1},
        {key: "content", name:"content", header: "Content", minWidth: 50, defaultFlex: 1},
        {key: "author_user_id", name: "author_user_id", header: "Author", minWidth: 50, defaultFlex: 1},
        {key: "topic_id", name: "topic_id", header: "Topic", minWidth: 50, defaultFlex: 1},

    ];

    const filterValue = [
        {title: "title", operator: "contains", type: "string", value: ""}
    ];

    const gridStyle = {minHeight: 500};

    return (

        <Container className="mt-5">
            <Row>
                <Col className="col-auto">
                    <h4>Articles </h4>
                </Col>
                <Col>
                    <Button variant="primary" className="float-right"
                            onClick={() => setRedirect("/newArticle")}>
                        Add new article
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col className="mt-2">
                    <ReactDataGrid
                        idProperty="id"
                        columns={columns}
                        dataSource={data}
                        style={gridStyle}
                        rowHeight={50}
                        defaultFilterValue={filterValue}
                        onRowClick={onRowClickHandler}
                        i18n={i18n}
                    />
                </Col>
            </Row>
        </Container>
    );
};

export default Articles;
