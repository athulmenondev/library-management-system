const mongoose = require('mongoose');
const connectdb=async()=>{
    //console.log(process.env.MONGO_URI);
    try {
        const conn=mongoose.connect(process.env.MONGO_URI);
        console.log(`Mongodb is connected at ${process.env.MONGO_URI}`);
        console
    } catch (error) {
        console.error("Error is ");
        console.error(error);
        process.exit(1);
    }
};
module.exports=connectdb;