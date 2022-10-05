const mongoose =require('mongoose');
const Schema =mongoose.Schema;

const HistorialVisistasSchema=new  Schema( {
    usuario: String,
    facebookId: String,    
  },
  { timestamps: true }
);
module.exports=mongoose.model('HistorialVisitas',HistorialvisitasSchema);
