const bookValidation = require('./bookValidation')
const validarArchivo = require('./validarArchivo')
const validarCampos = require('./validarCampos')
const validarCategorias = require('./validarCategorias')

module.exports = {
    ...bookValidation, 
    validarArchivo, 
    validarCampos,
    ...validarCategorias
}