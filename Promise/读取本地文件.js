const fs = require('fs');

fs.readFile('./笔记.md', (err, data) => {
    if(err) throw err
    console.log(data.toString())
})

