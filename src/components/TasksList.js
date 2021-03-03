import React from 'react'
import { Row, Col } from 'react-bootstrap'

import AppContext from '../AppContext'

import Task from './Task'

function renderTasks (tasks) {
    return tasks.map((task, index) => {
        return (<Task key={ index } 
                    id={task.id} 
                    name={task.username} 
                    email={task.email} 
                    status={task.status} 
                    text={task.text} />
    )});    
}

export default function TasksList() {
    return (
        <AppContext.Consumer>
            {context => {
                return (
                    <Row>
                        <Col className="taskslist">
                            {renderTasks(context.state.currentPageTasks)}
                        </Col>
                    </Row>
                )
            }}
        </AppContext.Consumer>
    )
}
