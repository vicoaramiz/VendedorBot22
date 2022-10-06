const mongoose =require('mongoose');
const Schema =mongoose.Schema;

const HistorialVisistasSchema=new  Schema( {   
    facebookId: String,   
    mensage:String, 
  },
  { timestamps: true }
);
module.exports=mongoose.model('HistorialVisitas',HistorialVisistasSchema);
