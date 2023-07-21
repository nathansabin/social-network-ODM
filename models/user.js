const { Schema, Types } = require("mongoose");

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            //TODO
            // unique
            // trim
        },
        email: {
            type: String,
            require: true,
            // TODO
            // unique
            // valid email
        },
        // TODO refrences 
        thoughts: [thoughts],
        friends: [friends]
    }
    
// TODO schema settings add a virtula called friend count that checks total friends
);

const User = model("User", userSchema);

module.exports = User;