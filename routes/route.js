var express = require("express")
var app = express();
var router = express.Router();
var HomeController = require("../controllers/HomeController");
var UserController = require("../controllers/UserController");
const LivroController = require('../controllers/LivroController');
var AdminAtuth = require("../middleware/AdminAuth");
const Install = require("../database/Install");
const AdminAuth = require("../middleware/AdminAuth");

router.get('/', HomeController.index);

//rotas para Usuários
router.post('/user', UserController.create);
router.get('/user', AdminAuth, UserController.list);
router.get('/user/:id', AdminAuth, UserController.findUser);
router.put('/user', AdminAuth, UserController.edit);
router.delete('/user/:id', AdminAuth, UserController.remove);
router.post('/recoverpassword', UserController.recoverPassword);
router.post('/changepassword', UserController.changePassword);
router.post('/login', UserController.login);

//adm cria adm
router.post('/criadmin', AdminAuth, UserController.createAdmin);

//rota para Instalação dos dados no BD
router.get('/install', Install.insercao);

//rotas para Livros
router.get('/livros/:id', AdminAuth, LivroController.show);
router.post('/livros', AdminAuth, LivroController.create);
router.put('/livros/:id', AdminAuth, LivroController.update);
router.delete('/livros/:id', AdminAuth, LivroController.destroy);
router.get('/livros-list', LivroController.list);


module.exports = router;