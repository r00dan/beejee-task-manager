import React, { Component } from 'react'
import { Row, Col, Container, Toast } from 'react-bootstrap'
import ReactPaginate  from 'react-paginate'

import { getTasksByUsername } from './Model'
import { isTokenExpiredOrNotCreated } from './ExpiryToken'

import AppContext from './AppContext'
import Filters from './components/Filters'
import Header from './components/Header'
import TasksList from './components/TasksList'
import AddNewTaskForm from './components/AddNewTaskForm'


export default class App extends Component {
  constructor() {
    super();

    this.state = {
      isLoggedIn: !isTokenExpiredOrNotCreated(),
      totalTasksCount: null,
      totalPagesCount: null,
      currentPage: 1,
      currentPageTasks: [],
      toast: {
        visible: false,
        text: '',
        type: 'default'
      }
    }
  }

  updateDataFromServer (pageNumber) {
    getTasksByUsername(pageNumber || this.state.currentPage)
      .then(res => {
        this.setState({
          totalTasksCount: res.data.message.total_task_count,
          totalPagesCount: Math.ceil(res.data.message.total_task_count / 3),
          currentPageTasks: res.data.message.tasks,
          currentPage: pageNumber || this.state.currentPage
        })
      })
  }

  componentDidMount () {
    this.updateDataFromServer();
  }

  handlePageClick (data, context) {
    let newPageNumber = data.selected + 1;
    context.updateDataFromServer(newPageNumber);
  }

  onToastClose () {
    this.setState({
      toast: {
        visible: false,
        text: ''
      }
    })
  }

  render() {
    return (
      <AppContext.Provider value={{
        state: this.state,
        setState: state => (this.setState(state))
      }}>
        <div
          aria-live="polite"
          aria-atomic="true"
          style={{
            position: 'relative'
          }}
        >
          <Toast 
            onClose={() => {
              this.onToastClose();
            }}
            show={this.state.toast.visible}
            delay={3000} 
            autohide
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: 9999
            }}
          >
              <Toast.Header>
                  <strong className="mr-auto">Notification <large>{this.state.toast.type === 'default' ? "✈" : "⛔"}</large></strong>
                  <small>Now</small>
              </Toast.Header>
              <Toast.Body>
                {this.state.toast.text}
              </Toast.Body>
          </Toast>
        </div>
        <Container>
          <Header />
          <Filters />
          <TasksList />
          <AddNewTaskForm />
          <Row>
            <Col lg={{ span: 6, offset: 3 }} md={ 12 }>
              <ReactPaginate 
                previousLabel={'<'}
                nextLabel={'>'}
                pageCount={this.state.totalPagesCount}
                containerClassName={'pagination'}
                activeClassName={'active'}
                onPageChange={data => {
                  this.handlePageClick(data, this)
                }}
              />
            </Col>
          </Row>
        </Container>
      </AppContext.Provider>
    )
  }
}

