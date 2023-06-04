import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

import Auth from '../utils/auth';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';
import defaultImage from '../assets/display2.gif';

const AppNavbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState(null);

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand as={Link} to="/">
            Welcome to your Personalized Note Taking App
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar" />
          <Navbar.Collapse id="navbar" className="justify-content-end">
            <Nav>
              {Auth.loggedIn() ? (
                <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>
              ) : (
                <Nav.Link onClick={() => setShowModal(true)}>Login / Sign Up</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Modal
        size="lg"
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby="signup-modal"
        centered
      >
        <Tab.Container defaultActiveKey="signup">
          <Modal.Header closeButton>
            <Modal.Title id="signup-modal">
              <Nav variant="pills">
                <Nav.Item>
                  <Nav.Link as={Link} to="#" eventKey="login">
                    Login
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link as={Link} to="#" eventKey="signup">
                    Sign Up
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey="login">
                <LoginForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey="signup">
                <SignupForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
      <div className='background'>
      <div className="upload-container">
        {image ? (
          <img src={URL.createObjectURL(image)} alt="Uploaded" className="uploaded-image" />
        ) : (
          <div className="upload-placeholder">
            <img src={defaultImage} alt="Default" className="default-image" />
            <span></span>
          </div>
        )}
        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
      </div>
      </div>
    </>
  );
};

export default AppNavbar;
