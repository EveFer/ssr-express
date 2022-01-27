const { v4: uuidv4 } = require('uuid')

class Message {
    constructor (author, text, date) {
        this.id = uuidv4()
        this.author = author,
        this.text = text
        this.date = date
    }
}

module.exports = Message