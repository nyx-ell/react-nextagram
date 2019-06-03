import React from "react";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import Logo from "../images/nextagram-logo.png"
import Login from "./login.js";
import Register from "./register.js";

class myNavbar extends React.Component {
    constructor() {
        super();
        this.state = {
            isOpen: false,
            loginModal: false,
            registerModal: false,
        };
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    toggleLoginModal = () => {
        this.setState({
            loginModal: !this.state.loginModal,
            registerModal: false,
        });
    }

    toggleRegisterModal = () => {
        this.setState({
            registerModal: !this.state.registerModal,
            loginModal: false,
        });
    }

    handleLogout = () => {
        localStorage.clear()
    }

    render() {
        const { isOpen, loginModal, registerModal } = this.state
        return (
            <Navbar className="navbar-expand-md navbar-nav navbar-light" id="navbar">
                <NavbarBrand href="/">
                    <img src={Logo} alt="" id="logo" />
                    NEXTagram
                    </NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav navbar className="ml-auto">
                        {
                            localStorage.getItem('jwt')
                                ?
                                <>
                                    <NavItem>
                                        <NavLink href="/">Home</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink href="/profile">My Profile</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink href="/" onClick={this.handleLogout}>Logout</NavLink>
                                    </NavItem>
                                </>
                                :
                                <>
                                    <NavItem>
                                        <NavLink onClick={this.toggleRegisterModal}>Register</NavLink>
                                        <Register registerModal={registerModal} toggleLoginModal={this.toggleLoginModal} toggleRegisterModal={this.toggleRegisterModal} />
                                    </NavItem>
                                    <NavItem>
                                        <NavLink onClick={this.toggleLoginModal}>Log In</NavLink>
                                        <Login loginModal={loginModal} toggleLoginModal={this.toggleLoginModal} toggleRegisterModal={this.toggleRegisterModal} />
                                    </NavItem>
                                </>
                        }
                    </Nav>
                </Collapse>
            </Navbar>
        )
    }
}

export default myNavbar