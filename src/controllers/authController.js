const supabase = require('../config/database')

const login = async (req, res) => {
  try {
    const { usuario, password } = req.body

    if (!usuario || !password) {
      return res.status(400).json({ error: 'Ingrese usuario y contraseña' })
    }

    const { data, error } = await supabase
      .from('usuarios')
      .select('id, usuario')
      .eq('usuario', usuario.trim())
      .eq('password', password)
      .maybeSingle()

    if (error) return res.status(500).json({ error: error.message })
    if (!data) return res.status(401).json({ error: 'Usuario o contraseña incorrectos' })

    res.json({ mensaje: 'Login correcto', usuario: data })
  } catch (err) {
    console.log('Error en login:', err.message)
    res.status(500).json({ error: 'Error del servidor' })
  }
}

module.exports = { login }