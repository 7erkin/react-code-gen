const fs = require('fs')
const spaces = require('../lib/spaces.js')
const actionNameToCamelCaseFormat = require('../lib/action-name-to-cc-format')

const generateReducerRecord = (action, hasPayload) => {
    const name = actionNameToCamelCaseFormat(action)
    const args = hasPayload ? '(state, value)' : '(state)'
    return `export const ${name} = ${args} => {\n${spaces(3)}return {\n${spaces(6)}...state\n${spaces(6)}// add update state logic... \n${spaces(3)}}\n} \n\n`
}

const createReducerFile = (directoryName, actions) => {
    const content = actions.reduce((acc, { name, hasPayload }) => {
        return acc += generateReducerRecord(name, hasPayload)
    }, '')

    fs.writeFile(`${directoryName}/reducers.js`, content, () => {})
}

module.exports = createReducerFile