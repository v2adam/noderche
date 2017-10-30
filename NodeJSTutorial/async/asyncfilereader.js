const fs = require('fs')

console.log('start reading a file...')

fs.readFile('filter.js', 'utf-8', function(err, content){
  if(err){
    return console.log('error happened during reading the file')
    return console.log(err)
  }

  console.log(content)
})

console.log('end of the file')