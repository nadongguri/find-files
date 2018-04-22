const fs = require('fs');

async function lstat(path) {
  return new Promise((resolve, reject) => {
    fs.lstat(path, (error, stat) => {
      if (error) {
        reject(error);
      }
      resolve(stat);
    });
  });
}

async function read(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (error, data) => {
      if (error) {
        reject(error);
      }
      resolve(data);
    });
  });
}

async function readdir(path) {
  return new Promise((resolve, reject) => {
    fs.readdir(path, (error, files) => {
      if (error) {
        reject(error);
      }
      resolve(files);
    });
  });
}

async function write(path, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, 'utf8', (error) => {
      if (error) {
        reject(error);
      }
      resolve();
    });
  });
}

module.exports = {
  lstat: lstat,
  read: read,
  readdir: readdir,
  write: write
};
