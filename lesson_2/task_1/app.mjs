import { readlink } from 'fs'
import { argv } from 'process'
import readline from 'readline'



const urlSearchString = argv.slice(2).join('&')
const args = new URLSearchParams(urlSearchString)

const passionAge = args.has('--pension') ? args.get('--pension') : 65

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.question('Скільки вам років', (answer) => {
    if (answer >= passionAge)
        console.log('Ви пенсінер')

    else console.log('не пенсіонер')
    rl.close()
})
