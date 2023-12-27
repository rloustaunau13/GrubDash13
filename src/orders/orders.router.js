const router = require("express").Router();
const methodNotAllowed = require("../errors/methodNotAllowed");
// TODO: Implement the /orders routes needed to make the tests pass

// TODO: Implement the /dishes routes needed to make the tests pass
const controller = require("./orders.controller");






router.route("/").post(controller.create).get(controller.list).all(methodNotAllowed);

router.route("/:orderId").get(controller.read).put(controller.update).delete(controller.delete).all(methodNotAllowed);



module.exports = router;
