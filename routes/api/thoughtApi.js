// requirements
const router = require('express').Router();
// TODO require user module
// const thought = require("../../models/thought");

// get all 
router.get("/", async (req, res) => {
    console.log("hello world!");
});

// get by _id 
router.get("/:id", async (req, res) => {
    console.log("hello world!");
});

// add new thought connected to user
router.post("/new", async (req, res) => {
    console.log("hello world!");
});

// updates thought 
router.put("/update/:id", async (req, res) => {
    console.log("hello world!");
});

// deletes by _id
router.delete("/delete/:id", async (req, res) => {
    console.log("hello world!");
});

// add reactions
router.post("/:thoughtId/reactions", async(req, res) => {
    console.log("hello world!");
});

// removes reaction
router.delete("/:thoughtId/reactions", async(req, res) => {
    console.log("hello world!");
});

module.exports = router;
