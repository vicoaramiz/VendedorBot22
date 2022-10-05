var router = require('express').Router()
var ProductoController = require ('../Controllers/ProductoController')

router.get('/search', function(req, res) {
  ProductoController.search(req, res)
})
router.get('/', function(req, res) {
  ProductoController.list(req, res)
})
router.get('/:id', function(req, res) {
  ProductoController.show(req, res)
})
router.post('/', function(req, res) {
  ProductoController.create(req, res)
})
router.put('/:id', function(req, res) {
  ProductoController.update(req, res)
})
router.delete('/:id', function(req, res) {
  ProductoController.remove(req, res)
})
module.exports = router