var Productos = require('../Models/Producto')
module.exports = {
search: function (req, res) {
  var q = req.query.q
  Productos.find({ $text: { $search: q } }, function(err, productos) {
    if(err) {
      return res.status(500).json({
        message: 'Error en la búsqueda'
      })
    }
    return res.json(productos)
  })
},
list: function(req, res) {
  Productos.find(function(err, productos){
    if(err) {
      return res.status(500).json({
        message: 'Error obteniendo los productos'
      })
    }
    return res.json(productos)
  })
},
show: function(req, res) {
  var id = req.params.id
  Productos.findOne({_id: id}, function(err, producto){
    if(err) {
      return res.status(500).json({
        message: 'Se ha producido un error al obtener los productos'
      })
    }
    if(!producto) {
      return res.status(404).json( {
        message: 'No tenemos esta cerveza'
      })
    }
    return res.json(producto)
  })
},
create: function(req, res) {
  var producto = new Productos (req.body)
  producto.save(function(err, producto){
    if(err) {
      return res.status(500).json( {
        message: 'Error al guardar el producto',
        error: err
      })
    }
    return res.status(201).json({
      message: 'saved',
      _id: producto._id
    })
  })
},
update: function(req, res) {
  var id = req.params.id
  Productos.findOne({_id: id}, function(err, producto){
    if(err) {
      return res.status(500).json({
        message: 'Se ha producido un error al guardar el producto',
        error: err
      })
    }
    if(!producto) {
      return res.status(404).json({
        message: 'No hemos encontrado el producto'
      })
    }
    producto.marca = req.body.marca
    producto.modelo =  req.body.modelo    
    producto.purl = req.body.purl
    producto.Precio = req.body.precio
    producto.save(function(err, producto){
      if(err) {
        return res.status(500).json({
          message: 'Error al guardar el producto'
        })
      }
      if(!producto) {
        return res.status(404).json({
          message: 'No hemos encontrado el producto'
        })
      }
      return res.json(producto)
    })
  })
},
remove: function(req, res) {
  var id = req.params.id
  Productos.findByIdAndRemove(id, function(err, producto){
    if(err) {
      return res.json(500, {
        message: 'No hemos encontrado el producto'
      })
    }
    return res.json(producto)
  })
}
}