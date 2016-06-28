var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var formidable = require('formidable');
var fs = require('fs');
var routes = require('./routes/index');
var users = require('./routes/users');
var usuarios = require('./db.js');


//Banco de dados
var mongoose = require('mongoose');
mongoose.connect('mongodb://vinicius:vbpaulo@ds023452.mlab.com:23452/helpmesocket');
var db = mongoose.connection;
db.on('error',console.error);
db.once('open',function(){
	console.log("Conectado !!");
})

app.use(express.static(__dirname+'/public'));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('port',process.env.PORT || 3000);

app.use('/', routes);
app.use('/users', users);


app.post('/',function(req, res){
  res.redirect("/principal.html");
});

app.post('/principal.html',function(req, res){

	var form = formidable.IncomingForm();
	form.parse(req, function(err, fields, files){
		var image = files.image
		,image_upload_old = image.path
		,image_upload_path_new = "./public/img/"
		,image_upload_name = "paint.jpg"
		,image_upload_path_name = image_upload_path_new+image_upload_name;
		var msg = "Imagem"+image_upload_name+"salval em : "+image_upload_path_new;
		fs.mkdir(image_upload_path_new, function(err){
			if(err){
				console.log("erro");
			}
			fs.rename(image_upload_old, image_upload_path_name,function(err){
				var msg = "Imagem"+image_upload_name+"salval em : "+image_upload_path_new;
					console.log(msg);
					res.end(msg);
			})
		})
	});
 res.redirect("/principal.html");
});

app.post("/cadastro.html",function(req,res){
	var myUser = new usuarios({
		nome : req.body.user.nome,
		email : req.body.user.email,
		senha : req.body.user.senha
	});
	myUser.save(function(err, u){
		if(err){
			console.log("Erro ao salvar");
		}
		console.log("Salvo");
})
	res.redirect('/principal.html');
});

app.get('/cadastro',function(req,res){
	res.sendFile(__dirname+"/cadastro.html");
});
app.get('/',function(req, res){
  res.sendFile(__dirname+"/index.html");
});
app.get('/principal',function(req, res){
  res.sendFile(__dirname+"/principal.html");
});

io.on('connection',function(socket){
  socket.on('posicionar', function(x,y,cor,circulo,url,desenhar){
    io.emit('posicionar',(x-50),(y-50),cor,circulo,url,desenhar);
    console.log((x-50),(y-50),cor,circulo,url,desenhar);
  });
});

http.listen(3000,function(){
  console.log("Server : "+app.get('port'));
});