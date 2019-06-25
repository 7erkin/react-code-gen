const actionNameToCamelCaseFormat = name => {
    return name
        .split('_')
        .map((el, index) => {
            const word_chunk = el.toLowerCase()
            
            return index ? `${word_chunk[0].toUpperCase()}${word_chunk.slice(1, word_chunk.length)}` : word_chunk
        })
        .join('')
}

module.exports = actionNameToCamelCaseFormat