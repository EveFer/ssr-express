const ContainerMongo = require('../../containers/mongo/ContainerMongo')

const ProductMongo = require('./Products')

const products = new ProductMongo()

const Cart = require('../../../models/mongo/cart')

class CartMongo extends ContainerMongo {

    constructor() {
        super('Cart', Cart)
    }

    create(products) {
        return super.create(products)
    }

    deleteCartById(id) {
        return super.deleteCartById(id)
    }

    getProductsByCart(idCart) {
        return super.getAllOrId(idCart)
    }

    addProductToCart(idCart, idProduct) {
        // TODO stock
        const productFound = products.model.findById(idProduct)
        if(!productFound) throw new Error('El producto no existe')
        return super.model.updateOne(
            { _id: idCart }, 
            { $push: { products: productFound } }
        );
    }

    deleteProductByCart(idCart, idProduct) {
        const cartFound = super.model.findById(idCart)
        if(!cartFound) throw new Error('No existe el carrito')
        const productFound = products.model.findById(idProduct)
        if(!productFound) throw new Error('El producto no existe')

        return super.model.findByIdAndUpdate(idCart, {$pull: {products: {_id: idProduct}}}, {new: true})
    }
}

module.exports = CartMongo