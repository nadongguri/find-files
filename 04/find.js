const fs = require('fs');
const path = require('path');

async function readDir(dir) {
  return new Promise((resolve, reject) => {
    fs.readdir(dir, (error, files) => {
      if (error)
        reject(error);
      resolve(files.map((file) => {
        return path.resolve(dir, file);
      }));
    });
  });
}

async function isDir(file) {
  return new Promise((resolve, reject) => {
    fs.lstat(file, (error, stat) => {
      if (error)
        reject(error);

      if (stat && stat.isDirectory() &&
          path.basename(file) !== 'find-files' &&
          path.basename(file) !== 'node-modues')
        resolve(true);
      else
        resolve(false);
    });
  });
}

async function getFilesInDir(dir) {
  let searched = {
    dirs:[],
    files:[]
  };
  const files = await readDir(dir);
  for (let file of files ) {
    if (await isDir(file)) {
      searched.dirs.push(file);
    } else if (path.extname(file) === '.nidl') {
      searched.files.push(file);
    }
  }
  return searched;
}

async function isEmpty(dir) {
  if (dir === undefined || dir.length == 0)
    return true;
  else
    return false;
}

async function main(dir) {
  let searched = {
    dirs:[],
    files:[]
  };
  searched.dirs.push(dir);
  while (!await isEmpty(searched.dirs)) {
    const result = await getFilesInDir(searched.dirs.pop());
    searched.dirs = searched.dirs.concat(result.dirs);
    searched.files = searched.files.concat(result.files);
  }
  console.log(searched.files);
}

main(path.resolve('test_folder'));
