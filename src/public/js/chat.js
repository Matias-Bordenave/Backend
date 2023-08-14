const socket = io()

socket.on("message-all", (data) => {
    render(data)
    let chat = document.getElementById('myBox')
    chat.scrollTop = chat.scrollHeight
})


function render(data) {
    const html = data.map((elem) => {
        return (
            `
            <div>
                <strong> ${elem.author} </strong> : <em> ${elem.text} </em>
            </div>
            `
        )
    }).join(' ')

    document.getElementById("myBox").innerHTML = html
}

function addMessage() {
    const msj = {
        author: document.getElementById('username').value,
        text: document.getElementById('text').value
    }

    socket.emit('new-message', msj)

    document.getElementById('text').value = ""

    return false
}