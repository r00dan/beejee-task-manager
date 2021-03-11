import React, { useState } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'

import AppContext from '../AppContext'
import { login } from '../Model'

export default function Auth() {
    const usernameInputRef = React.createRef();
    const passwordInputRef = React.createRef();

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const getExpiryToken = key => {
        const itemStr = localStorage.getItem(key);
        if (!itemStr) {
            return null;
        }

        const item = JSON.parse(itemStr);
        const now = new Date();

        if (now.getTime() > item.expiry) {
            localStorage.removeItem(key);
            return null;
        }

        return item.value;
    }

    const setExpiryToken = (key, value) => {
        const now = new Date();
        const ttl = 24 * 60 * 60 * 1000;
        const item = {
            value: value,
            expiry: now.getTime() + ttl
        }
        localStorage.setItem(key, JSON.stringify(item));
    }

    let handleLogin = (context, username, password) => {
        if (!username.current.value || !password.current.value) {
            alert('All fields should be filled!');
            return;
        }

        login(username.current.value, password.current.value)
            .then(res => {
                if (res.data.status !== "ok") {
                    alert('Invalid login or password.')
                }
                else {
                    setExpiryToken('act', res.data.message.token);
                    context.setState({
                        isLoggedIn: true
                    })
                    handleClose();
                }
            })
    }

    let handleLogout = (context) => {
        context.setState({
            isLoggedIn: false
        })
    }

    return (
        <AppContext.Consumer>
            {context => {
                return (
                    <div>
                        {context.state.isLoggedIn ? <Button onClick={() => {
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
