const socket = io("http://localhost:3000");
const messages = document.getElementById('messages');
const msgForm = document.getElementById('msgForm');
const status = document.getElementById('status');



socket.on("status" , (msg) => {
    const html = `<div> ${msg} </div>`
    status.innerHTML += html
} )



socket.on('message', data => {
    console.log(data)
    appendMessages(data.name,data.msg)
})
socket.on('output-messages', data => {
    console.log(data)
    if (data.length) {
        data.forEach(message => {
            appendMessages(message.name,message.msg)
        });
    }
})

msgForm.addEventListener('submit', e => {
    e.preventDefault()
    socket.emit('chatmessage', {name : document.getElementById("name").value , msg : msgForm.msg.value })
    console.log('submit from msgfrom', msgForm.msg.value)
    msgForm.msg.value = '';


})

function appendStatus(status) {
    const html = `<div> ${status} </div>`
    status.innerHTML += html
}

function appendMessages(name,message) {
    const html = `<div> ${name} : ${message}</div>`
    messages.innerHTML += html
}