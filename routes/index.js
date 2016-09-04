var express = require('express');
var router = express.Router();
var Pessoa = require('../modelos/pessoa');


router.get('/', function(req, res, next) {	
	Pessoa.todos(function (pessoas){
		res.render('index', {
   		title: 'Express', 
   		pessoas: pessoas
   	   });
   	});
});


router.get('/alterar', function(req, res, next) {	
	Pessoa.buscar(req.query.cpf, function(pessoa){	

		if(pessoa == null){
   			console.log("pessoa não encontrado");   	
   			res.render('alterar', {'pessoa':{}});		
   		}
   		else{ 
   			res.render('alterar', {'pessoa':pessoa});			
      	}
   		
   	}); 
});

router.post('/alterar-pessoa', function(req, res, next) {

	var pessoa = new Pessoa();

	pessoa.nome =  req.body.nome;
	pessoa.sobrenome =  req.body.sobrenome;
	pessoa.cpf =  req.body.cpf;
	pessoa.endereco =  req.body.endereco;
	pessoa.telefone =  req.body.telefone;

	pessoa.salvar(function(){
		res.redirect("/"); 
	}, req.query.cpfAlterar)	
});


router.get('/excluir', function(req, res, next) {
    var pessoa = new Pessoa();
	pessoa.cpf =  req.query.cpf;
	pessoa.excluir(function(){
		res.redirect("/");
	   })
	});	


router.get('/pesquisar', function(req, res, next) {

	Pessoa.buscarPorNome(req.query.nome, function (pessoas){
		res.render('index', { 
			title: 'Express' ,
			pessoas: pessoas
		});
	});
		
});

router.post('/cadastrar-pessoa', function(req, res, next) {
    var pessoa = new Pessoa();

	pessoa.nome =  req.body.nome;
	pessoa.sobrenome =  req.body.sobrenome;
	pessoa.cpf =  req.body.cpf;
	pessoa.endereco =  req.body.endereco;
	pessoa.telefone =  req.body.telefone;

	pessoa.salvar(function(){
		res.redirect("/"); 
	});	

});



module.exports = router;

