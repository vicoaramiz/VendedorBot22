const mongoose =require('mongoose');
const Schema =mongoose.Schema;

const ValoracionSchema=new  Schema( {
    usuario: String,
    facebookId: String,
    puntuacion: String,
  },
  { timestamps: true }
);
module.exports=mongoose.model('Valoracion',ValoracionSchema);