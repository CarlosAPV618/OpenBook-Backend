const {Schema, model} = require('mongoose')

const CategoriesSchema = Schema({
    rama: {
        type: String,
        required: true,
        unique: true
    },
    categorias: [{
        name: {
            type: String,
            required: true,
            unique: true
        },
        endpoint: {
            type: String,
            required: true
        }
    }]
})

CategoriesSchema.methods.toJSON = function(){
    const {__v, ...data} = this.toObject()
    return data
}

module.exports = model('Categorie', CategoriesSchema)