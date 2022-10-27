const mongosse=require('mongoose')
const Persona= require('../Models/Personas')
const Tipo= require('../Models/Tipo')
const findAllpersons=(req,res) =>{
    Persona.find((err,personas)=>{
        err&&res.send(500).send(err.message)
        res.status(200).json(personas)

    })
}
const findById=(req,res)=>{
    Persona.findById(req.params.id,(err,persona)=>{
        err&&res.send(500).send(err.message)
        res.status(200).json(persona)
    })
}

const addPersona=(req,res)=>{
    let persona=new Persona({
        firstName,
        lastName,
        facebookId,
        profilePic,
        email,
        link,
        tipo,
    })
    persona.save((err,persona)=>{
        err&&res.send(500).send(err.message)
        res.status(200).json(persona)
    })
}
 const prospecto=(req,res)=>{     
    Persona.find({}, function (err, personas) {
        Tipo.populate(personas, { path: "tipo" }, function (err, personas) {
          res.status(200).send(personas);
        
        //return res.json(persona)
    })
})
 }

module.exports={findAllpersons,findById,addPersona,prospecto}