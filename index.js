const fs = require('fs')

const generate = () => {
    const fileText = fs.readFileSync('config.json')
    const conf = JSON.parse(fileText)

    const { actions, options: { rootReducerNeed, dirName } } = conf

    const createdDirectoryName = `${__dirname}/generated-content/${!dirName.length ? `new-gen${new Date().getMilliseconds()}` : dirName}`

    if(fs.existsSync(createdDirectoryName)){
        console.log('Info message: Such directory already exist')
        return
    }

    fs.mkdirSync(createdDirectoryName)
    
    require('./create-file-functions/create-action-file')(createdDirectoryName, actions)

    require('./create-file-functions/create-action-creator-file')(createdDirectoryName,actions)

    require('./create-file-functions/create-reducer-file')(createdDirectoryName, actions)

    if(rootReducerNeed)
        require('./create-file-functions/create-root-reducer-file')(createdDirectoryName, actions)
    
}

generate()
