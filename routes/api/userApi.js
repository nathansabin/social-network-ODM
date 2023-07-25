// requirements
const router = require('express').Router();
const { User, Thought } = require("../../models/index");

// TODO user routes 
// get all 
router.get("/", async (req, res) => {
    console.log("hello world!");
});

// get by _id 
router.get("/:id", async (req, res) => {
    console.log("hello world!");
});

// add new user
router.post("/new", async (req, res) => {
    console.log("hello world!");
});

// updates username and or email 
router.put("/update/:id", async (req, res) => {
    console.log("hello world!");
});

// deletes by _id
router.delete("/delete/:id", async (req, res) => {
    console.log("hello world!");
});

// adds friend
router.post("/:userId/friends/:friendId", async (req, res) => {
    console.log("hello world!");
});

// removes friend
router.delete("/:userId/friends/:friendId", async (req, res) => {
    console.log("hello world!");
});

module.exports = router;
