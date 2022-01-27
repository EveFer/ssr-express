const ContainerMongo = require('../../containers/mongo/ContainerMongo')

const Product = require('../../../models/mongo/product')

class ProductMongo extends ContainerMongo {

    constructor() {
        super('Product', Product)
    }

    getByIdOrAll(id) {
        return super.getAllOrId(id)
    }

    addProduct(productToCreate) {
        return super.create(productToCreate)
    }

    updateById(id, newData) {
        return super.updateById(id, newData)
    }

    deleteById(id) {
        return super.deleteById(id)
    }

    deleteAll() {
        return super.deleteAll()
    }
}

module.exports = ProductMongo