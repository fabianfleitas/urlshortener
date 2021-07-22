require('dotenv').config();
require("./connection")

const { validateLink, createLink, searchLink } = require("./functions")
const express = require("express");
const app = express();
const cors = require("cors");
const port = 3000

app.use(cors({ optionsSuccessStatus: 200 }))
app.use(express.urlencoded({ extended: false }));

app.listen(port, () => {
    console.log("App is listening in http://localhost.com/" + 3000)
})

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html")
})

app.post("/api/shorturl", (req, res) => {
    const link = validateLink(req.body.url)

    if (link) {
        let linkcreated = createLink(link)
            .then(result => res.json({
                "original_url": result.original_url,
                "short_url": result.short_url
            }))

        .catch(err => err.catch)
    } else {
        res.json({
            "error": "Invalid URL"
        })
    }
})

app.get("/api/shorturl/:shortLink", async(req, res) => {
    let link = await searchLink(parseInt(req.params.shortLink))
    res.redirect(link.original_url)
})