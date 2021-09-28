const { Router } = require("express")
const { check } = require('express-validator')

const {
    getBooks,
    postBooks,
    deleteBook,
    librosPorCategoria,
    putBook
} = require("../controllers/books")

const {
    existeLink,
    existeLibroById,
    existeCategoriaById,
    existeRamaById,
    isObjectIdArray,
    existeCatInBook 
} = require("../helpers/dbValidation")

const { validarCampos, validarArchivo, catNotAreString } = require("../middlewares")
const { existeLibro } = require('../middlewares')

const router = Router()

// api/books
router.get('/', getBooks)

router.get('/:idRama/:idcat', [
    check(['idRama', 'idcat'], 'Formato de ID invalido').isMongoId(),
    check('idRama').custom(existeRamaById),
    check('idcat').custom(existeCategoriaById),
    check('idcat').custom(existeCatInBook),
    validarCampos
], librosPorCategoria)

router.post('/', [
    validarArchivo,
    check('title', 'El titulo es obligatorio').notEmpty(),
    existeLibro,
    check('link', 'Debes agregar un link de descarga').notEmpty(),
    check('link').custom(existeLink),
    check('categorias', 'Agrega al menos una categoria').notEmpty(),
    catNotAreString,
    check('categorias').custom(isObjectIdArray),
    validarCampos
],postBooks)

router.put('/:id', [
    check('id').isMongoId(),
    check('id').custom(existeLibroById),
    check('link').custom(existeLink),
    validarCampos
], putBook)

router.delete('/:id', [
    check('id').isMongoId(),
    check('id').custom(existeLibroById),
    validarCampos
], deleteBook)

module.exports = router