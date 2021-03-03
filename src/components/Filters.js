import React from 'react'
import { Row, Col, Button } from 'react-bootstrap'

function sortByName () {
    
}

export default function Filters() {
    return (
        <Row>
            <Col>
                <Button id="by-name" variant="link" onClick={sortByName}>Sort by name</Button>
            </Col>
            <Col>
                <Button id="by-email" variant="link">Sort by email</Button>
            </Col>
            <Col>
                <Button id="by-status" variant="link">Sort by status</Button>
            </Col>
        </Row>
    )
}
