import React, { Component } from 'react'
import { Row, Col, Card } from 'react-bootstrap'

export default class Task extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Row>
                <Col>
                    <Card className="task" data-task-id={this.props.id}>
                    <Card.Body>
                        <Card.Title>{this.props.name} | {this.props.email}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{this.props.status}</Card.Subtitle>
                        <Card.Text>{this.props.text}</Card.Text>
                        <Card.Link href="#">Edit</Card.Link>
                    </Card.Body>
                    </Card>
                </Col>
            </Row>
        )
    }
}
