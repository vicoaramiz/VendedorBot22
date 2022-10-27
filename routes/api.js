const express   = require('express');
const mongoose = require('mongoose');
const Persona = require('../Controllers/PersonaController');
const router=express.Router();
const Product=require("../Models/Products");
const Promociones = require('../Models/Promociones');
const persona=require('../Models/Personas');
const pedido=require('../Models/Pedidos');
const Pedido = require('../Controllers/PedidoController');
const Personas = require('../Models/Personas');
const tipo=require('../Models/Tipo');
//const Tipo=require('../Controllers/TipoControler');

router.get("/personas", Persona.findAllpersons);
router.get("/pedidos", Pedido.findAllpedidos);
router.post("/addpedido",Pedido.addPedido);
//router.post("/addtype",Tipo.addType);
router.get("/prospectos", Persona.prospecto);
//router.get("/tipo", Tipo.findAlltypes);
//router.get("/bps",Persona.prospecto )


module.exports=router;