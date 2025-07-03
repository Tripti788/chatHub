const mongo = require('mongoose');

const connectDB = async() => {
    try{
        await mongo.connect(process.env.MONGO_URI);
        console.log("mongodb connected");
    }
    catch(error){
        console.log("error in connection");
        process.exit(1);
    }
}

module.exports = connectDB