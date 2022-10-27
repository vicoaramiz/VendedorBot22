const mongosse=require('mongoose')
const Pedido= require('../Models/Pedidos')
const findAllpedidos=(req,res) =>{
    Pedido.find((err,pedidos)=>{
        err&&res.send(500).send(err.message)
        res.status(200).json(pedidos)

    })
}
const findById=(req,res)=>{
    Pedido.findById(req.params.id,(err,pedido)=>{
        err&&res.send(500).send(err.message)
        res.status(200).json(pedido)
    })
}

const addPedido=(req,res)=>{
    let pedido=new Pedido({
        facebookid:req.body.facebookid,
        monto:req.body.monto,
        estado:req.body.estado,
        
    })
    pedido.save((err,pedido)=>{
        err&&res.send(500).send(err.message)
        res.status(200).json(pedido)
    })
}

module.exports={findAllpedidos,findById,addPedido}
