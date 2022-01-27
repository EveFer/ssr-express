const ContainerFirebase = require('../../containers/firebase/ContainerFirebase')

class ProductFirebase extends ContainerFirebase {
    constructor() {
        super('Products')

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
}

module.exports = ProductFirebase