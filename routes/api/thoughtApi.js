// requirements
const router = require('express').Router();
const User = require("../../models/user");
const Thought = require("../../models/thought");

// get all 
router.get("/", async (req, res) => {
    try {
        Thought.find({})
        .then((data) => res.status(200).json(data));
    } catch (err) {
        res.status(404).json(err);
    }
});

// get by _id 
router.get("/:id", async (req, res) => {
    try {
        Thought.findById({_id: req.params.id})
        .then((data) => res.status(200).json(data));
    } catch (err) {
        res.status(404).json(err);
    }
});

// add new thought connected to user
router.post("/new/:id", async (req, res) => {
    try {
        // saves req body in a more readable format
        const newData = req.body;
        
        // find user with req username
        const user = await User.findById({_id: req.params.id}); 
        // checks if user is in database than adds thought 
        if (!user) {
            res.status(404).json({error : "not found"});   
        } 
        const newThought = await Thought.create(newData);
        // update user thought's to have new thought id

        user.thoughts.push(newThought._id);
        await user.save();

        // // responds to user
        res.status(200).json(newThought);
    } catch (err) {
        res.status(500).json(err);
    }
});

// updates thought 
router.put("/update/:id", async (req, res) => {
    try {
        const thoughtId = req.params.id;
        const thoughtString = req.body.thoughtText;

        await Thought.updateOne({_id: thoughtId}, {thoughtText: thoughtString})
        .then((data) => {
            res.status(200).json(data);
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// deletes by _id
router.delete("/delete/:id", async (req, res) => {
    try {
        Thought.findOneAndDelete({ _id: req.params.id })
        .then((data) => {
            res.status(200).json(data);
        })
    } catch (err) {
        res.status(404).json(err);
    }
});

// add reactions
router.post("/:thoughtId/reactions", async(req, res) => {
    try {
        const thoughtId = req.params.thoughtId;

        const reaction = await Thought.findById({_id: thoughtId});
        if (!reaction) {
            res.status(404).json({ error: "Not found"});
        }

        await reaction.reactions.push(req.body);
        await reaction.save();
        res.status(200).json(reaction);
    } catch (err) {
        res.status(404).json(err);
    }
});

// removes reaction
router.delete("/:thoughtId/reactions", async(req, res) => {
    try {
        const thoughtId = req.params.thoughtId;
        const reactionId = req.body.reaction;

        await Thought.deleteOne({_id: thoughtId}, {reactions: reactionId}).then((data) => {
            res.status(200).json(data);
        });

    } catch (err) {
        res.status(404).json(err);
    }
});

module.exports = router;
