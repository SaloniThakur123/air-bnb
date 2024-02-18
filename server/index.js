require('dotenv').config();
const cors=require('cors');
const express=require('express');
const mongoose=require('mongoose');
const userRoute=require('./routes/user');
const app=express();
const port=process.env.PORT || 4000;



app.use(express.json());
app.use(cors({
    credentials:true,
    origin: 'http://localhost:5173'
}))

// routes 
app.use('/',userRoute);



mongoose.connect('mongodb://127.0.0.1:27017/airbnb').then(()=>console.log('connected'));
app.listen(port,()=>console.log('working'))