import React, { Component } from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import ReactPaginate  from 'react-paginate'

import { getTasksByUsername } from './Model'

import AppContext from './AppContext'
import Filters from './components/Filters'
import Header from './components/Header'
import TasksList from './components/TasksList'

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      isLoggedIn: false,
      totalTasksCount: null,
      totalPagesCount: null,
      currentPage: 1,
      currentPageTasks: []
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

  render() {
    return (
      <AppContext.Provider value={{
        state: this.state,
        setState: state => (this.setState(state))
      }}>
        <Container>
          <Header />
          <Filters />
          <TasksList />
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

