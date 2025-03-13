const express = require("express")
const upload = require("../controllers/file.controller.js")
const multerupload = require("../config/multer.js");
const multer = require('multer');
const auth = require("../middlewares/auth.js");
const File = require("../models/files.model.js");
const jwt = require("jsonwebtoken")

const router = express.Router()


router.get('/', auth, async (req, res) => {
    res.render('landingPage')
})

router.get('/home', auth, async (req, res) => {

    const userFiles = await File.find({
        user: req.user.userId
    })

    console.log(userFiles);
    

    res.render('Home', {file: userFiles})
})

router.post("/upload-file", auth, multerupload.single('file'), upload)

module.exports = router