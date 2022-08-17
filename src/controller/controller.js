const oxfardModel = require('../model/oxfardSchema')
const { apiCalls } = require('../controller/apicallsOxfard')


const searchWord = async (req, res) => {
    try {
        const word = req.body.word
        if (!word.match(/^[a-zA-Z\s]+$/))
            return res.status(400).send({ status: false, message: "enter valid word (Only alpahabets)" });
        const dbCheck = await oxfardModel.find({ word: { $regex: word, $options: 'i' } })
        if (dbCheck.length === 0)
            return res.status(404).send({ status: false, message: "word not found" })
        return res.status(200).send({ status: false, data: dbCheck })
    }
    catch (e) {
        console.log(e)
        res.status(500).send({ status: false, data: e.message })
    }

}

const addWord = async (req, res) => {
    try {
        const word = req.body.word

        if (!word.match(/^[a-zA-Z\s]+$/))
            return res.status(400).send({ status: false, message: "enter valid word (Only alpahabets)" });

        const dbCheck = await oxfardModel.count({ word: word })
        if (dbCheck > 0) return res.status(400).send({ status: false, message: "word already exists" })

        const data = await apiCalls(word)
        if (!data.status) {
            return res.status(404).send({ status: false, msg: data.message })
        }
        const result = await oxfardModel.insertMany(data.data)
        return res.status(200).send({ status: false, data: result })

    }
    catch (e) {
        console.log(e)
        res.status(500).send({ status: false, data: e.message })
    }

}

module.exports = {
    searchWord,
    addWord
}