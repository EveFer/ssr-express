const express = require('express')
const {Server: HttpServer} = require('http')
const {Server: IOServer} = require('socket.io')
const handlebars = require('express-handlebars')
const fs = require('fs')
const Product = require('./products_class')

const products = new Product('./products.json')

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

app.use(express.urlencoded({extended: true}))

app.use(express.static('./public'))
app.engine('handlebars', handlebars.engine())
app.set('view engine', "handlebars")
app.set('views', './views')

// app.post('/products', async (req, res) => {
//     try {
//         const newProduct = req.body
//         await products.save(newProduct)
//         res.redirect('/products')
//     } catch (error) {
//         console.log('Ocurrio un error')
//         res.redirect('/')
//     }
// })

app.get('/', async (req, res) => {
    const allProducts = await products.getAll()
    res.render('products', {products: allProducts})
})

// app.get('/products', async (req, res) => {
//     const allProducts = await products.getAll()
//     res.render('list-products', {
//         products: allProducts
//     })
// })


io.on('connection', async (socket) => {
    console.log('New user connected')
    const allProducts = await products.getAll()
    socket.emit('products', {products: allProducts})
    const allMessage = JSON.parse(fs.readFileSync('./messages..json', 'utf8'))
    socket.emit('all-messages', allMessage)
   
    socket.on('new-product', async (product) => {
       const allProducts = await products.save(product)
       io.sockets.emit('products', {products: allProducts})
    })

    socket.on('send-message', (message) => {
        const content = JSON.parse(fs.readFileSync('./messages..json', 'utf8'))
        message.date = `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`
        content.push(message)
        fs.writeFileSync('./messages..json', JSON.stringify(content, null, 2))
        const allMessage = JSON.parse(fs.readFileSync('./messages..json', 'utf8'))
        socket.emit('all-messages', allMessage)
    })


})


PORT = process.env.PORT || 3000
httpServer.listen(PORT, () => {
    console.log('Server running on port: ' + PORT)
})