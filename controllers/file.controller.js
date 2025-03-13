const { request } = require("express");
const  uploadFile  = require("../config/cloudinary.js");
const  File  = require("../models/files.model.js");

const upload = async (req, res) => {
 
    try {
        
        const filelocalpath = req.file.path;

        console.log(filelocalpath);
        
        const filetoupload = await uploadFile(filelocalpath);

        console.log(filetoupload);
        

        if(!filetoupload){
            return res.status(400).json({ message: "File not uploaded" });
        }

        console.log("uploaded file is here");

        const newfile = await File.create(
            {
               name: req.file.originalname,
               path: filetoupload.url,
               user: req.user.userId 
            }
        )
        
        console.log(req.file);
        

        return res.render('Home', {file: userFiles})


    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }

}    

module.exports =  upload 