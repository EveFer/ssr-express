const express = require('express')
const {Server: HttpServer} = require('http')
const {Server: IOServer} = require('socket.io')
const handlebars = require('express-handlebars')
const Container = require('./container_class')
const { options } = require('./db/options')

const products = new Container(options, 'products')
const messages = new Container(options, 'messages')

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
    const allMessage = await messages.getAll()
    socket.emit('all-messages', allMessage)
   
    socket.on('new-product', async (product) => {
       await products.save(product)
       const allProducts = await products.getAll()
       io.sockets.emit('products', {products: allProducts})
    })

    socket.on('send-message', async (message) => {
        message.date = `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`
        await messages.save(message)
        const allMessage = await messages.getAll()
        io.sockets.emit('all-messages', allMessage)
    })

    socket.on('disconnect', () => {
        console.log('User disconnected')
    })
})


PORT = process.env.PORT || 3000
httpServer.listen(PORT, () => {
    console.log('Server running on port: ' + PORT)
})