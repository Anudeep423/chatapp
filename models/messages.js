const mongoose = require('mongoose');
const msgSchema = new mongoose.Schema({
    msg: {
        type: String,
        required: true
    },
    name: {
        type: String
    }
})

const Msg = mongoose.model('msg', msgSchema);
module.exports = Msg;