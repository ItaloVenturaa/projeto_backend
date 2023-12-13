const express = require('express');
const router = express.Router();
const HomeController = require('../controllers/HomeController');
const UserController = require('../controllers/UserController');
const LivroController = require('../controllers/LivroController');
const AdminAuth = require('../middleware/AdminAuth');
const Install = require('../database/Install');

router.get('/', HomeController.index);

// Rotas para Usuários
router.post('/user', UserController.create);
router.get('/user', AdminAuth, UserController.list);
router.get('/user/:id', AdminAuth, UserController.findUser);
router.put('/user', AdminAuth, UserController.edit);
router.delete('/user/:id', AdminAuth, UserController.remove);
router.post('/recoverpassword', UserController.recoverPassword);
router.post('/changepassword', UserController.changePassword);
router.post('/login', UserController.login);

// Adm cria adm
router.post('/criadmin', AdminAuth, UserController.createAdmin);

// Rota para instalação dos dados no BD
router.get('/install', Install.insercao);

// Rotas para Livros
router.get('/livros/:id', AdminAuth, LivroController.show);
router.post('/livros', AdminAuth, LivroController.create);
router.put('/livros/:id', AdminAuth, LivroController.update);
router.delete('/livros/:id', AdminAuth, LivroController.destroy);
router.get('/livros-list', LivroController.list);

module.exports = router;
