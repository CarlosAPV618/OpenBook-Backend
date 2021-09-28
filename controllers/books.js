const {Book} = require('../models')
const {Types: {ObjectId}} = require('mongoose')
const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL)

const getBooks = async (req, res) => {
    const { page = 1, limit = 15 } = req.query

    const total = await Book.find().countDocuments()

    const totalPages = Math.ceil(total / limit)

    if (page > totalPages) return res.status(400).json({
        error: 'La pagina indicada supera el limite de paginas disponibles'
    })

    const skip = ( page - 1 ) * limit

    const books = await Book
                    .find()
                    .limit(Number(limit))
                    .skip(Number(skip))
                    .sort({createdAt: 'desc'})
  

    res.json({totalPages, books})
}

const librosPorCategoria = async (req, res) => {
    const { page = 1, limit = 15 } = req.query
    const {idcat} = req.params
    const query = {categorias: ObjectId(idcat)}

    const total = await Book.find(query).countDocuments()

    const totalPages = Math.ceil(total / limit)
    
    if (page > totalPages) return res.status(400).json({
        error: 'La pagina indicada supera el limite de paginas disponibles'
    })

    const skip = ( page - 1 ) * limit
    
    const books = await Book
        .find(query)
        .limit(Number(limit))
        .skip(Number(skip))
        .sort({createdAt: 'desc'})


    res.json({totalPages, books})
}

const postBooks = async (req, res) => {

    const {img, ...data} = req.body
    const book = new Book(data)

    if (req.files?.bookImg) {
        const {tempFilePath} = req.files.bookImg
        const {secure_url} = await cloudinary.uploader.upload(tempFilePath)
        book.img = secure_url
    }

    await book.save()
    
    res.json({book})
}

const putBook = async (req, res) => {
    const {id} = req.params
    const {_id, img, ...data} = req.body

    const book = await Book.findByIdAndUpdate(id, {...data}, {new: true})

    res.json(book)
}

const deleteBook = async  (req, res) => {
    await Book.findByIdAndRemove(req.params.id)
    res.json({msg: 'Libro eliminado'})
}

module.exports = {
    getBooks,
    librosPorCategoria,
    postBooks,
    putBook,
    deleteBook
}