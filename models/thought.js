const { Schema, Types } = require("mongoose");

const reactionSchema = Schema(
    {

    }
);

const thoughtSchema = Schema(
    {
        thoughtText: {
            Types: String,
            require: true,
            max_length: 280,
            min_length: 1
        },
        createdAt: {
            Type: Date,
            default: Date.now
            // Use a getter method to format the timestamp on query
        },
        username: {
            Types: String,
            require: true
        },
        reactions: [reactionSchema]
    }
    );