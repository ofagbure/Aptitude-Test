const router = require("express").Router();
const userController = require("../../controllers/userController");

// "/all/-----"
router.route("/users")
    .get(userController.findAllUsers);

router.route("/profiles")
    .get(userController.findAllProfiles);

router.route("/interviews")
    .get(userController.findAllInterviews);

router.route("/interviews/email/:email")
    .get(userController.findAllRecruiterInterviews);

router.route("/applicants")
    .get(userController.findAllApplicants);

router.route("/recruiters")
    .get(userController.findAllRecruiters);

module.exports = router;