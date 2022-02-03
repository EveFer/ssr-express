const express = require('express')
const {Server: HttpServer} = require('http')
const {Server: IOServer} = require('socket.io')
const handlebars = require('express-handlebars')
const Container = require('./container_class')
const { options } = require('./db/options')

const products = new Container(options, 'products')
// const messages = new Container(options, 'messages')
const { messageDao } = require('./SelectSourceData')

const getProducts = require('./faker/products')

const normalizeMessages = require('./normalizer/getNormalizer')
const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

// session
const cookieParser = require('cookie-parser')
const session = require('express-session')

const MongoStore = require('connect-mongo')
const advancedOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

app.use(cookieParser())
app.use(express.urlencoded({extended: true}))
app.use(session({
    store: MongoStore.create({
        mongoUrl: process.env.URL_MONGO,
        mongoOptions: advancedOptions
    }),
    secret: 'my secret',
    resave: false,
    saveUninitialized: false
}))

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

app.get('/api/productos-test', (req, res) => {
    try {
        res.json({
            success: true,
            data: {
                productos: getProducts()
            }
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        })
    }
})

app.get('/', async (req, res) => {
    res.render('login')
})

app.post('/', async (req, res) => {
    res.cookie("auth", "login", {maxAge: 100000})
    req.session.user = req.body.name
    const allProducts = await products.getAll()
    res.render('/products', {products: allProducts})
})

app.get('/products', async (req, res) => {
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
    const allMessage = await messageDao.getByIdOrAll()

    socket.emit('all-messages', normalizeMessages(allMessage))
   
    socket.on('new-product', async (product) => {
       await products.save(product)
       const allProducts = await products.getAll()
       io.sockets.emit('products', {products: allProducts})
    })

    socket.on('send-message', async (message) => {
        message.date = `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`
        await messageDao.save(message)
        const allMessage = await messageDao.getByIdOrAll()
        io.sockets.emit('all-messages', normalizeMessages(allMessage))
    })

    socket.on('disconnect', () => {
        console.log('User disconnected')
    })
})


PORT = process.env.PORT || 3000
httpServer.listen(PORT, () => {
    console.log('Server running on port: ' + PORT)
})