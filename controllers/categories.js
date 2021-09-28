const { Category } = require("../models")
const { Types: { ObjectId } } = require('mongoose')

const getCat = async (req, res) => {
    const [categories, total] = await Promise.all([
        Category.find(),
        Category.countDocuments()
    ])

    res.json({categories, total})
}

const postCat = async (req, res) => {
    const {rama, categorias} = req.body
    
    const cat = new Category({rama, categorias})
    await cat.save()

    res.json(cat)
}

const putCat = async (req, res) => {
    const {id} = req.params
    const {categorias} = req.body
    const categoria = await Category.findByIdAndUpdate(id, {$push: {categorias}}, {new: true})

    res.json(categoria)
}

const renameCat = async (req, res) => {
    const { idCat } = req.params
    const { name, endpoint } = req.body
    
    const cat = await Category.findOneAndUpdate(
        {'categorias._id': ObjectId(idCat)},
        {$set: {'categorias.$.name': name, 'categorias.$.endpoint': endpoint}},
        {new: true}
    )

    res.json(cat)
}

const delCat = (req, res) => {
    const {id} = req.params
    Category.findByIdAndRemove(id).then(() => res.json({msg: 'Coleccion eliminada'}))
}

const eliminarCategoria = async (req, res) => {
    const {id} = req.params

    const cats = await Category.findOneAndUpdate(
        {'categorias._id': ObjectId(id)},
        {$pull: {
            categorias: { _id: ObjectId(id) } 
        }}, 
        {new: true}
    )

    res.json(cats)
}

module.exports = {
    getCat,
    postCat,
    putCat,
    renameCat,
    delCat,
    eliminarCategoria
}