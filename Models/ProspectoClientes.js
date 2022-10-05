const mongoose =require('mongoose');
const Schema =mongoose.Schema;

const ProspectoClienteSchema=new  Schema( {
    firstName: String,
    lastName: String,
    facebookId: {type:String, unique:true,},
    profilePic: String,
  },
  { timestamps: true }
);
module.exports=mongoose.model('ProspectoClientes',ProspectoClienteSchema);
