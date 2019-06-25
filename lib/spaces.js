const spaces = quantitySpaces => {
    let space = ''

    for(let i = 0; i < quantitySpaces; ++i)
        space += ' '

    return space
}

module.exports = spaces