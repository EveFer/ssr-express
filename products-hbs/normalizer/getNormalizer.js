const normalizr = require('normalizr')
const normalize = normalizr.normalize
const schema = normalizr.schema

const author = new schema.Entity('author', {idAttribute: 'email'})

const message = new schema.Entity('message', {
    author: author
})

const messages = new schema.Entity('messages', {
    messages: [message]
})

function normalizeMessages (data) {
    return normalize(data, messages)
}

module.exports = normalizeMessages