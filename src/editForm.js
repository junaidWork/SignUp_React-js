import React from "react";
import { useState } from "react";
import { Container, Button, Row, Col, Form } from "react-bootstrap";
import axios from "axios";

export default function EditForm({
  editTask,
  seteditTask,
  fetchUser,
  handleClose,
}) {
  const id = editTask._id;
  const [Name, setName] = useState(editTask.name);
  const [Email, setEmail] = useState(editTask.email);
  const updatedRecord = { name: Name, email: Email };

  const updateUser = async (e) => {
    const user = { name: Name, email: Email };

    const res = await axios.put(`http://localhost:3000/users/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },

      user,
    });

    if (res.status === 400 || !res) {
      console.log("error");
    } else {
      console.log("Successfully updated");
      fetchUser();
    }
    e.preventDefault();
  };

  return (
    <>
      {" "}
      <Container className="mt-5">
        <Row>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Enter Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                name="name"
                id="name"
                value={Name}
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
                value={Email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Form.Group>

            <Button
              className="btn btn-success  btn-block"
              // type="submit"
              onClick={(e) => {
                updateUser(e);
                handleClose();
              }}
            >
              Update
            </Button>
          </Form>
        </Row>
      </Container>
    </>
  );
}
