const faker = require('faker');
faker.locale = "es_MX";

function getProducts() {
    const products = []
    for (let index = 0; index < 5; index++) {
        const product = {}
        product.name = faker.commerce.productName() 
        product.price = faker.commerce.price() 
        product.url = faker.image.image() 
        products.push(product)
    }

    return products
}

module.exports = getProducts