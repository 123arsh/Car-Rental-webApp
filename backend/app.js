require('dotenv').config()
const express = require('express');
const { connectMongoDB } = require('./connection');
const app = express();
const PORT = process.env.PORT || 7700;
const path = require('path');
const userRoute = require('./routes/user_route');
const cors = require('cors');

/*middlewares*/
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve('./public')));

/*Routes*/
app.use('/', userRoute);

/*Database Connection*/
connectMongoDB(process.env.mongoDb)
.then(()=> console.log('Database has been connected'))
.catch(()=> console.log('Problem with connecting database'));

/*Server Connection setup*/
app.listen(PORT, ()=>{
    console.log(`Server has been established at port number : ${PORT}`);
})