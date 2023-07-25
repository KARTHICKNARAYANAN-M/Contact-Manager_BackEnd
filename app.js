const express=require("express");
const { connect } = require("mongoose");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");

const app=express();

const dotenv=require("dotenv").config();

const port=5070;

connectDb();

app.use(express.json());    //provide the parser which helps to get data from client side
app.use('/api/contacts',require("./routes/contactroutes"));
app.use('/api/users',require("./routes/userroutes"));

app.use(errorHandler);
app.listen(port,()=>
{
    console.log(`Server running on ${port}`);
})
