import React from 'react'
import { Row, Col } from 'react-bootstrap'


import Auth from './Auth'



export default function Header() {


    return (
        <Row style={{ marginBottom:".5rem" }}>
            <Col>
                <h2>task-manager</h2>
            </Col>

            <Col className="text-right">
                <Auth />
            </Col>

            
        </Row>
    )
}
