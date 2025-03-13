const express = require('express');
const app = express();
const userRoutes = require('./routes/user.routes');
const cookieParser = require("cookie-parser")
const dotenv = require('dotenv');
dotenv.config();
const ConnectToDB = require("./config/db");
ConnectToDB();
const indexRoutes = require("./routes/index.routes")


app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser())


app.use('/user', userRoutes);
app.use('/', indexRoutes)


app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});