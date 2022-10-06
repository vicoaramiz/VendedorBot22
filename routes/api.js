const express   = require('express');
const router=express.Router();
const Producto=require("../Models/Productos");

router.get("/cb",(req,res)=>{
    res.json({ok:true,msg:"esta funcionanado"});
});
router.post("/producto",(req,res)=>{
    let producto=Producto({
    marca: req.body.marca,
    modelo: req.body.modelo,
    precio: req.body.precio,
    purl: req.body.purl,
    });
    producto.save((err,productdb)=>{
        if(err)return res.json({ok:false,msg:"error al cargar el producto"});
        res.json({
            ok:true,
            msg:"producto cargado",
            producto:productdb
        });
    });
    
}); 



module.exports=router;


