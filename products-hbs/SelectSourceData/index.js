
const MessageDao = require('./Daos/file/Messages')

let messageDao

switch (process.env.SOURCE_DATA) {
    case 'file':
        messageDao = new MessageDao()
        break;
    // case 'mongo':
    //     ProductDao = new ProductDaoMongo()
    //     CartDao = new CartDaoMongo()
    // case 'firebase':
    //         ProductDao = new ProductFirebase()
    //         CartDao = new CartFirebase()
    default:
        break;
}

module.exports = {
    messageDao
}