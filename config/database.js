const mongoose = require('mongoose')

// Conexión a la base de datos
mongoose.connect(process.env.MONGODB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})

.then(() => console.log("Database connected"))
.catch(error => console.log(error))

// 383861138281-6f5uoh1d9slfnik5hfaki6rhg6eom9o6.apps.googleusercontent.com