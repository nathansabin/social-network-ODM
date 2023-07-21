// requirements for api
const express = require("express");
const db = require("./config/connection");
//const routes = require("./routes/index");

const cwd = process.cwd();

// sets up port and app
const PORT = process.env.PORT || 3001;
const app = express();

// middleware 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//app.use(routes);

// starts api
db.once("open", () => {
    app.listen(PORT, () => {
        console.log(`now listening at port ${PORT}`);
    });
});
