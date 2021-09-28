// const {Schema, model} = require('mongoose')

const TagSchema = {
    categorie: {
        type: Schema.Types.ObjectId,
        ref: 'Categorie',
        required: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    endpoint: {
        type: String,
        required: true
    }
}

// TagSchema.methods.toJSON = function(){
//     const { __v, estado, ...data } = this.toObject()
//     return data
// }

// module.exports = model('Tag', TagSchema)