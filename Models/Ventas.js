const mongoose =require('mongoose');
const Schema =mongoose.Schema;

const VentasSchema=new  Schema( {
    cliente: String,
    producto: String,
    DetalleVentas: [{
        type: Schema.Types.ObjectId,
        ref: 'Detalleventa'
    }],
  },
  { timestamps: true }
);
const DetalleVentasSchema=new  Schema( {    
    producto: String,
    precio: String,
    cantidad: String,
  },
  { timestamps: true }
);
module.exports=mongoose.model('DetalleVentas',DetalleVentasSchema);
