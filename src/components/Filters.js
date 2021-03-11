import React, { useState } from 'react'
import { Row, Col, Button } from 'react-bootstrap'

import AppContext from '../AppContext'
import { getSortedTasks } from '../Model'

export default function Filters() {
    const [direction, setDirection] = useState(false);
    const handleDirection = () => setDirection(!direction);

    const sortBy = (type, context) => {
        handleDirection();
        getSortedTasks(context.state.currentPage, type, direction ? 'asc' : 'desc')
            .then(res => {
                context.setState({
                    currentPageTasks: res.data.message.tasks
                })
            })
    }

    return (
        <AppContext.Consumer>
            {context => {
                return (
                    <Row>
                        <Col className="text-center">
                            <Button style={{ width: "100%" }} id="by-name" variant="outline-info" onClick={() => {
                                sortBy('username', context)
                            }}>Sort by name</Button>
                        </Col>
                        <Col className="text-center">
                            <Button style={{ width: "100%" }} id="by-email" variant="outline-info" onClick={() => {
                                sortBy('email', context)
                            }}>Sort by email</Button>
                        </Col>
                        <Col className="text-center">
                            <Button style={{ width: "100%" }} id="by-status" variant="outline-info" onClick={() => {
                                sortBy('status', context)
                            }}>Sort by status</Button>
                        </Col>
                    </Row>
                )
            }}
        </AppContext.Consumer>
    )
}
