const router = require("express").Router();
//const thoughtApi = require("./thoughtApi");
const userApi = require("./userApi");

router.use("/user", userApi);
//router.use("/thought", thoughtApi);

module.exports = router;
