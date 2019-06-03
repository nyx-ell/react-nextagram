import React from "react";
import Axios from "axios";
import { Form, Modal, ModalHeader, ModalBody, ModalFooter, Button, FormGroup, Label, Input } from "reactstrap";
import * as EmailValidator from "email-validator";

class Register extends React.Component {
    constructor() {
        super();
        this.state = {
            username: '',
            usernameMessage: '',
            email: '',
            isEmailValidated: false,
            emailMessage: '',
            password: '',
            confirmPassword: '',
            isPasswordMatched: false,
            passwordMessage: '',
            registerMessage: '',
            isRegistered: false,
        }
    }

    handleUsernameChange = (e) => {
        this.setState({
            username: e.target.value,
        })

        // Validate username character length
        if (e.target.value.length >= 5 && e.target.value.length <= 20) {
            this.setState({
                usernameMessage: 'Username is valid'
            })
        } else {
            this.setState({
                usernameMessage: 'Username must be between 5 and 20 characters'
            })
        }
    }

    handleEmailChange = (e) => {
        this.setState({
            email: e.target.value,
        })

        // Validate email format
        const validateEmail = EmailValidator.validate(this.state.email)
        if (validateEmail) {
            this.setState({
                isEmailValidated: true,
                emailMessage: 'Email validated'
            })
        } else {
            this.setState({
                isEmailValidated: false,
                emailMessage: 'Invalid email'
            })
        }
    }

    handlePasswordChange = (e) => {
        this.setState({
            password: e.target.value,
        })

        // Validate password length and match with confirm password input
        if (e.target.value.length >= 8 && e.target.value.length <= 50) {
            if (e.target.value.length === this.state.confirmPassword.length) {
                this.setState({
                    isPasswordMatched: true,
                    passwordMessage: 'Password is valid'
                })
            } else {
                this.setState({
                    isPasswordMatched: false,
                    passwordMessage: 'Passwords do not match'
                })
            }
        } else {
            this.setState({
                passwordMessage: 'Password must be between 8 and 50 characters'
            })
        }
    }

    handleConfirmChange = (e) => {
        this.setState({
            confirmPassword: e.target.value,
        })

        // Validate confirm password match with password input
        if (e.target.value === this.state.password && e.target.value.length === this.state.password.length) {
            this.setState({
                isPasswordMatched: true,
                passwordMessage: 'Password confirmed'
            })
        } else {
            this.setState({
                isPasswordMatched: false,
                passwordMessage: 'Passwords do not match'
            })
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const { username, email, password } = this.state

        Axios.post('https://insta.nextacademy.com/api/v1/users/new',
            {
                username: username,
                email: email,
                password: password,
            })
            .then((response) => {
                // If successful, notify user that they are registered
                this.setState({
                    registerMessage: 'You have successfully registered! Please proceed to login.',
                    isRegistered: true,
                })
            })
            .catch(error => {
                // If unsuccessful, console log error and notify user
                console.log("ERROR: ", error);
                console.log(error.response.data.message)

                this.setState({
                    registerMessage: 'Some error occured. Please try again.',
                    isRegistered: false,
                })
            })
    }

    render() {
        const { registerModal, toggleLoginModal, toggleRegisterModal } = this.props
        const { username, usernameMessage, email, isEmailValidated, emailMessage, password, confirmPassword, isPasswordMatched, passwordMessage, registerMessage, isRegistered } = this.state
        return (
            <Modal isOpen={registerModal} toggle={toggleRegisterModal}>
                <ModalHeader toggle={toggleRegisterModal}>Sign up for your NEXTagram account</ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Label>Username</Label>
                            <Input
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={this.handleUsernameChange}
                            />
                            <p>{usernameMessage}</p>
                        </FormGroup>
                        <FormGroup>
                            <Label>Email</Label>
                            <Input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={this.handleEmailChange}
                            />
                            <p>{emailMessage}</p>
                        </FormGroup>
                        <FormGroup>
                            <Label>Password</Label>
                            <Input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={this.handlePasswordChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>Confirm password</Label>
                            <Input
                                type="password"
                                placeholder="Enter password again"
                                value={confirmPassword}
                                onChange={this.handleConfirmChange}
                            />
                            <p>{passwordMessage}</p>
                        </FormGroup>
                    </Form>
                    <p>{registerMessage}</p>
                </ModalBody>
                <ModalFooter>
                    {
                        (isRegistered)
                            ? <Button color="primary" onClick={toggleLoginModal}>Log in to your new account</Button>
                            : <Button color="light" onClick={toggleLoginModal}>Log in here if you already have an account</Button>
                    }
                    {
                        (isEmailValidated && isPasswordMatched && username !== "" && email !== "" && password !== "" && confirmPassword !== "" && isRegistered === false)
                            ? <Button color="primary" onClick={this.handleSubmit}>Sign up</Button>
                            : <Button color="light" onClick={this.handleSubmit} disabled>Sign up</Button>
                    }

                </ModalFooter>
            </Modal>

        )
    }
}

export default Register