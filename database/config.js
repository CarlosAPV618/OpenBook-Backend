const mongoose = require("mongoose")

const connection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_ATLAS, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log("Conexión establecida")
  } catch (error) {
    console.log(error)
    throw new Error("Error al intentar conectarse a la base de datos")
  }
}

module.exports = connection
