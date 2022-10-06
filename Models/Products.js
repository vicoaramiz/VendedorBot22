const mongoose =require('mongoose');
const Schema =mongoose.Schema;

const ProductSchema=new  Schema( {
    marca: String,
    modelo: String,
    precio: Number,
    img: String,
  },
  { timestamps: true }
);
module.exports=mongoose.model('Products',ProductSchema);
