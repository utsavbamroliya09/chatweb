const mongoose = require('mongoose');

const connectdb = async ()=>{
    try{
        await mongoose.connect(process.env.DB_URL);
        console.log("Database connected succesfully");
        
    }catch(error){
        console.log("Database not connected", error);
        process.exit(1)
        
    }
}

module.exports = connectdb