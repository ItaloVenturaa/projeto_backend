class HomeController{
    async index(req, res){
        res.send("Projeto Back-End rodando!");
    }
}

module.exports = new HomeController();