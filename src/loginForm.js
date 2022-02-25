import React from "react";
import { Container, Button, Row, Col, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function LoginForm() {
  const handleSignInSubmit = (e) => {
    console.log("junaid");
    e.preventDefault();
  };
  return (
    <>
      {" "}
      <Container className="mt-5">
        <Row>
          <Col
            lg={5}
            md={6}
            sm={12}
            className="p-5 m-auto shadow-sm rounded-lg bg-info"
            style={{ borderRadius: "15px" }}
          >
            <Form onSubmit={handleSignInSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>

              <Button variant="success " type="submit">
                {/* <Link to="/" style={{ color: "white", fontWeight: "bold" }}>
                  Login
                </Link> */}
                Login
              </Button>
              <p className="forgot-password text-right mt-4">
                Register New User{" "}
                <a href="" style={{ color: "white" }}>
                  sign up?
                </a>
                {/* <Link
                  to="/signupForm"
                  style={{ color: "white", fontWeight: "bold" }}
                >
                  sign up?
                </Link> */}
              </p>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}
