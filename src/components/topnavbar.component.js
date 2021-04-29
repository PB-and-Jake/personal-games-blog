import {Navbar, Nav, NavDropdown} from 'react-bootstrap';
import React, {Component} from 'react';
import {Link} from 'react-router-dom';


export default class TopNavbar extends Component{

    render(){
        return(
            /*<nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/" className="navbar-brand">Review Blog</Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/" className="nav-link">Reviews</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/create" className="nav-link">Create Review</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/user" className="nav-link">Create User</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/platform" className="nav-link">Create Platform</Link>
                        </li>
                        <li className="nav-item dropdown">
                       
                        </li>
                    </ul>
                </div>
            </nav>*/
            <Navbar expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="#home">Review Blog</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/">Reviews</Nav.Link>
                        <Nav.Link href="/platforms">Platforms</Nav.Link>
                        <NavDropdown title="Admin" id="collapsible-nav-dropdown">
                            <NavDropdown.Item href="/create">Write Review</NavDropdown.Item>
                            <NavDropdown.Item href="/createPlatform">Create Platform</NavDropdown.Item>
                            <NavDropdown.Item href="/user">Create User</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }

}