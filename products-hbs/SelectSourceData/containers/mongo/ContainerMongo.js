const mongoose = require('mongoose');
const db = require('../../../libs/db')

class ContainerMongo {
    constructor (collection, schema) {
        this.model = mongoose.model(collection, schema)
    }

    connect () {
        db.connect()
            .then(() => console.log('DB connected successfully'))
            .catch((e) => console.log('hubo un error: ', e)) 
    }

    create (data) {
        return this.model.create(data)
    }

    getAllOrId(id) {
        if (!id) return this.model.find()
        return this.model.findById(id)
    }

    updateById(id, data) {
        return this.model.findByIdAndUpdate(id, data, {new: true})
    }

    deleteById(id) {
        return this.model.findByIdAndDelete(id)
    }

    deleteAll() {
        return this.model.deleteMany()
    }
}

module.exports = ContainerMongo