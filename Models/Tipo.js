var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TipoSchema = new Schema({
	nombre: String,
    tipoid: {type:String, unique:true,},   
    
});

module.exports = mongoose.model("Tipo", TipoSchema);