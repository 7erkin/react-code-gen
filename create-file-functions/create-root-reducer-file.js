const fs = require('fs')
const spaces = require('../lib/spaces.js')
const actionNameToCamelCaseFormat = require('../lib/action-name-to-cc-format')

const generateIncludeActionsText = (actions) => {
    const text = actions.reduce((acc, { name }, index) => {
        return index !== actions.length - 1 ? acc += `${spaces(3)}${name},\n` : acc += `${spaces(3)}${name}\n`
    }, '')

    return (
        `import {\n${text}} from 'define right path'\n\n`
    )
}

const generateIncludeReducersText = (actions) => {
    const text = actions.reduce((acc, { name }, index) => {
        name = actionNameToCamelCaseFormat(name)
        return index !== actions.length - 1 ? acc += `${spaces(3)}${name},\n` : acc += `${spaces(3)}${name}\n`
    }, '')

    return (
        `import {\n${text}} from 'define right path'\n\n`
    )
}

const generateRootReducerCase = ({ name, hasPayload }) => {
    const args = hasPayload ? '(state, value)' : '(state)';
    return (
        `${spaces(6)}case ${name}:\n${spaces(9)}return ${actionNameToCamelCaseFormat(name)}${args}\n`
    )
}

const generateRootReducerText = (actions) => {
    const caseText = actions.reduce((acc, el) => acc += generateRootReducerCase(el), '')
    return (
        `const rootReducer = (state = initialState, { type, value }) => {\n${spaces(3)}switch(type){\n${caseText}${spaces(6)}default: \n${spaces(9)}return state\n${spaces(3)}}\n}\n\nexport default rootReducer`
    )
}

const createRootReducerFile = (directoryName, actions) => {
    const includeInitialState = 'import initialState from \'./initialState\'\n\n'
    const includeActionsText = generateIncludeActionsText(actions)
    const includeReducersText = generateIncludeReducersText(actions)

    const rootReducerText = generateRootReducerText(actions)

    const content = includeInitialState + includeActionsText + includeReducersText + rootReducerText

    fs.writeFile(`${directoryName}/root-reducer.js`, content, () => {})
}

module.exports = createRootReducerFile