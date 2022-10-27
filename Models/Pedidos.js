const mongoose =require('mongoose');
const Schema =mongoose.Schema;

const PedidoSchema=new  Schema( {
    facebookid: String,
    monto:Number,
    estado: String, 
  },
  { timestamps: true }
);

module.exports=mongoose.model('Pedidos',PedidoSchema);
