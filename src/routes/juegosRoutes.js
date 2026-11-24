const express = require('express')
const router = express.Router()
const { getJuegos, createJuego, updateJuego, deleteJuego } = require('../controllers/juegosController')
const { login } = require('../controllers/authController')

router.post('/login', login)
router.get('/juegos', getJuegos)
router.post('/juegos', createJuego)
router.put('/juegos/:id', updateJuego)
router.delete('/juegos/:id', deleteJuego)

module.exports = router
