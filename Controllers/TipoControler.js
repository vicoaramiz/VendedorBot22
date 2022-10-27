const mongosse=require('mongoose')
const Tipo= require('../Models/Tipo')
const findAlltypes=(req,res) =>{
    Tipo.find((err,tipos)=>{
        err&&res.send(500).send(err.message)
        res.status(200).json(tipos)

    })
}
const findById=(req,res)=>{
    Persona.findById(req.params.id,(err,persona)=>{
        err&&res.send(500).send(err.message)
        res.status(200).json(persona)
    })
}
const addType=(req,res)=>{
    let tipo=new Tipo({
        nombre,
        tipoid,        
    })
    tipo.save((err,tipo)=>{
        err&&res.send(500).send(err.message)
        res.status(200).json(tipo)
    })
}
 

module.exports={findAlltypes,findById,addType}
