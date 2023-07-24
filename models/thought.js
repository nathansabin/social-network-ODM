const { Schema, model } = require("mongoose");

function dateFormat(date) {
    const dateObject = new Date(date);

    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1;
    const day = dateObject.getDate();
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    const seconds = dateObject.getSeconds();

    return `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;
};

const reactionSchema = Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            // maybe it works???
            default: new mongoose.Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            max_length: 280
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }
);

const thoughtSchema = Schema(
    {
        thoughtText: {
            Type: String,
            required: true,
            max_length: 280,
            min_length: 1
        },
        createdAt: {
            Type: Date,
            default: Date.now
            // TODO Use a getter method to format the timestamp on query
        },
        username: {
            Types: String,
            require: true
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            virtual: true
        }
    }
    );

// adds a virtual function to check for the amount of reactions
thoughtSchema.virtual("reactionCount").get(function () {
    return this.reactions.length;
});

// added virtuals to format the dates
thoughtSchema.virtual("dataSet").get(dateFormat)
reactionSchema.virtual("dataSet").get(dateFormat)

// uses schema to create model
const Thought = model("Thought", thoughtSchema);

module.exports = Thought;