const { options } = require('./options');
const knex = require('knex')(options);

(async () => {
    try {
        const existsTableProduct = await knex.schema.hasTable('products')
        if(!existsTableProduct) {
            await knex.schema.createTable('products', (table) => {
                table.increments('id')
                table.string('name')
                table.float('price')
                table.string('url')
            })
            console.log('Table products created')
        }

        const existsTableMessages = await knex.schema.hasTable('messages')
        if(!existsTableMessages) {
            await knex.schema.createTable('messages', (table) => {
                table.increments('id')
                table.string('email')
                table.string('message')
                table.string('date')
            })
            console.log('Table messages created')
        }
    } catch (error) {
        console.log(error)
    } finally {
        knex.destroy()
    }
})()

