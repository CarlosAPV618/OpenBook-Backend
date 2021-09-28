const { Schema, model } = require("mongoose");

const BookSchema = Schema({
    title: {
        type: String,
        required: true
    },
    author:{
        type: String,
        default: 'Desconocido'
    },
    description: {
        type: String,
        default: 'No hay descripcion de este libro'
    },
    categorias:{
        type: [Schema.Types.ObjectId],
        required: true
    },
    img: {
        type: String,
        default: 'https://res.cloudinary.com/ds4tfrr0b/image/upload/v1631489007/no-image_aibqq7.jpg'
    },
    link: {
        type: String,
        required: true,
        unique: true
    }
}, {timestamps: true})

BookSchema.method('toJSON', function() {
    const {__v, _id, ...object} = this.toObject()
    object.uid = _id
    return object
})

module.exports = model('Book', BookSchema)