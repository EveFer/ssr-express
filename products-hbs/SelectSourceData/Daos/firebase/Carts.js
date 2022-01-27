const ContainerFirebase = require('../../containers/firebase/ContainerFirebase')

class CartFirebase extends ContainerFirebase {
    constructor() {
        super('Carts')
    }

    create(products) {
        return super.create(products)
    }

    deleteCartById(id) {
        return super.deleteCartById(id)
    }

}