import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

// import Pagination from "react-js-pagination"

import { getBlogListFromDBOrCount, deleteBlogFromDB } from './../../../database/dal/firebase/TeacherBlog'
// Color Constant
import {COLOR} from './../../../constant/Constant'

import './list.scss'

import HeaderHome from '../../../components/layout/header/HeaderHome'

class BlogList extends Component {

    state = {
        blogs: [],
        currentPage: 1,
        itemsPerPage: 3,
        totalItemCount: 1,
        activePage: 15
    }

    UNSAFE_componentWillMount = () => {
        this.setState({
          userDetails: JSON.parse(localStorage.getItem("userProfile"))
        });
    };

    componentDidMount = async () => {
        await this.getBlogList();
    }

    componentDidUpdate = (prevProps, prevState) => {
        const isDifferentPage = this.state.currentPage !== prevState.currentPage
        if (isDifferentPage) this.getBlogList()
    }

    componentWillUnmount = () => {
        this.state = null;
    }

    handleClick = (blog, type) => {
        (type === 'view') ? this.viewBlog(blog) : this.deleteBlog(blog)
    }

    viewBlog = (blog) => {

    }

    deleteBlog = (blog) => {
        deleteBlogFromDB(blog.id);
    }

    handlePageChange = (pageNumber) => {
        this.setState({ activePage: pageNumber });
    }
    
    getBlogList = () => {
        const { currentPage, itemsPerPage } = this.state;
        const startAt = currentPage * itemsPerPage - itemsPerPage;

        getBlogListFromDBOrCount(startAt,itemsPerPage,true).onSnapshot(querySnapshot => {
            let blogs = [];
            querySnapshot.forEach(doc => {
              blogs.push(Object.assign({ id: doc.id }, doc.data()));
            });
            this.setState({ blogs });
        });

        getBlogListFromDBOrCount('','',true).onSnapshot(querySnapshot => {
            let totalItemCount = 0;
            querySnapshot.forEach(() => {
                totalItemCount++;
            });
            this.setState({ totalItemCount });
        });        
    }

    render = () => {
        const { blogs, userDetails/*  activePage, itemsPerPage, totalItemCount */ } = this.state;
        return (
            <div className="container-fluid">
                <HeaderHome headeTitle="Blog List" />
                <Row className="content-container main-wrapper">
                    <Col sm={12}>
                        <Card>
                            <Card.Header>All Blogs List</Card.Header>
                            <Card.Body>
                                {blogs && blogs.map((blog,index) => {
                                    return (
                                        <Col sm={12} key={index}>
                                            <Card border={COLOR[Math.floor(Math.random() * COLOR.length)]}>
                                                <Card.Body>
                                                    <Card.Title>{blog.blogTitle}</Card.Title>
                                                    <Card.Text>{blog.blogDescription}</Card.Text>
                                                    {(userDetails && userDetails.userId === blog.teacherId) && (
                                                        <>
                                                        <Button variant="outline-info" onClick={() => this.handleClick(blog,'view')}><i className="fa fa-eye" /></Button>
                                                        <Button variant="outline-danger" onClick={() => this.handleClick(blog,'delete')}><i className="fa fa-trash" /></Button>
                                                        </>
                                                    )}
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    )
                                })}
                                {blogs.length === 0 && <h6>No Blogs</h6>}
                            </Card.Body>
                            <Card.Footer>
                            {/* <Pagination
                                className="pagination"
                                activePage={activePage}
                                itemsCountPerPage={itemsPerPage}
                                totalItemsCount={totalItemCount}
                                pageRangeDisplayed={itemsPerPage}
                                onChange={this.handlePageChange}
                            /> */}
                            </Card.Footer>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default BlogList



