
var Usuario = require('../Models/ProspectoClientes')
module.exports = {
// https://docs.mongodb.com/v3.0/reference/operator/query/text/
usearch: function (req, res) {
  var q = req.query.q
  Usuario.find({ $text: { $search: q } }, function(err, usuario) {
    if(err) {
      return res.status(500).json({
        message: 'Error en la búsqueda'
      })
    }
    return res.json(usuario)
  })
},
}
