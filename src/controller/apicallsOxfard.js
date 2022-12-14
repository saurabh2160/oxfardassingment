const axios = require('axios')
require("dotenv").config()


//axios call to the oxford api
const apiCalls = async (word) => {
    try {
        const url = `https://od-api.oxforddictionaries.com/api/v2/entries/en-gb/${word.toLowerCase()}?strictMatch=false`
        const headers = {
            "Accept": "application/json",
            "app_id": process.env.OXFORD_ID,
            "app_key": process.env.OXFORD_KEY
        }
        const oxford = await axios.get(url, { headers })
        //if oxford api sends and error then this send the response
        if (oxford.data.error) return { status: false, message: oxford.data.error }

        //succesful redponse
        const data = {
            status: true,
            data: oxford.data.results
        }
        return data
    }
    catch {
        console.log(e)
        return { status: false, message: e.message }
    }

}

module.exports = { apiCalls }