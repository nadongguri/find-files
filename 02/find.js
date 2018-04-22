const fs = require('fs');
const path = require('path');

function getTab(idx) {
  let str = '';
  let tab = '\t';
  for( let i = 0; i < idx ; ++i) {
    str = str.concat(tab);
  }
  return str;
}

async function getFilesInDir(dir, idx) {
  let files = fs.readdirSync(dir).map(file => path.resolve(dir, file));
  let searched = []
  //console.log(getTab(idx) + 'getFilesInDir --- start ' + path.basename(dir));
  for (let file of files ) {
    if(fs.lstatSync(file).isDirectory() && path.basename(file) != 'find-files') {
      let returned = await getFilesInDir(file, idx + 1);
      searched = searched.concat(returned);
    } else if (path.extname(file) == '.nidl') {
      searched = searched.concat(file);
      //console.log(getTab(idx) + 'file : ' + file);
    }
  }
  //console.log(getTab(idx) + 'getFilesInDir --- end ' + path.basename(dir) + ' ' + searched) ;
  return searched;
}

async function main(dir)
{
  const files = await getFilesInDir(dir, 0);
  console.log(files);
}

main(path.resolve('test_folder'));
