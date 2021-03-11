import React, { useState } from 'react'
import { Row, Col, Card, Button, Modal, Form } from 'react-bootstrap'

import AppContext from '../AppContext'

export default function Task(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSolve = () => {

    }

    const statuses = { 
        0: "Not done (0)",
        1 : "Not done, edited (1)",
        10: "Done (10)",
        11: "Done and edited (11)"
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
                            <Card.Subtitle className="mb-2 text-muted">{statuses[props.status]}</Card.Subtitle>
                            <Card.Text>{props.text}</Card.Text>
                            <Row>
                                <Col>
                                    { context.state.isLoggedIn && <Card.Link href="#" onClick={handleShow}>Edit</Card.Link> }
                                </Col>

                                <Col className="text-right">
                                    { context.state.isLoggedIn && <Button onClick={handleSolve}>Solve</Button> }
                                </Col>
                            </Row>
                        </Card.Body>
                        </Card>

                        <Modal show={show} onHide={handleClose}>
                            <Modal.Body>
                                <Form>
                                    <Form.Group controlId="loginForm.username">
                                        <Form.Label>Task description</Form.Label>
                                        <Form.Control type="textarea" required={true} />
                                    </Form.Group>
                                </Form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="primary">
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

