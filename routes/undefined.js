const {Router} = require('express')
const router = Router()

router.get('/', (req, res) => {
    res.json({error: 'Ruta no encontrada'})
})

router.post('/', (req, res) => {
    res.json({error: 'Ruta no encontrada'})
})

router.put('/', (req, res) => {
    res.json({error: 'Ruta no encontrada'})
})

router.delete('/', (req, res) => {
    res.json({error: 'Ruta no encontrada'})
})

module.exports = router