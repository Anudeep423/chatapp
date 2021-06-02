const mongoose = require('mongoose');
const Msg = require('./models/messages');
const express = require("express");

const io = require('socket.io')(3000)
const mongoDB = 'mongodb+srv://Anudeep123:12345678aA$@cluster0.ni9vp.mongodb.net/Chat?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('connected')
}).catch(err => console.log(err))
io.on('connection', (socket) => {
    io.emit("status" , "USER CONNECTED")
    Msg.find().then(result => {
        console.log(result)
        socket.emit('output-messages', result)
    })
    console.log('a user connected');
    socket.on('disconnect', () => {
    io.emit("status" , "USER DISCONNECTED")
        
    });



    socket.on('chatmessage', msg => {
        console.log(msg)
        const message = new Msg(msg);
        message.save().then(() => {
            io.emit('message', msg)
        })


    })
});

