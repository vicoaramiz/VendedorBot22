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

//clients: String,
  //  monto:Number,
    //estado: String,
 //   DetallePedidos: [{
 //       type: Schema.Types.ObjectId,
  //      ref: 'DetallePedido'
 //   }],
 //const DetallePedidoSchema=new  Schema( {    
 //   producto: String,
 //   precio: String,
 //   cantidad: String,
 // },
 // { timestamps: true }
//);