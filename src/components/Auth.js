import React, { useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'

import AppContext from '../AppContext'
import { login } from '../Model'
import { setExpiryToken, destroyToken, isTokenExpiredOrNotCreated } from '../ExpiryToken'

export default function Auth() {
    const usernameInputRef = React.createRef();
    const passwordInputRef = React.createRef();

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let handleLogin = (context, username, password) => {
        if (!username.current.value || !password.current.value) {
            context.setState({
                toast: {
                    visible: true,
                    type: 'err',
                    text: "All fields should be filled!."
                }
            });
            return;
        }

        login(username.current.value, password.current.value)
            .then(res => {
                if (res.data.status !== "ok") {
                    context.setState({
                        toast: {
                            visible: true,
                            type: 'err',
                            text: "Invalid login or password."
                        }
                    });
                }
                else {
                    setExpiryToken(res.data.message.token);
                    context.setState({
                        isLoggedIn: true
                    })
                    handleClose();
                }
            })
    }

    let handleLogout = (context) => {
        destroyToken();
        context.setState({
            isLoggedIn: isTokenExpiredOrNotCreated()
        })
    }

    return (
        <AppContext.Consumer>
            {context => {
                return (
                    <div>
                        {context.state.isLoggedIn ? <Button variant="outline-primary" style={{ marginTop: ".25rem" }} onClick={() => {
                            handleLogout(context)
                        }}>Log out</Button> : <Button onClick={handleShow}>Log in</Button>}
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Body>
                                <Form>
                                    <Form.Group controlId="loginForm.username">
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control ref={ usernameInputRef } type="text" required={true} />
                                    </Form.Group>
                                    <Form.Group controlId="loginForm.password">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control ref={ passwordInputRef } type="password" required={true} />                          
                                    </Form.Group>
                                </Form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="primary" onClick={() => {
                                    handleLogin(context, usernameInputRef, passwordInputRef)
                                }}>
                                    Log In
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                )
            }}
        </AppContext.Consumer>
    )
}
