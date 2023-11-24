class HomeController{

    async index(req, res){
        res.send("Projeto Back-End");
    }

}

module.exports = new HomeController();