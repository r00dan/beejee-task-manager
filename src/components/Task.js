import React, { useState } from 'react'
import { Row, Col, Card, Button, Modal, Form } from 'react-bootstrap'

import { editTask } from '../Model'
import { getExpiryToken } from '../ExpiryToken'
import AppContext from '../AppContext'

export default function Task(props) {
    const descriptionInputRef = React.createRef();

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const changeStatusIfRequired = status => {
        if (status === 0) {
            return 1;
        }

        else if (status === 10) {
            return 11;
        }

        else {
            return status;
        }
    }

    const solveTaskIfRequired = status => {
        if (status === 0) {
            return 10;
        }

        else if (status === 1) {
            return 11;
        }

        else {
            return status;
        }
    }

    const handleUpdate = context => {
        if (!descriptionInputRef.current.value) {
            context.setState({
                toast: {
                    visible: true,
                    type: 'err',
                    text: "Task description field should be filled."
                }
            })
            return;
        }
        else if (!context.state.isLoggedIn) {
            context.setState({
                toast: {
                    visible: true,
                    type: 'err',
                    text: "You must be authorized to edit tasks!"
                }
            })
            return;
        }

        editTask(props.id, getExpiryToken(), changeStatusIfRequired(props.status), descriptionInputRef.current.value)
            .then(res => {
                context.setState({
                    toast: {
                        text: "Task has been successfully edited!",
                        type: 'default',
                        visible: true
                    }
                })
            })
        
        handleClose();
    }

    const handleSolve = context => {
        editTask(props.id, getExpiryToken(), solveTaskIfRequired(props.status), null)
            .then(res => {
                context.setState({
                    toast: {
                        text: "Task has been successfully solved!",
                        type: 'default',
                        visible: true
                    }
                })
            })
    }

    const statuses = { 
        0: "Not done",
        1: "Not done, edited",
        10: "Done",
        11: "Done and edited"
    }

    return (
        <AppContext.Consumer>
        {context => {
            return (
                <Row>
                    <Col>
                        <Card className="task" data-task-id={props.id}>
                        <Card.Body>
                            <Card.Title>{props.name} | {props.email}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">Status: {props.status + " - " + statuses[props.status]}</Card.Subtitle>
                            <Card.Text>{props.text}</Card.Text>
                            <Row>
                                <Col>
                                    { context.state.isLoggedIn && <Button size="sm" variant="outline-primary" onClick={handleShow}>Edit</Button> }
                                </Col>

                                <Col className="text-right">
                                    { context.state.isLoggedIn && 
                                        (props.status === 0 || props.status === 1) && 
                                        <Button size="sm" variant="outline-success" onClick={() => {
                                        handleSolve(context);
                                    }}>Solve</Button> }
                                </Col>
                            </Row>
                        </Card.Body>
                        </Card>

                        <Modal show={show} onHide={handleClose}>
                            <Modal.Body>
                                <Form>
                                    <Form.Group controlId="editForm.description">
                                        <Form.Label>{props.text}</Form.Label>
                                        <Form.Control ref={ descriptionInputRef } type="text" required={true} />
                                    </Form.Group>
                                </Form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="primary" onClick={() => {
                                    handleUpdate(context);
                                }}>
                                    Update task
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </Col>
                </Row>
            )
        }}
        </AppContext.Consumer>
    )
}

