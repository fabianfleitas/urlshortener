const mongoose = require("mongoose")
    //const uri = "mongodb://127.0.0.1:27017/webpages"
const uri = process.env.MONGO_URI

mongoose
    .connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: true
    })
    .catch(err => console.log(err));

const db = mongoose.connection;

db.once("open", () => {
    console.log("Database is connected");
});

db.on("error", err => {
    console.log(err);
});