const { titleCase, endpointCase } = require("../helpers/stringMethods")
const {Category} = require("../models")

const validarCategorias = async (req, res, next) => {
    const rama = titleCase(req.body.rama)

    const existeCat = await Category.findOne({rama})
    if (existeCat) return res.status(400).json({
        error: `Ya existe un conjunto de categorias con el nombre ${rama}`
    })
   
    req.body.rama = rama
    next()
}

// El campo etiquetas del modelo Category anteriormente se llamaba tags
const validarCatsByTag = async (req, res, next) => {
    const {categorias} = req.body

    const newCats = []
    for (let cat of categorias){
        const name = titleCase(cat.name)

        const existeCat = await Category.findOne({'categorias.name': name})
        if (existeCat) return res.status(400).json({
            error: `Ya existe una categoria con el nombre ${name}`
        })

        newCats.push({
            name,
            endpoint: endpointCase(cat.name),
        })
    }

    req.body.categorias = newCats
    next()
}

const existeCategoria = async (req, res, next) => {
    let {name} = req.body
    name = titleCase(name)

    const existeCat = await Category.findOne({'categorias.name': name})

    if (existeCat) return res.status(400).json({
        error: `Ya existe una categoria con el nombre ${name}`
    })

    req.body.name = name
    req.body.endpoint = endpointCase(name)
    next()
}

module.exports = {
    validarCategorias,
    validarCatsByTag,
    existeCategoria
}