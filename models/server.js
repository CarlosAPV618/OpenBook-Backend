const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const connection = require('../database/config')

class Server{

    constructor(){
        this.app = express()
        this.port = process.env.PORT
        this.paths = {
            books: '/api/books',
            categories: '/api/categories'
        }
        this.connectDB()
        this.setMiddlewares()
        this.routes()
    }

    setMiddlewares(){
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(express.static('public'))
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
    }
    
    routes(){
        this.app.use(this.paths.books, require('../routes/books'))
        this.app.use(this.paths.categories, require('../routes/categories'))
        this.app.use('*', require('../routes/undefined'))
    }
    
    connectDB(){
        connection()
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Escuchando en el puerto ${this.port}`)
        })
    }
}

module.exports = Server