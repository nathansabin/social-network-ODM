// requirements
const router = require('express').Router();
const User = require("../../models/user");
const Thought = require("../../models/thought");

// get all 
router.get("/", async (req, res) => {
    try {
        User.find({})
        .then((data) => {
            res.status(200).json(data);
        });
    } catch (err) {
        res.status(404).json(err);
    }
});

// get by _id 
router.get("/:id", async (req, res) => {
    try {
        User.find({_id: req.params.id})
        .then((data) => {
            res.status(200).json(data)
    });
    } catch (err) {
        res.status(404).json(err);
    }
});

// add new user
router.post("/new", async (req, res) => {
    try {
        User.insertMany([req.body])
        .then((newUser) => {
            res.status(200).json(newUser);
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// updates username and or email 
router.put("/update/:id", async (req, res) => {
    try {
        var email;
        var name;

        const userData = await User.find({ _id: req.params.id });
        if (!req.body.name && !req.body.email) {
            throw new Error("need valid name and or email");
        }
        if (req.body.email) {
            email = req.body.email;
        } else {
            email = userData.email;
        }
        if (req.body.name) {
            name = req.body.name;
        } else {
            name = userData.name;
        }
        
        User.updateOne({_id: req.params.id}, {"name": name, "email": email})
        .then((newUser) => {
            res.json(newUser);
        }); 
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// deletes by _id
router.delete("/delete/:id", async (req, res) => {
    try {
        User.deleteOne({_id: req.params.id})
        .then((removed) => {
            res.status(200).json(removed);
        });
    } catch (err) {
        res.status(404).json(err);
    }
});

// adds friend
router.post("/:userId/friends/:friendId", async (req, res) => {
    try {
        const friendId = req.params.friendId;
        const userId = req.params.userId;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found"});
        }
        user.friends.push(friendId);
        await user.save();

        res.status(200).json(user);

    } catch (err) {
        res.status(500).json({error: "Error parsing data"});
    }
});

// removes friend
router.delete("/:userId/friends/:friendId", async (req, res) => {
    try {
        const friendId = req.params.friendId;
        const userId = req.params.userId;

        User.deleteOne({_id: userId}, {friend: friendId}).then((data) => {
            res.status(200).json(data);
        });

    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
