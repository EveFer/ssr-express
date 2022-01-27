const ContainerMessage = require('../../containers/file/MessagesFile')


class MessageDao extends ContainerMessage {

    constructor() {
        super('./data/messages.json')
    }

    save(data) {
        return super.create(data)
    }

    getByIdOrAll(id) {
        return super.getByIdOrAll(id)
    }

    updateById(id, newData) {
        return super.updateById(id, newData)
    }

    deleteById(id) {
        return super.deleteById(id)
    }

}

module.exports = MessageDao