const { Book, Category } = require("../models")
const { Types: { ObjectId } } = require('mongoose')

const existeRamaById = async (id) => {
    const categoria = await Category.findById(id)
    if (!categoria) throw new Error(`Error: la categoria con id ${id} no existe`)
}

const existeLibroById = async (id) => {
    const libro = await Book.findById(id)
    if (!libro) throw new Error(`Error: el ID especificado (${id}) no existe`)
}

const isInCollections = (collection, collections) => {
    if (!collections.includes(collection)) throw new Error(`La coleccion ${collection} no es valida`)
    return true
}

const isObjectIdArray = async (cats) => {
    const errors = []
    const notFound = []

    for (let cat of cats){
        if (!ObjectId.isValid(cat)) errors.push(cat)
        else{
            const existeCat = await Category.findOne({'categorias._id': ObjectId(cat)})
            !existeCat && notFound.push(cat)
        }
    }

    if ( errors.length ) throw new Error(`Error: ${errors.join(', ')} no son id's validos`)
    if (notFound.length) throw new Error(`No encontramos categorias con id ${notFound.join(', ')}`)
}

const existeCategoriaById = async (catid) => {
    const cat = await Category.findOne({'categorias._id': ObjectId(catid)})
    if (!cat) throw new Error(`Error: La categoria con id ${catid} no existe`)
}

const existeCatInBook = async (tag) => {
    const books = await Book.findOne({categorias: ObjectId(tag)})
    if(!books) throw new Error(`No encontramos libros con el tag ${tag}`)
}

const existeCategoria = async (cats) => {
    let errors = []

    for (let cat of cats){
        const existeCat = await Category.findOne({'categorias.name': cat.name})
        if (existeCat) errors.push(cat.name)
    }

    if (errors.length) throw new Error(`La(s) categoria(s) ${errors.join(', ')} ya existen`)
}

const existeLink = async link => {
    const existeLink = await Book.findOne({link})
    if (existeLink) throw new Error('Este link ya está en uso')
}

module.exports = {
    existeLink,
    existeLibroById,
    existeCategoriaById,
    existeRamaById,
    isObjectIdArray,
    existeCatInBook,
    // existeCategoria,
}