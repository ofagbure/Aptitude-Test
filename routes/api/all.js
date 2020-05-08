const router = require("express").Router();
const userController = require("../../controllers/userController");

// "/all/-----"
router.route("/users")
    .get(userController.findAllUsers);

router.route("/profiles")
    .get(userController.findAllProfiles);

router.route("/interviews")
    .get(userController.findAllInterviews);

module.exports = router;