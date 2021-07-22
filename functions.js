const Webpage = require("./model")

const validateLink = (link) => {
    let regex = /http(s)?:[\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
    if (regex.test(link)) {
        link = igualateLink(link)
        return link;
    } else {
        return null
    }
}

const igualateLink = (link) => {
    let regex = /https/
    if (regex.test(link)) {
        link = link.replace("s", "")
    }
    return link
}

const createLink = async(link) => {
    let search = await searchLink(link)
    let lastShortLink = await lastLink()
    let newLink;
    if (search) {
        newLink = search
    } else {
        newLink = new Webpage({
            "original_url": link,
            "short_url": lastShortLink + 1
        })
    }
    const linkSaved = await newLink.save()
    return linkSaved
}

const searchLink = async(link) => {
    let search;
    if (typeof(link) == "string") {
        search = await Webpage.findOne({ "original_url": link })
    } else {
        search = await Webpage.findOne({ "short_url": link })
    }
    return search
}

const lastLink = async() => {
    let search = await Webpage.find({})

    if (search.length > 0) {
        search = await Webpage.find({}).sort({ short_url: -1 })
        return search[0].short_url
    } else {
        return 0
    }
}

module.exports.createLink = createLink
module.exports.validateLink = validateLink
module.exports.searchLink = searchLink