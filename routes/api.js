const express   = require('express');
const ProspectoUsuarioController = require('../Controllers/ProspectoUsuarioController');
<<<<<<< HEAD
=======
const HistorialVisitas = require('..//Models/HistorialVisitas');
const HistoriaUsuarios = require('../Models/HistoriaUsuarios');
>>>>>>> 84fbadf (modificaciones varias)
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
<<<<<<< HEAD
    
=======
  HistoriaUsuarios.find();
    res.json(HistoriaUsuarios);
}); 
router.get("/ultimohistorial",(req,res)=>{
  
   console.log(HistorialVisitas);
 res.json(HistorialVisitas);
>>>>>>> 84fbadf (modificaciones varias)
    
}); 
router.get('prospectousuario/:id', function(req, res) {
    res.json({ message: ' ' + req.params.id })
  })
router.get('/usearch', function(req, res) {
  //  res.json({ok:true,msg:"esta funcionanado"});
    ProspectoUsuarioController.usearch(req, res)
  })
<<<<<<< HEAD

=======
  router.get("/historia", (req, res) => {
    HistorialVisitas
      .find()
      .then((data) => res.json(data))
      
      .catch((error) => res.json({ message: error }));
  });
>>>>>>> 84fbadf (modificaciones varias)
module.exports=router;


