const express = require('express')
const router = express.Router()
const { searchWord, addWord, wordList } = require('../controller/controller')


//routes to make api calls
router.get('/homepage', wordList)
router.get('/searchword', searchWord)
router.post('/addword', addWord)


module.exports = router