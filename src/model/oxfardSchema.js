const mongoose = require('mongoose')

//this is the schema that will store the information related to word in dblocal
const oxfardSchema = new mongoose.Schema({
    id: {
        type: String,
        trim: true,
        required: true
    },
    word: {
        type: String,
        required: true
    },
    language: String,
    lexicalEntries: [{
        entries: [{
            etymologies: [String],
            pronunciations: [{
                audioFile: {
                    type: String,
                    required: true
                },
                dialects: [String],
                phoneticNotation: {
                    type: String,
                    required: true
                },
                phoneticSpelling: {
                    type: String,
                    required: true
                }
            }],
            senses: [{
                definitions: [String],
                examples: [{
                    text: String
                }],
                id: String,
                shortDefinitions: [String]
            }]
        }],
        language: String,
        lexicalCategory: {
            id: {
                type: String,
                required: true
            },
            text: {
                type: String,
                required: true
            }
        },
        text: String
    }]
}, { timestamps: true })

module.exports = mongoose.model('Oxfard', oxfardSchema)