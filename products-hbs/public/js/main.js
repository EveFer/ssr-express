console.log('Hello')
const socket = io.connect()

let email

socket.on('all-messages', messages => {
   const wrapperMessages = document.querySelector('.chat-messages')
   const allMessages = messages.reduce((acc, message) => {
       const msg = `
        <p>
        <strong>${message.email}</strong>
        [${message.date}] <br>
        <span>${message.message}</span>
        </p>
       `
       return acc += msg
   }, '')
   wrapperMessages.innerHTML = allMessages
})

socket.on('products', ({products}) => {
    let wrapperProducts = document.getElementById('wrapper-products')
    const rows = products.reduce((accum, product, index) =>{
        const productItem = `
            <tr>
                <th scope="row">
                    ${index + 1}
                </th>
                <td>
                    ${product.title}
                </td>
                <td>$ ${product.price} MXN</td>
                <td>
                    <img class="img-product" src=${product.thumbnail} alt=${product.title} >
                </td>
            </tr>
        `

        accum += productItem
        return accum
    }, '')
    wrapperProducts.innerHTML = rows
})

document.getElementById('btn-save').addEventListener('click', () => {
    const inputs = document.querySelectorAll('form.form-product input')
    let newProduct = {}
    inputs.forEach(input => {
        const {name, value} = input
        newProduct = {...newProduct,[name]: value} 
        input.value = ""
    })
    socket.emit('new-product', newProduct)
})


document.getElementById('form-email').addEventListener('submit', e => {
    e.preventDefault()
    email = document.getElementById('email-chat').value
    console.log(email)
    if(email) {
        document.getElementById('form-message').classList.remove('d-none')
        // document.querySelector('.chat-messages').classList.remove('d-none')
        localStorage.setItem('user', email)
        document.getElementById('email-chat').classList.add('d-none')
    }
})

document.getElementById('send-message').addEventListener('click', (e) => {
    // e.preventDefault()
    const message = document.getElementById('message').value

    const messageToSend = {
        email,
        message
    }
    socket.emit('send-message', messageToSend)
    document.getElementById('message').value = ''
})