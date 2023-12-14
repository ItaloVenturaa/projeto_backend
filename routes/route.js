const express = require('express');
const router = express.Router();
const HomeController = require('../controllers/HomeController');
const UserController = require('../controllers/UserController');
const LivroController = require('../controllers/LivroController');
const AdminAuth = require('../middleware/AdminAuth');
const Install = require('../database/Install');

// rota principal
router.get('/', HomeController.index);

// rotas para usuários
router.post('/user', UserController.create); // criação de usuário
router.get('/user', AdminAuth, UserController.list); // lista de usuários 
router.get('/user/:id', AdminAuth, UserController.findUser); // busca de usuário por id 
router.put('/user', AdminAuth, UserController.edit); // edição de usuário 
router.delete('/user/:id', AdminAuth, UserController.remove); // remoção de usuário por id 
router.post('/recoverpassword', UserController.recoverPassword); // recuperação de senha
router.post('/changepassword', UserController.changePassword); // alteração de senha
router.post('/login', UserController.login); // login de usuário

// admin cria admin
router.post('/criadmin', AdminAuth, UserController.createAdmin); //criação de administrador 

// rota para instalação dos dados no bd
router.get('/install', Install.insercao);

// rotas para livros
router.get('/livros/:id', AdminAuth, LivroController.show); //exibição de livro por id 
router.post('/livros', AdminAuth, LivroController.create); //criação de livro 
router.put('/livros/:id', AdminAuth, LivroController.update); //atualização de livro por id 
router.delete('/livros/:id', AdminAuth, LivroController.destroy); //remoção de livro por id 
router.get('/livros-list', LivroController.list); // lista de livros

module.exports = router;
