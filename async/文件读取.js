const fs = require('fs')

function readfile(){
    return  new Promise((resolve, reject) => {
        fs.readFile('./笔记.md',(err,data) => {
            if(err) reject(err)
            resolve(data.toString())
        })
    })
}

async function demo(){
  const res =   await readfile()
  console.log(res);
}
demo()