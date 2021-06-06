const productControllers = require("../controllers/products-controllers");
const Router = require("express");

const router = Router();

router.get("/", productControllers.getProducts);

module.exports = router;
