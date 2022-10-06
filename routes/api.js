const express   = require('express');
const ProspectoUsuarioController = require('../Controllers/ProspectoUsuarioController');
const router=express.Router();
const Product=require("../Models/Products");
const Promociones = require('../Models/Promociones');

router.get("/cb",(req,res)=>{
    res.json({ok:true,msg:"esta funcionanado"});
});
router.post("/producto",(req,res)=>{
    let product=Product({
    marca: req.body.marca,
    modelo: req.body.modelo,
    precio: req.body.precio,
    img: req.body.img,
    });
    product.save((err,productdb)=>{
        if(err)return res.json({ok:false,msg:"error al cargar el producto"});
        res.json({
            ok:true,
            msg:"producto cargado",
            product:productdb
        });
    });
    
}); 



router.get("/producto",(req,res)=>{
    
    
}); 
router.get('prospectousuario/:id', function(req, res) {
    res.json({ message: ' ' + req.params.id })
  })
router.get('/usearch', function(req, res) {
  //  res.json({ok:true,msg:"esta funcionanado"});
    ProspectoUsuarioController.usearch(req, res)
  })

module.exports=router;


