import express from 'express'
import destRouter from './routes/destinations.js'

const app = express();


//serve static files from the client\public directory
app.use('/public', express.static('./public'))

//serve files from client\public\scripts
app.use('/scripts', express.static('./public/scripts'))

//endpoint returning json data
app.use('/destinations', destRouter)

//route for root URL of server
app.get('/', (req, res) => {
    res.status(200).send('<h1 style="text-align: center; margin-top: 50px;">Listicle API</h1>')
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`🚀 Server listening on http://localhost:${PORT}`)
})