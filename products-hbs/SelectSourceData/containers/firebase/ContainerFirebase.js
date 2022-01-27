const getDatabase = require('../../../libs/firebase')

class ContainerFirebase {
    constructor (collection) {
        this.db = getDatabase()
        this.collection = this.db.collection(collection)
    }

    create (data) {
        return this.collection.doc().create(data)
    }

    getAllOrId(id) {
        if (!id) return this.collection.get().docs()
        return this.collection.doc(id).get()
    }

    updateById(id, data) {
        return this.collection.doc(id).update(data)
    }

    deleteById(id) {
        return this.collection.doc(id).delete()
    }
}

module.exports = ContainerFirebase