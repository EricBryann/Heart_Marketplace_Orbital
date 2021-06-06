const usersControllers = require("../controllers/users-controllers");
const Router = require("express");

const router = Router();

router.get("/users", usersControllers.getUsers);

module.exports = router;
