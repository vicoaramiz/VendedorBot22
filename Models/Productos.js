const mongoose =require('mongoose');
const Schema =mongoose.Schema;

const ProductoSchema=new  Schema( {
    marca: String,
    modelo: String,
    precio: String,
    purl: String,
  },
  { timestamps: true }
);
module.exports=mongoose.model('Productos',ProductoSchema);
