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
  let searched = []
  const files = await readDir(dir);
  for (let file of files ) {
    if (await isDir(file)) {
      const returned = await getFilesInDir(file);
      searched = searched.concat(returned);
    } else if (path.extname(file) === '.nidl') {
      searched = searched.concat(file);
    }
  }
  return searched;
}

async function main(dir)
{
  const files = await getFilesInDir(dir);
  console.log(files);
}

main(path.resolve('test_folder'));
