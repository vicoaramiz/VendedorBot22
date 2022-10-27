const mongoose =require('mongoose');
const Schema =mongoose.Schema;


const PersonaSchema=new  Schema( {
    firstName: String,
    lastName: String,
    facebookId: {type:String, unique:true,},
    profilePic: String,
    email:String,
    link:String,
    //tipo: { type: Schema.ObjectId, ref: "Tipo" }
    tipo: [{
            type: Schema.Types.ObjectId,
            ref: 'Tipo'
         }],
        },
        { timestamps: true }
      );
const TiposSchema=new  Schema( {   
         nombre: String,
         tipoid: {type:String, unique:true,},
        },
        { timestamps: true }
      );
module.exports=mongoose.model('Personas',PersonaSchema);

