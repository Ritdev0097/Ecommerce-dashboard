import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { NavLink } from 'react-router-dom';

let Header = () => {    

    let user = JSON.parse(localStorage.getItem('loginUser'));        

    return (
        <>
            <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary p-3">
                <Container>
                    <Navbar.Brand href="#home" className='fs-3 fw-bold'>Ecom-Dashboard</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <NavLink to="/" className={"nav-link"}>List of Product</NavLink>                            
                            <NavDropdown title="Add and Update list" id="collapsible-nav-dropdown">
                                <NavDropdown.Item><NavLink to={"/addproduct"} className={"nav-link"}> Add Product </NavLink></NavDropdown.Item>
                                <NavDropdown.Item><NavLink to={"/updateproduct"} className={"nav-link"}> Update Product </NavLink></NavDropdown.Item>                                
                            </NavDropdown>

                            {                                
                                    localStorage.getItem('loginUser') ? 
                                <>
                                    <NavDropdown title={user.username} id="collapsible-nav-dropdown">
                                    <NavDropdown.Item><NavLink to={"/logout"} className={"nav-link"}> logout </NavLink></NavDropdown.Item></NavDropdown> 
                                </> : 
                                <>
                                    <NavDropdown title={"no user"} id="collapsible-nav-dropdown">
                                    <NavDropdown.Item><NavLink to={"/login"} className={"nav-link"}> login </NavLink></NavDropdown.Item></NavDropdown>
                                </>                                
                            }
                                                                                    
                        </Nav>
                        
                        <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Enter Product Name"
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button variant="outline-success">Search</Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default Header;