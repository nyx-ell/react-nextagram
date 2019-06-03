import React, { Component } from "react";
import Axios from "axios";
import { Row, Col } from "reactstrap";
import Image from "react-graceful-image";
import Loader from "../components/loader.js";

class UserImages extends Component {
  constructor() {
    super();
    this.state = {
      userImages: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    Axios.get(`https://insta.nextacademy.com/api/v1/images?userId=${this.props.userId}`)
      .then(result => {
        // If successful. load array of users data
        this.setState({
          userImages: result.data,
          isLoading: false,
        })
      })
      .catch(error => {
        // If unsuccessful, we notify users what went wrong
        console.log("ERROR: ", error);
      });
  }

  render() {
    const { userImages, isLoading } = this.state
    return (
      <Row>
        {
          (isLoading)
            ? <Loader />
            : userImages.map((image, index) =>
              <Col key={index} sm={4} className="mb-2">
                <Image src={image} alt="" className="user-images" placeholderColor="#D3E4E7"
                  retry={{ count: 10, delay: 2 }} />
              </Col>
            )
        }
      </Row>
    )
  }
}

export default UserImages;