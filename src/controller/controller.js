const oxfardModel = require('../model/oxfardSchema')
const { apiCalls } = require('../controller/apicallsOxfard')


//to load all word on home page
const wordList = async (req, res) => {
    try {
        const dbCheck = await oxfardModel.find().sort({ word: 1 })
        if (dbCheck.length === 0)
            return res.status(404).send({ status: false, message: "No results found" })
        return res.status(200).send({ status: true, data: dbCheck })
    }
    catch (e) {
        console.log(e)
        res.status(500).send({ status: false, data: e.message })
    }
}
//to search word in db
const searchWord = async (req, res) => {
    try {
        const word = req.body.word

        // regex to check that word must contain alphabets
        if (!word.match(/^[a-zA-Z\s]+$/))
            return res.status(400).send({ status: false, message: "enter valid word (Only alpahabets)" });
        const dbCheck = await oxfardModel.find({ word: { $regex: word, $options: 'i' } })
        if (dbCheck.length === 0)
            return res.status(404).send({ status: false, message: "word not found" })
        return res.status(200).send({ status: true, data: dbCheck })
    }
    catch (e) {
        console.log(e)
        res.status(500).send({ status: false, data: e.message })
    }

}
//to add a word to list i.e db
const addWord = async (req, res) => {
    try {
        const word = req.body.word

        // regex to check that word must contain alphabets
        if (!word.match(/^[a-zA-Z\s]+$/))
            return res.status(400).send({ status: false, message: "enter valid word (Only alpahabets)" });

        const dbCheck = await oxfardModel.count({ word: word })
        if (dbCheck > 0) return res.status(400).send({ status: false, message: "word already exists" })

        const data = await apiCalls(word)
        if (!data.status) {
            return res.status(404).send({ status: false, msg: data.message })
        }
        const result = await oxfardModel.insertMany(data.data)
        return res.status(200).send({ status: true, data: result })

    }
    catch (e) {
        console.log(e)
        res.status(500).send({ status: false, data: e.message })
    }

}

module.exports = {
    wordList,
    searchWord,
    addWord
}