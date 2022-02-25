import React from "react";
import { Button, Card, Modal, Row, Col, Container } from "react-bootstrap";
import { confirmAlert } from "react-confirm-alert";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import EditForm from "./editForm";
import SearchUser from "./searchUser";

export default function Dashboard() {
  const [user, setUser] = useState([]);
  const [show, setShow] = useState(false);
  const [editTask, seteditTask] = useState("");
  // for dialogue box
  const handleShow = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };
  useEffect(() => {
    handleClose();
  }, []);

  const fetchUser = async () => {
    const response = await axios.get("http://localhost:3000/users", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = response.data;
    if (response.status === 400 || !response) {
      console.log("invalid Registration");
    } else {
      console.log("Stored Data==>", res);
      setUser(res);
    }
  };

  const deleteUser = async (id) => {
    const response = await axios.delete(`http://localhost:3000/users/${id}`);

    if (response.status === 400 || !response) {
      console.log("invalid");
    } else {
      console.log("User Deleted");
      fetchUser();
    }
  };

  const editTaskf = (item) => {
    seteditTask(item);
  };
  console.log(editTask, "item");
  return (
    <>
      <Link to="/signupForm">
        <h1> Sign Up</h1>
      </Link>
      <Container>
        <SearchUser />
      </Container>

      <Container style={{ display: "flex", flexWrap: "wrap" }}>
        {" "}
        {user.map((item, index) => {
          return (
            <Card
              key={index}
              style={{ width: "18rem" }}
              className=" m-3 mb-2 bg-Info"
            >
              <Card.Header>{item.name}</Card.Header>
              <Card.Body>
                <Card.Title> {item.email} </Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </Card.Text>
              </Card.Body>
              <div className="mt-3">
                {" "}
                <Button
                  variant="danger"
                  style={{ marginRight: "20px" }}
                  onClick={() => {
                    deleteUser(item._id);
                  }}
                >
                  Delete
                </Button>
                <Button
                  data-toggle="modal"
                  variant="info"
                  onClick={() => {
                    handleShow();
                    editTaskf(item);
                  }}
                >
                  Edit
                </Button>
              </div>
            </Card>
          );
        })}
      </Container>
      <Button className=" m-3" onClick={fetchUser}>
        Fetch User
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditForm
            handleClose={handleClose}
            editTask={editTask}
            seteditTask={seteditTask}
            fetchUser={fetchUser}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
