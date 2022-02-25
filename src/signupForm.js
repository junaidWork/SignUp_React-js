import React from "react";
import { Container, Button, Row, Col, Form } from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    setName("");
    setEmail("");
    setPassword("");
    postUser(e);
  };

  const postUser = async (e) => {
    e.preventDefault();
    const user = { name, email, password };

    const res = await axios.post("http://localhost:3000/users", {
      headers: {
        "Content-Type": "application/json",
      },

      user,
    });

    if (res.status === 404 || !res) {
      console.log("invalid Registration");
    } else {
      console.log("Successfully Registered");
    }
  };
  return (
    <>
      <Link to="/">
        <h1> Home</h1>
      </Link>
      <Container className="mt-5">
        <Row>
          <Col
            lg={5}
            md={6}
            sm={12}
            className="p-5 m-auto shadow-sm rounded-lg bg-info"
            style={{ borderRadius: "15px" }}
          >
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Enter Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  name="name"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="pass"
                  id="pass"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </Form.Group>

              <Button
                className="btn btn-success  btn-block"
                // type="submit"
                onClick={(e) => {
                  handleSignUpSubmit(e);
                }}
              >
                Register
                {/* <Link
                  to="/loginForm"
                  style={{ color: "white", fontWeight: "bold" }}
                >
                  Sign Up
                </Link> */}
              </Button>
              <p className="forgot-password text-right mt-4">
                Already registered{" "}
                <a href="" style={{ color: "white", fontWeight: "bold" }}>
                  sign in?
                </a>
                {/* <Link
                  to="/loginForm"
                  style={{ color: "white", fontWeight: "bold" }}
                >
                  sign in?
                </Link> */}
              </p>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}
