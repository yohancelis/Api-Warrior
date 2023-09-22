const { Router } = require('express')

const route = Router()

const { clienteGet, clientePost, clientePut, clienteDelete } = require('../controllers/cliente')

route.get('/', clienteGet)

route.post('/', clientePost)

route.put('/', clientePut)

route.delete('/', clienteDelete)

module.exports = route