const mongoose =require('mongoose');
const Schema =mongoose.Schema;

const PersonaSchema=new  Schema( {
    firstName: String,
    lastName: String,
    facebookId: {type:String, unique:true,},
    profilePic: String,
    email:String,
    link:String,
  },
  { timestamps: true }
);
module.exports=mongoose.model('Personas',PersonaSchema);

