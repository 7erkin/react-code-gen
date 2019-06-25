const fs = require('fs')
const spaces = require('../lib/spaces.js')
const actionNameToCamelCaseFormat = require('../lib/action-name-to-cc-format')

const generateActionCreatorRecord = (action, hasPayload) => {
    const name = actionNameToCamelCaseFormat(action)
    const args = hasPayload ? '(arg)' : '()'
    const value = hasPayload ? 'value: arg' : ''
    const type = hasPayload ? `type: ${action},` : `type: ${action}`
    return `export const ${name} = ${args} => {\n${spaces(3)}return {\n${spaces(6)}${type}\n${spaces(6)}${value}\n${spaces(3)}}\n} \n\n`
}

const createActionCreatorFile = (directoryName, actions) => {
    const content = actions.reduce((acc, { name, hasPayload }) => {
        return acc += generateActionCreatorRecord(name, hasPayload)
    }, '')

    fs.writeFile(`${directoryName}/action-creators.js`, content, () => {})
}

module.exports = createActionCreatorFile