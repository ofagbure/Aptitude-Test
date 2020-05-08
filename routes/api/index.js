const router = require("express").Router();
const allOf = require("./all");
const one = require("./one");

router.use("/all", allOf);
router.use("/one", one);


module.exports = router;