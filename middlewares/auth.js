const jwt = require('jsonwebtoken');

function auth(req, res, next) {


    try {

        const token = req.cookies.token;

        if (!token) {

            return res.render("login");

        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;


        next();

    } catch (error) {

        
        return res.status(401).json({ message: "Something went wrong." });

    }
}

module.exports = auth;