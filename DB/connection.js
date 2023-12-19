//import mongoose
const mongoose = require('mongoose')

const connectionString=process.env.DATABASE
//connect mongoDB with node
mongoose.connect(connectionString).then(()=>{
    console.log("mongoDB Atlas successfully connected with pfServer");
}).catch((err)=>{
console.log(`mongoDB connection failed! Error:${err}`);
})