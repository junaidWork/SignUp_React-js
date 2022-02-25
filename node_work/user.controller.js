const User = require("./user.model.js");

//Create new User
exports.create = (req, res) => {
  // Request validation
  if (!req.body) {
    return res.status(400).send({
      message: "User content can not be empty",
    });
  }

  //   console.log(req);
  // Create a User
  const user = new User({
    name: req.body.user.name || "No user name",
    email: req.body.user.email,
    age: req.body.user.age,
    cell: req.body.user.cell,
  });

  // Save User in the database
  user
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Something wrong while creating the user.",
      });
    });
};

// Retrieve all users from the database.
exports.findAll = (req, res) => {
  User.find()
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Something wrong while retrieving users.",
      });
    });
};

// Find a single user with a userId
exports.findOne = (req, res) => {
  if (req.params.userId != null) {
    User.findById(req.params.userId)
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: "User not found with id " + req.params.userId,
          });
        }
        res.send(user);
      })
      .catch((err) => {
        if (err.kind === "ObjectId") {
          return res.status(404).send({
            message: "User not found with id " + req.params.userId,
          });
        }
        return res.status(500).send({
          message:
            "Something wrong retrieving user with id " + req.params.userId,
        });
      });
  }
};

exports.findByEmail = (req, res) => {
  if (req.params.email != null) {
    User.find({ email: req.params.email })
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: "User not found with email " + req.params.email,
          });
        }
        console.log("resssss", res.statusCode);
        res.send(res.statusCode);
      })
      .catch((err) => {
        if (err.kind === "ObjectId") {
          return res.status(404).send({
            message: "User not found with email " + req.params.email,
          });
        }
        return res.status(500).send({
          message:
            "Something wrong retrieving user with email " + req.params.email,
        });
      });
  }
};

// Update a user
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    return res.status(400).send({
      message: "User content can not be empty",
    });
  }

  // Find and update user with the request body
  User.findByIdAndUpdate(
    req.params.userId,
    {
      name: req.body.user.name || "No User name",
      email: req.body.user.email,
      age: req.body.user.age,
      cell: req.body.user.cell,
    },
    { new: true }
  )
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "User not found with id " + req.params.userId,
        });
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "User not found with id " + req.params.userId,
        });
      }
      return res.status(500).send({
        message: "Something wrong updating note with id " + req.params.userId,
      });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
  User.findByIdAndRemove(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "User not found with id " + req.params.userId,
        });
      }
      res.send({ message: "User deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "User not found with id " + req.params.userId,
        });
      }
      return res.status(500).send({
        message: "Could not delete user with id " + req.params.userId,
      });
    });
};
