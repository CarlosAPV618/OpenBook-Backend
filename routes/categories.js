const {Router} = require('express')
const { check } = require('express-validator')
const {validarCampos, validarCategorias, validarCatsByTag, existeCategoria} = require('../middlewares')

const {
    getCat,
    postCat,
    putCat,
    delCat,
    eliminarCategoria,
    renameCat
} = require('../controllers/categories')

const { existeCategoriaById, existeRamaById } = require('../helpers/dbValidation')
const router = Router()

// api/categories
router.get('/', getCat)

router.post('/', [
    check('rama', 'Debes agregar un nombre para el grupo de categorias').notEmpty(),
    check('categorias', 'Agrega al menos una categoria').notEmpty(),
    validarCampos,
    validarCategorias,
    validarCatsByTag
], postCat)

router.put('/:id', [
    check('id', 'El id es invalido').isMongoId(),
    check('id').custom(existeRamaById),
    validarCampos,
    validarCatsByTag
], putCat)

router.put('/:idRama/:idCat', [
    existeCategoria,
    check('idRama', 'El id es invalido').isMongoId(),
    check('idRama').custom(existeRamaById),
    check('idCat').custom(existeCategoriaById),
    validarCampos
], renameCat)

router.delete('/:id', [
    check('id', 'El id es invalido').isMongoId(),
    check('id').custom(existeRamaById),
    validarCampos
], delCat)

router.delete('/unique/:id', [
    check('id', 'El id es invalido').isMongoId(),
    check('id').custom(existeCategoriaById),
    validarCampos
], eliminarCategoria)

module.exports = router