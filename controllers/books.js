const {Book, Category} = require('../models')
const cloudinary = require('cloudinary').v2
const {Types} = require('mongoose')
cloudinary.config(process.env.CLOUDINARY_URL)

const getBooks = async (req, res) => {
    const { page = 1, limit = 15, idCat = null } = req.query

    try {
        let query = {};

        if (idCat) {

            if (!Types.ObjectId.isValid(idCat)) return res.status(400).json({
                error: 'Id de categoría inválido'
            })

            query = { categorias: idCat }
    
            const existeCategoria = await Category.findOne({'categorias._id': idCat})
            
            if (!existeCategoria) return res.status(404).json({
                error: 'Categoria no encontrada'
            })
        }

        const total = await Book.find(query).countDocuments()

        if (total === 0) return res.status(404).json({
            error: 'No se encontraron libros de esta categoría'
        })

        const totalPages = Math.ceil(total / limit)

        if (page > totalPages) return res.status(400).json({
            error: 'La página indicada supera el límite de páginas disponibles'
        })

        const skip = (page - 1) * limit

        const books = await Book
                        .find(query)
                        .limit(Number(limit))
                        .skip(Number(skip))
                        .sort({createdAt: 'desc'})
    

        let pagination = [[]]
        for (let page = 1; page <= totalPages; page++){
            const currentGroup = pagination.length - 1
            if (pagination[currentGroup].length <= 5) pagination[currentGroup].push(page)
            else pagination.push([page])
        } 

        res.json({totalPages, books, pagination})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Internal server error'})
    }
}

const postBooks = async (req, res) => {
    const {img, token, ...data} = req.body

    if (!token || token !== process.env.TOKEN) return res.status(400).json({
        msg: 'Token no válido'
    });

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
    postBooks,
    putBook,
    deleteBook
}