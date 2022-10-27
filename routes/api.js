const express   = require('express');
const Persona = require('../Controllers/PersonaController');
const router=express.Router();
const Product=require("../Models/Products");
const Promociones = require('../Models/Promociones');
const persona=require('../Models/Personas');
const pedido=require('../Models/Pedidos');
const Pedido = require('../Controllers/PedidoController');

router.get("/personas", Persona.findAllpersons);
router.get("/pedidos", Pedido.findAllpedidos);
router.post("/addpedido",Pedido.addPedido);
module.exports=router;