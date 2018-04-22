const file = require('./file');
const path = require('path');

async function isEmpty(array) {
  if (array === undefined || array.length == 0)
    return true;
  else
    return false;
}

async function getFilesInDir(dir) {
  let dirs = [];
  let nidlfiles = [];
  let files = await file.readdir(dir);

  //resolve absolute path for all files
  files = files.map((file) => {
    return path.resolve(dir, file);
  });

  for (let f of files ) {
    const stat = await file.lstat(f);
    if (stat.isDirectory() &&
        path.basename(f) !== 'find-files' &&
        path.basename(f) !== 'node-modues') {
      dirs.push(f);
    } else if (path.extname(f) === '.nidl') {
      nidlfiles.push(f);
    }
  }

  return {
    dirs: dirs,
    files: nidlfiles
  };
}

async function main(dir) {
  let dirs = [];
  let files = [];

  dirs.push(dir);
  while (!await isEmpty(dirs)) {
    const list = await getFilesInDir(dirs.pop());
    dirs = dirs.concat(list.dirs);
    files = files.concat(list.files);
  }

  console.log(files);
}
main(path.resolve('test_folder'));
