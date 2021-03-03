import React from 'react'
import { Row, Col, Button } from 'react-bootstrap'

export default function Header() {
    return (
        <Row>
            <Col>
                <h2>task-manager</h2>
            </Col>

            <Col className="text-right">
                <Button>Log in</Button>
            </Col>
        </Row>
    )
}
