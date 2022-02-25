import React from "react";
import { useState } from "react";
import { Button, Form, FormControl } from "react-bootstrap";
import axios from "axios";

export default function SearchUser() {
  const [Email, setSearch] = useState("");

  const searchByEmail = async (e) => {
    console.log(Email, "email");
    const response = await axios.get(
      `http://localhost:3000/users/email/${Email}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 400 || !response) {
      console.log("Not Founded");
    } else {
      console.log("Stored Data==>", response);
      //   setUser(res);
    }
    e.preventDefault();
  };

  return (
    <div>
      <Form className="d-flex">
        <FormControl
          type="search"
          placeholder="Search"
          value={Email}
          className="me-2"
          aria-label="Search"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <Button
          variant="outline-success"
          onClick={(e) => {
            searchByEmail(e);
          }}
        >
          Search
        </Button>
      </Form>
    </div>
  );
}
