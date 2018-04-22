const fs = require('fs');
const path = require('path');

async function getFilesInDir(dir) {
  let files = fs.readdirSync(dir).map(file => path.resolve(dir, file));
  for (let file of files ) {
    if(fs.lstatSync(file).isDirectory()) {
      getFilesInDir(file);
    } else if (path.extname(file) == '.nidl') {
      console.log(file);
    }
  }
}

async function main(dir)
{
  getFilesInDir(dir);
}


main(path.resolve('test_folder'));
