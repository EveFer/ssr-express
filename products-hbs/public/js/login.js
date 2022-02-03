document.getElementById('btn-login').addEventListener('click', async () => {
    const name = document.getElementById('name').value
    const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        body: JSON.stringify({name}),
    })
    console.log(response)
    const responseJson = await response.json()
    console.log(responseJson)
})