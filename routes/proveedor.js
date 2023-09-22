const { Router } = require('express') //Desestructuración. Extraer un atributo de un objeto.

const route = Router()

//Importar métodos del controlador
const { proveedorGet, proveedorPost, proveedorPut, proveedorDelete } = require('../controllers/proveedor')

route.get('/', proveedorGet)

route.post('/', proveedorPost)

route.put('/', proveedorPut)

route.delete('/', proveedorDelete)

module.exports = route