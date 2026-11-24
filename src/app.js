const express = require('express')
const cors = require('cors')
require('dotenv').config()

const juegosRoutes = require('./routes/juegosRoutes')

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api', juegosRoutes)

app.get('/', (req, res) => {
  res.json({ mensaje: 'Backend de GameZone funcionando' })
})

const PORT = process.env.PORT || 3000
if (require.main === module) {
  app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`))
}

module.exports = app
