const mongosse=require('mongoose')
const Persona= require('../Models/Personas')
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
    })
    persona.save((err,persona)=>{
        err&&res.send(500).send(err.message)
        res.status(200).json(persona)
    })
}

module.exports={findAllpersons,findById,addPersona}