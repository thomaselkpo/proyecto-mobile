const supabase = require('../config/database')

const getJuegos = async (req, res) => {
  try {
    const { data, error } = await supabase.from('juegos').select('*').order('id', { ascending: false })
    if (error) return res.status(500).json({ error: error.message })
    res.json(data)
  } catch (err) {
    console.log('Error en getJuegos:', err.message)
    res.status(500).json({ error: 'Error del servidor' })
  }
}

const createJuego = async (req, res) => {
  try {
    const { titulo, plataforma, genero, estado, puntuacion, descripcion } = req.body
    if (!titulo || !titulo.trim() || !plataforma || !genero || !estado) {
      return res.status(400).json({ error: 'Complete título, plataforma, género y estado' })
    }

    if (puntuacion !== '' && puntuacion != null && (!Number.isInteger(Number(puntuacion)) || Number(puntuacion) < 0 || Number(puntuacion) > 10)) {
      return res.status(400).json({ error: 'La puntuación debe ser un número entero entre 0 y 10' })
    }

    const nuevoJuego = {
      titulo: titulo.trim(),
      plataforma,
      genero,
      estado,
      puntuacion: puntuacion === '' || puntuacion == null ? null : Number(puntuacion),
      descripcion: descripcion || ''
    }

    const { data, error } = await supabase.from('juegos').insert([nuevoJuego]).select().single()
    if (error) return res.status(500).json({ error: error.message })
    res.status(201).json(data)
  } catch (err) {
    console.log('Error en createJuego:', err.message)
    res.status(500).json({ error: 'Error del servidor' })
  }
}

const updateJuego = async (req, res) => {
  try {
    const { id } = req.params
    const { titulo, plataforma, genero, estado, puntuacion, descripcion } = req.body
    if (!titulo || !titulo.trim() || !plataforma || !genero || !estado) {
      return res.status(400).json({ error: 'Complete título, plataforma, género y estado' })
    }

    if (puntuacion !== '' && puntuacion != null && (!Number.isInteger(Number(puntuacion)) || Number(puntuacion) < 0 || Number(puntuacion) > 10)) {
      return res.status(400).json({ error: 'La puntuación debe ser un número entero entre 0 y 10' })
    }

    const juegoActualizado = {
      titulo: titulo.trim(),
      plataforma,
      genero,
      estado,
      puntuacion: puntuacion === '' || puntuacion == null ? null : Number(puntuacion),
      descripcion: descripcion || ''
    }

    const { data, error } = await supabase.from('juegos').update(juegoActualizado).eq('id', id).select().maybeSingle()
    if (error) return res.status(500).json({ error: error.message })
    if (!data) return res.status(404).json({ error: 'No se encontró el videojuego' })
    res.json(data)
  } catch (err) {
    console.log('Error en updateJuego:', err.message)
    res.status(500).json({ error: 'Error del servidor' })
  }
}

const deleteJuego = async (req, res) => {
  try {
    const { id } = req.params
    const { data, error } = await supabase.from('juegos').delete().eq('id', id).select('id').maybeSingle()
    if (error) return res.status(500).json({ error: error.message })
    if (!data) return res.status(404).json({ error: 'No se encontró el videojuego' })
    res.json({ mensaje: 'Videojuego eliminado' })
  } catch (err) {
    console.log('Error en deleteJuego:', err.message)
    res.status(500).json({ error: 'Error del servidor' })
  }
}

module.exports = { getJuegos, createJuego, updateJuego, deleteJuego }
