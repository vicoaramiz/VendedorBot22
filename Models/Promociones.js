const mongoose =require('mongoose');
const Schema =mongoose.Schema;

const PromocionesSchema=new  Schema( {
    nombre:String,
    producto:String,
    descuento: String,
    
  },
  { timestamps: true }
);
module.exports=mongoose.model('Promociones',PromocionesSchema);