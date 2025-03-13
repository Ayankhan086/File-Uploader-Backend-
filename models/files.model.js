const mongoose = require("mongoose")

const FileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    path:{
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
})    


const File = mongoose.model("file", FileSchema)

module.exports = File