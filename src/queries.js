const Pool = require('pg').Pool
const pool = new Pool({
  user: 'admin',
  host: 'localhost',
  database: 'ProyectoRegalos',
  password: 'Asuncion7',
  port: 5432,
})

const getPreguntas = (request, response) => {
  pool.query('SELECT * FROM msPreguntas ORDER BY idPregunta ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getPreguntaPorId = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM msPreguntas WHERE idPregunta = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createUsuario = (request, response) => {
  const { nombreUsuario} = request.body

  pool.query('INSERT INTO dtUsuarios (nombreUsuario) VALUES ($1) RETURNING *', [nombreUsuario], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Usuario añadido con ID: ${results.rows[0].id}`)
  })
}



module.exports = {
  getPreguntas,
  getPreguntaPorId,
  createUsuario,
}
