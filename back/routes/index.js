const router = require("express").Router();
const Admin = require("./adminRoutes");

router.use("/admin", Admin);

module.exports = router;
