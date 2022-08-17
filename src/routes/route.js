const express = require('express')
const router = express.Router()
const { searchWord, addWord } = require('../controller/controller')


router.get('/searchword', searchWord)
router.post('/addword', addWord)


module.exports = router