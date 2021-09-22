const express = require("express");

const {
	getAllUsers,
	getSpecificUserAndData,
	createUser,
} = require("../controllers/user-controllers");

const router = express.Router();

// get a list of users and their associated data
router.get("/users", getAllUsers);

// get data for a specific user
router.get("/users/:username", getSpecificUserAndData);

// Create new user at /api/users
router.post("/users", createUser);
module.exports = router;
