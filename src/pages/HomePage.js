import React from "react";
import UserImages from "../containers/userImages.js";
import { Container, Row, Col, Button, Pagination, PaginationItem, PaginationLink } from "reactstrap";
import Image from "react-graceful-image";
import { Link } from "react-router-dom";

class HomePage extends React.Component {
  constructor() {
    super();
    this.state = {
      currentPage: 1,
      usersPerPage: 10,
      lastPage: '',
    }
    this.handlePageButton = this.handlePageButton.bind(this)
    this.handlePrevButton = this.handlePrevButton.bind(this)
    this.handleNextButton = this.handleNextButton.bind(this)
  }

  componentDidMount() {
    const { users } = this.props;
    const { usersPerPage } = this.state

    // Get the last page number based on length of users array
    this.setState({
      lastPage: Math.ceil(users.length / usersPerPage),
    })
  }

  handlePageButton(event) {
    // Updates current page when page changes
    this.setState({
      currentPage: Number(event.target.id),
    })
  }

  handlePrevButton() {
    const { currentPage } = this.state

    // Updates current page to previous page for all pages except page 1
    if (currentPage > 1) {
      this.setState({
        currentPage: currentPage - 1,
      })
    }
  }

  handleNextButton() {
    const { currentPage, lastPage } = this.state

    // Updates current page to next page for all pages except the last page
    if (currentPage < lastPage) {
      this.setState({
        currentPage: currentPage + 1,
      })
    }
  }

  getUsers() {
    const { users } = this.props;
    const { currentPage, usersPerPage } = this.state

    // Create array of users displayed based on current page
    const lastUserDisplayed = (currentPage * usersPerPage)
    const firstUserDisplayed = lastUserDisplayed - usersPerPage
    return (users.slice(firstUserDisplayed, lastUserDisplayed))
  }

  getPages() {
    const { currentPage, lastPage } = this.state

    // Helper function to create range array
    const range = (start, end) => {
      let i = start;
      const range = [];
      while (i <= end) {
        range.push(i);
        i++;
      }
      return range;
    }

    // Create array of pages displayed based on current page and hidden pages
    const pageNeighbours = 2 // Number of pages on the left and on the right of current page in pagination
    const totalPageNumbers = (pageNeighbours * 2) + 3 // 7 (First page, page neighbours x 2, current page, page neighbours x 2, last page)
    const totalPageSpace = totalPageNumbers + 2 // 9 (Add '...' for each side -before and after page neighbours- when there are hidden pages)

    // If total number of pages is more than number pagination space, handle hidden pages
    if (lastPage > totalPageSpace) { 
      const startingPage = Math.max(2, currentPage - pageNeighbours) // Get largest page number to start with after 1, i.e. page number > 1
      const endingPage = Math.min(lastPage - 1, currentPage + pageNeighbours) // Get smallest page number to end with before last page, i.e. page number < last page
      let pages = range(startingPage, endingPage)

      // Conditions for hidden pages on the left and right of current page
      const hiddenLeftPages = startingPage > 2
      const hiddenRightPages = (lastPage - endingPage) > 1

      // Number of hidden pages to offset when current page has 0 or more than 2 page neighbours (i.e. first or last 7 pages)
      const hiddenPagesOffset = totalPageNumbers - (pages.length + 1)

      if (!hiddenLeftPages && hiddenRightPages) {
        // Handling pagination: 1,2,3,4,5,...,lastPage
        const extraPages = range(endingPage + 1, endingPage + hiddenPagesOffset)
        pages = [...pages, ...extraPages, 'next']
        
      } else if (hiddenLeftPages && !hiddenRightPages) {
        // Handling pagination: 1,...,-5,-4,-3,-2,-1 (last 5 pages)
        const extraPages = range(startingPage - hiddenPagesOffset, startingPage - 1)
        pages = ['prev', ...extraPages, ...pages]
        
      } else if (hiddenLeftPages && hiddenRightPages) {
        // Handling pagination: 1,...,3,4,5,6,7,...,lastPage (applied to other pages with hidden pages on both sides)
        pages = ['prev', ...pages, 'next']
      } 
      // First and last pages are fixed in pagination and middle pages vary with hidden pages
      return [1, ...pages, lastPage]
    } else {
      // If total pages are less than 7, pagination has no hidden pages
      return range(1, lastPage)
    }
  }

  render() {
    const { currentPage } = this.state
    const usersDisplayed = this.getUsers()
    const pagesDisplayed = this.getPages()
    return (
      <>
        <Container fluid className="mt-3">
          {usersDisplayed.map(user =>
            <Row key={user.id} className="user-background pt-2">
              <Col sm={2} className="mt-2 mb-5">
                <Image src={user.profileImage} alt="" className="img-thumbnail rounded-circle mb-3" /><br />
                <Link to={`/users/${user.id}`}>
                  <Button block color="info">@{user.username}</Button>
                </Link>
              </Col>
              <Col>
                <UserImages userId={user.id} />
              </Col>
            </Row>
          )}
        </Container>

        <Pagination>
          {pagesDisplayed.map(page => {
            if (page === 'prev') return (
              <PaginationItem onClick={this.handlePrevButton}>
                <PaginationLink previous />
              </PaginationItem>
            )
            if (page === 'next') return (
              <PaginationItem onClick={this.handleNextButton}>
                <PaginationLink next />
              </PaginationItem>
            )
            return (
              <PaginationItem className={`${page === currentPage ? 'active' : ''}`} onClick={this.handlePageButton} key={page}>
                <PaginationLink id={page}>
                  {page}
                </PaginationLink>
              </PaginationItem>
            )
          })}
        </Pagination>
      </>
    )
  }
}

export default HomePage;