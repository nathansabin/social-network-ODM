const connection = require("../config/connection");
const userData = require("./userData.json");
const thoughtData = require("./thoughtData.json");

const User = require("../models/user");
const Thought = require("../models/thought");

//sets up connection and then adds data
connection.on('error', (err) => err);
connection.once("open", async () => {
    console.log("connected");

    // will remove data before adding anything to it
    await User.deleteMany({});
    await Thought.deleteMany({});

    // adds all of the json object data into object
    User.insertMany(userData);
    Thought.insertMany(thoughtData);
    
    // to validate that seed worked
    //User.find({}).then((result) => console.log(result));
    //Thought.find({}).then((result) => console.log(result));

    // will run if successful
    console.log("Succesfully seeded");
});
