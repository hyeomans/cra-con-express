import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'

const port = process.env.PORT || 3001
const isProduction = process.env.NODE_ENV === 'production'
const expressApp = express()

expressApp.use(
  bodyParser.json(),
  bodyParser.urlencoded({ extended: true })
)

expressApp.get('/ping', (req, res) => {
  //Esto nos será útil cuando hagamos la integración con el frontend.
  //Vamos a simular una demora en la respuesta desde el backend.
  setTimeout(() => {
    return res.status(200).json({pong: true})
  }, 1000)
})

if (isProduction) {
  // Solo cuando se corra el build de create-react-app (react-scripts build)
  // queremos que use express static para servir los archivos. 
  // En development usaremos un proxy para servir los 
  // archivos desde la memoria con: `react-scripts start`
  const buildDir = path.join(process.cwd(), 'build')
  expressApp.use(express.static(buildDir))
  expressApp.get('*', (req, res) => {
    res.send(path.join(buildDir, 'index.html'))
  })
}

expressApp.listen(port, () => {
  console.log(`🚀 El servidor esta corriendo en puerto: ${port}`)
})