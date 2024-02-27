/** Command-line tool to generate Markov text. */
const { MarkovMachine } = require('./markov');
const fs = require('fs');
const process = require('process');
const axios = require('axios');

let type = process.argv[2]
let text = process.argv[3]

if (type === 'file') {
    makeTextFromFile(text);

} else if (type === 'url') {
    makeTextFromURL(text);

} else {
    return
}

function makeTextFromFile(text) {
    fs.readFile(text, 'utf8', (err, data) => {
        try{
            console.log('generating markov machine')
            let mm = new MarkovMachine(data).makeText();
            console.log(mm);

        } catch {
            console.log('Could NOT generate', err)
        }
    })
}

async function makeTextFromURL(text) {
    await axios.get(`${text}`)
    .then((resp) => {
        let mm = new MarkovMachine(resp.data)
        let sen = mm.makeText()
        console.log(sen);

    })
    .catch((err) => {
        console.log('Could NOT generate', err)
    })

}