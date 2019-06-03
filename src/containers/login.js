import React from "react";
import Axios from "axios";
import { Form, Modal, ModalHeader, ModalBody, ModalFooter, Button, FormGroup, Label, Input } from "reactstrap";

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            loginMessage: '',
        }
    }

    handleInput = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()

        const { email, password } = this.state

        Axios.post('https://insta.nextacademy.com/api/v1/login',
            {
                email: email,
                password: password,
            })
            .then((response) => {
                // If successful, notify user that they are logged in
                this.setState({
                    loginMessage: 'Successfully logged in!',
                })

                // Store current user data in local storage
                localStorage.setItem('jwt', response.data['auth_token'])
                localStorage.setItem('userId', response.data.user['id']);
                localStorage.setItem('username', response.data.user['username']);
                localStorage.setItem('userPic', response.data.user['profile_picture']);
            })
            .catch((error) => {
                // If unsuccessful, console log error and notify user
                console.log("ERROR: ", error);

                this.setState({
                    loginMessage: 'Some error occured. Please try again.',
                })
            })
    }

    render() {
        const { loginModal, toggleLoginModal, toggleRegisterModal } = this.props
        const { email, password, loginMessage } = this.state
        return (
            <Modal isOpen={loginModal} toggle={toggleLoginModal}>
                <ModalHeader toggle={toggleLoginModal}>Log in to your NEXTagram account</ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Label>Email</Label>
                            <Input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Email"
                                value={email}
                                onChange={this.handleInput}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>Password</Label>
                            <Input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Password"
                                value={password}
                                onChange={this.handleInput}
                            />
                        </FormGroup>
                    </Form>
                    <p>{loginMessage}</p>
                </ModalBody>
                <ModalFooter>
                    <Button color="light" onClick={toggleRegisterModal}>Sign up here if you don't have an account</Button>
                    <Button color="primary" onClick={this.handleSubmit}>Log in</Button>
                </ModalFooter>
            </Modal>
        )
    }
}

export default Login