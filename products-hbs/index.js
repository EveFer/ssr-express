const express = require('express')
const handlebars = require('express-handlebars')
const Product = require('./products_class')

const products = new Product('./products.json')

const app = express()

app.use(express.urlencoded({extended: true}))

app.engine('handlebars', handlebars.engine())
app.set('view engine', "handlebars")
app.set('views', './views')

app.post('/products', async (req, res) => {
    try {
        const newProduct = req.body
        await products.save(newProduct)
        res.redirect('/products')
    } catch (error) {
        console.log('Ocurrio un error')
        res.redirect('/')
    }
})

app.get('/', (req, res) => {
    res.render('products', {})
})

app.get('/products', async (req, res) => {
    const allProducts = await products.getAll()
    res.render('list-products', {
        products: allProducts
    })
})





PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log('Server running on port: ' + PORT)
})