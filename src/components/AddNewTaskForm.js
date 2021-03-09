import React, { useState } from 'react'
import { Button, Modal, Form, Row, Col } from 'react-bootstrap'

import { postNewTask } from '../Model'

export default function AddNewTaskForm() {
    const usernameInputRef = React.createRef();
    const emailInputRef = React.createRef();
    const textInputRef = React.createRef();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const validateUsernameField = () => {
        const username = usernameInputRef.current.value;
        return username && username.length >= 1 ? true : false;
    }

    const validateTextField = () => {
        const text = textInputRef.current.value;
        return text && text.length >= 1 ? true : false;
    }

    const validateEmailField = () => {
        const email = emailInputRef.current.value;
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const checkAndSendData = () => {
        if (validateUsernameField() && 
            validateTextField() && 
            validateEmailField()) {
                postNewTask(usernameInputRef.current.value, 
                    emailInputRef.current.value, 
                    textInputRef.current.value)
                handleClose();
        }
        else {
            alert(`All fields should be filled correctly.`)
        }        
    }

    return (
        <>
            <Button onClick={handleShow}>Add new task</Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>New task: </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>Username</Form.Label>
                            <Form.Control ref={ usernameInputRef } type="text" required={true} />
                            <br />
                            <Form.Label>Email</Form.Label>
                            <Form.Control ref={ emailInputRef } type="email" placeholder="example@example.com" required={true} />
                            <br />
                            <Form.Label>Task description</Form.Label>
                            <Form.Control as="textarea" ref={ textInputRef } rows={3} required={true} />                            
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button style={{ marginRight: ".5rem" }} variant="secondary" onClick={handleClose}>
                        Close
                    </Button>

                    <Button variant="primary" onClick={checkAndSendData}>
                        Done
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
