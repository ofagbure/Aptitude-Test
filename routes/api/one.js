const router = require("express").Router();
const userController = require("../../controllers/userController");

// "/one/-----"
router.route("/user/id/:id")
    .get(userController.findAUserID);

router.route("/user/email/:email")
    .get(userController.findAUserEmail);

router.route("/profile/email/:email")
    .get(userController.findAProfileEmail);

router.route("/interview/applicant/email/:email")
    .get(userController.findAnInterviewApplicant);

router.route("/interview/recruiter/email/:email")
    .get(userController.findAnInterviewRecruiter);

module.exports = router;