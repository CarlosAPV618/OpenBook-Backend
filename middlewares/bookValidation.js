const { Book } = require("../models")

const existeLibro = async (req, res, next) => {
    const {title, author} = req.body

    const existeLibro = await Book.findOne({title, author})
    if (existeLibro) return res.status(400).json({error: 'Este libro ya ha sido publicado'})

    next()
}

const catNotAreString = (req, res, next) => {
    const {categorias} = req.body

    if (typeof (categorias) === 'string') req.body.categorias = categorias.split(',')

    next()
}

module.exports = {
    existeLibro,
    catNotAreString
}