import React from "react";
import Axios from "axios";
import { Redirect } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import Image from "react-graceful-image";
import Loader from "../components/loader.js";
import Placeholder from "../images/placeholder.png";

class MyProfilePage extends React.Component {
    constructor() {
        super();
        this.state = {
            userImages: [],
            isLoading: true,
            isLoggedIn: true,
        };
    }

    componentDidMount() {
        const jwt = localStorage.getItem('jwt')

        if (jwt) {
            // If user is authorized, get user data
            Axios.get(`https://insta.nextacademy.com/api/v1/images/me`,
                {
                    'headers': {
                        Authorization: `Bearer ${jwt}`
                    }
                })
                .then(result => {
                    // If successful, load array of user images
                    this.setState({
                        userImages: result.data,
                        isLoading: false,
                    })
                })
                .catch(error => {
                    // If unsuccessful, console log error
                    console.log("ERROR: ", error);
                })
        } else {
            // If user not authorized, set isLoggedIn to false to handle redirect
            this.setState({
                isLoggedIn: false,
                isLoading: false,
            })
        }
    }

    handleRedirect() {
        // If user not authorized, handle redirect and notify user to log in
        if (!this.state.isLoggedIn) {
            window.alert('Please log in to access your account.')
            return <Redirect to="/" />
        }
    }

    render() {
        const username = localStorage.getItem('username')
        const userPic = localStorage.getItem('userPic')
        const { isLoading, userImages } = this.state
        return (
            <Container fluid className="mt-3">
                <Row className="mb-5">
                    <Col sm={2}>
                        <Image src={userPic ? userPic : Placeholder} className="img-thumbnail rounded-circle" alt="" />
                    </Col>
                    <Col>
                        <h3 className="m-3">@{username} </h3>
                    </Col>
                </Row>
                <Row>
                    {
                        (isLoading)
                            ? <Loader />
                            : userImages.map((image, index) =>
                                <Col key={index} sm={4} className="mb-2">
                                    <Image src={image} alt="" className="user-images" />
                                </Col>
                            )
                    }
                </Row>
                {this.handleRedirect()}
            </Container>
        )
    }
}

export default MyProfilePage;