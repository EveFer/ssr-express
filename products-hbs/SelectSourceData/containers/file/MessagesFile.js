const fs = require('fs')
const Message = require('../../../models/file/messages')


class Message {
    constructor(file) {
        this.file = file
    }

    static async getMessages (file) {
        try {
            const content = await fs.promises.readFile(file, 'utf-8')
            if(content) {
                const messages = JSON.parse(content)
                return messages
            }
            return null
        } catch (error) {
            // await fs.promises.writeFile(file, '[]')
            throw new Error(error)
        }
    }

    async create(message) {
        try {
            if(!message) throw new Error('No enviaste datos para guardar')
            let messages = await Message.getMessages(this.file)
            const {author, text, date} = messages
            const messageCreated = new Message(author, text, date)
            messages = [...messages, messageCreated]
            await fs.promises.writeFile(this.file, JSON.stringify(messages, null, 2))
            return messageCreated
        } catch (error) {
            throw new Error(error)
        }
    }

    async getByIdOrAll(id) {
        try {
            let messages = await Message.getMessages(this.file)
            if(!id) return messages
            const msgFound = messages.find(msg => msg.id === id)
            if(!msgFound) throw new Error('No existe el msg')
            return msgFound
        } catch (error) {
            throw new Error(error)
        }
    }

    async deleteById(id) {
        try {
            let messages = await Message.getMessages(this.file)
            const messageFound = messages.find(msg => msg.id === id)
            if(!messageFound) throw new Error('No existe el mensaje')
            const messagesFiltered = messages.filter(msg => msg.id !== id)
            await fs.promises.writeFile(this.file, JSON.stringify(messagesFiltered, null, 2))
            return 'Carrito eliminado'
        } catch (error) {
            throw new Error(error)
        }
    }

    async updateById(id, newData) {
        try {
            let messages = await Message.getMessages(this.file)
            const messageToUpdate = messages.find(product => product.id === id)
            if(!messageToUpdate) throw new Error('El msg no existe')

            const indexMsg = messages.findIndex(msg => msg.id === id);
            const MessageUpdated = {...messageToUpdate,...newData}
            messages.splice(indexMsg, 1, MessageUpdated)
            await fs.promises.writeFile(this.file, JSON.stringify(messages, null, 2))
            return productUpdated
        } catch (error) {
            throw new Error(error)
        }
    }   

}

module.exports = Message