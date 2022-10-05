const mongoose =require('mongoose');
const Schema =mongoose.Schema;

const ClienteSchema=new  Schema( {
    firstName: String,
    lastName: String,
    facebookId: {type:String, unique:true,},
    profilePic: String,
    email:String,
    phone:String,
  },
  { timestamps: true }
);
module.exports=mongoose.model('Clientes',ClienteSchema);
