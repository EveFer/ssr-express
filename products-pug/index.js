const express = require('express')
const Product = require('./products_class')

const products = new Product('./products.json')

const app = express()

app.use(express.urlencoded({extended: true}))

app.set('views', './views')
app.set('view engine', 'pug')

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
    res.render('products.pug', {})
})

app.get('/products', async (req, res) => {
    const allProducts = await products.getAll()
    res.render('list-products.pug', {
        products: allProducts
    })
})



PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log('Server running on port: ' + PORT)
})