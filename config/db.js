const mongoose = require("mongoose")

function ConnectToDB(){
    mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log("Connected to MongoDB")
    })
}
module.exports = ConnectToDB