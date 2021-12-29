const knex = require('knex')

class Contenedor {
    constructor(options, table){
        this.knex = knex(options)
        this.table = table
    }

    async save(register){
        try {
            if(!register) throw new Error('No enviaste un producto para guardar')
            let registerCreated = await this.knex(this.table).insert(register)
            return registerCreated
        } catch (error) {
            throw new Error(error)
        }
    }

    async getById(id){
        // return objeto del id de lo contrario null
        try {
            const registerFound = await this.knex(this.table).where('id', id).select('*')
            if(registerFound.length == 0) return null
            return registerFound
        } catch (error) {
            throw new Error(error)
        }
    }

   async getAll(){
        // return array con todos los objetos
        try {
            const registers = await this.knex.select('*').from(this.table)
            return registers
        } catch (error) {
            throw new Error(error)
        }
    }

    async deleteById(id){
        // Elimna del archivo el objeto con el id
        try {
            const registerToDelete = await this.knex(this.table).where('id', id).select('*').limit(1)
            if(registerToDelete.length === 0) throw new Error('El producto no existe')

            const registerDeleted = await this.knex(this.table).where('id', id).del()
            console.log(registerDeleted)
            return 'Producto Eliminado'
        } catch (error) {
            throw new Error(error)
        }
    }
    async deleteAll(){
        // Elimina todos los objetos del archivo
        try {
            await this.knex(this.table).del()
        } catch (error) {
            throw new Error(error)
        }
    }
}

module.exports = Contenedor