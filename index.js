const { exit } = require('process');
const { listCommandItems } = require('./utils/helper')

const actionsList = {
    1: 'Create Email',
    2: 'Report Pages',
}

const chooseAction = async () => {
    return new Promise((resolve, reject) => {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout,
        })
        readline.question(`List of actions:\n\n${listCommandItems(actionsList)}\n\nYour choice: `, (data) => {
            data = parseInt(data)
            if (!actionsList[data]) {
                reject("Command not found")
            }
            resolve(data)
            readline.close()
        })
    })
}


(async () => {
    try {
        const data = await chooseAction()
        if (data === 1) {
            require('./utils/createEmail')
        }
        if (data === 2) {
            require('./utils/report')
        }
    } catch (err) {
        console.error("Err:", err)
        exit(1)
    }
})()
