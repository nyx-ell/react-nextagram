import React from "react";
import Axios from "axios";
import { Container, Row, Col } from "reactstrap";
import Image from "react-graceful-image";
import Loader from "../components/loader.js";
import Placeholder from "../images/placeholder.png";

class UserProfilePage extends React.Component {
    constructor() {
        super();
        this.state = {
            userId: null,
            username: null,
            userProfilePic: null,
            userImages: [],
            isLoading: true,
        };
    }

    componentDidMount() {
        const { users } = this.props
        const userId = parseInt(this.props.match.params.id)

        Axios.get(`https://insta.nextacademy.com/api/v1/images?userId=${userId}`)
            .then(result => {
                // If get request successful and user id matches, set user's profile data
                for (let i = 0; i < users.length; i++) {
                    if (users[i].id === userId) {
                        this.setState({
                            userId: userId,
                            username: users[i].username,
                            userProfilePic: users[i].profileImage,
                            userImages: result.data,
                            isLoading: false,
                        })
                    }
                }
            })
            .catch(error => {
                // If unsuccessful, console log error
                console.log("ERROR: ", error);
            });
    }

    render() {
        const { username, userProfilePic, userImages, isLoading } = this.state

        return (
            <Container fluid className="mt-3">
                <Row className="mb-5">
                    <Col sm={2}>
                        <Image src={userProfilePic ? userProfilePic : Placeholder} className="img-thumbnail rounded-circle" alt="" />
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
            </Container>
        )
    }
}

export default UserProfilePage;