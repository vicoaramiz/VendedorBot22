const mongoose =require('mongoose');
const Schema =mongoose.Schema;

const HistorialUsuariosSchema=new  Schema( {
    usuario: String,
    facebookId: String,
    mensaje: String,
  },
  { timestamps: true }
);
module.exports=mongoose.model('HistoriaUsuarios',HistorialUsuariosSchema);


