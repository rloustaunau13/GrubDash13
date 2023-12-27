const router = require("express").Router();
const methodNotAllowed = require("../errors/methodNotAllowed");
// TODO: Implement the /dishes routes needed to make the tests pass
const controller = require("./dishes.controller");




router.route("/:dishId").put(controller.update).get(controller.read).all(methodNotAllowed);


router.route("/").get(controller.list).post(controller.create).all(methodNotAllowed);







module.exports = router;