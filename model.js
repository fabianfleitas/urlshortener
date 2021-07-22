const { Schema, model } = require("mongoose")

const webpageSchema = new Schema({
    "original_url": String,
    "short_url": Number
})

module.exports = model("Webpage", webpageSchema)