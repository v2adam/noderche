const fs = require('fs')

console.log('start reading a file...')

let content
try{
  content = fs.readFileSync('filter.js', 'utf-8')
}catch(ex){
  console.log(ex)
}

console.log(content)

console.log('end of the file')