const fs = require('fs')

const generateActionRecord = (name) => {
    return `export const ${name} = '${name}' \n\n`
}

const createActionFile = (directoryName, actions) => {
    const content = actions.reduce((acc, { name }) => {
        return acc += generateActionRecord(name)
    }, '')

    fs.writeFile(`${directoryName}/actions.js`, content, () => {})
}

module.exports = createActionFile