var express = require("express")
var app = express();
var router = express.Router();
var HomeController = require("../controllers/HomeController");
var UserController = require("../controllers/UserController");
var AdminAtuth = require("../middleware/AdminAuth");

router.get('/', HomeController.index);
router.post('/user', UserController.create);
router.get("/user",AdminAtuth ,UserController.list);
route.get('/user/:id', AdminAtuth, UserController.findUser);
router.put('/user',AdminAtuth, UserController.edit);
router.delete("/user/:id",AdminAtuth, UserController.remove);
router.post("/recoverpassword", UserController.recoverPassword);
route.post("/changepassword", UserController.changePassword);
router.post("/login", UserController.login);

module.exports = router;