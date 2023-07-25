// to connect to the database successfully using the one we created on MongoDB Atlas.

const mongoose= require("mongoose");

const dbConnect= async() => {

    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB successfully");
    } catch (error) {
        console.log(`Error: ${error.message}`);
    }
};

module.exports =dbConnect;