const { Schema, model } = require('mongoose')
const ProveedorSchema = Schema({
    nombreProveedor: {
        type: String,
        unique: true,
        required: [true, 'El usuario es obligatorio!'],
        minlength: [5, 'Debe tener mínimo 5 caracteres!'],
        maxlength: [20, 'Debe tener máximo 20 caracteres!']
    },
    nombreContacto: {
        type: String,
        required: [true, 'El nombre es obligatorio!'],
        minlength: [5, 'Debe tener mínimo 4 caracteres!'],
        maxlength: [20, 'Debe tener máximo 25 caracteres!']
    },
    correo: {
        type: String,
        unique: true,
        required: [true, 'El correo es obligatorio!'],
        minlength: [12, 'Debe tener mínimo 12 caracteres!'],
        maxlength: [40, 'Debe tener máximo 40 caracteres!']
    },
    celular: {
        type: String,
        unique: true,
        required: [true, 'El número de celular es obligatorio!'],
        minlenght: [10, 'Ingrese un número válido!']
    }
})
module.exports = model('Proveedor', ProveedorSchema)