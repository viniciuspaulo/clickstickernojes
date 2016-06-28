var mongoose = require('mongoose');

var usuariosSchema = mongoose.Schema({
	nome : String,
	senha : String
});


var usuarios = mongoose.model('usuarios',usuariosSchema);
module.exports = usuarios;
