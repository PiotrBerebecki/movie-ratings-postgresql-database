const path = require('path');
const fs = require('fs');

const getDataFromDatabase = require('./database');


const handlers = {};


handlers.serveLanding = (req, res) => {
  fs.readFile(path.join(__dirname, '..', 'public', 'index.html'), (err, file) => {
    if (err) {
      handlers.serveNotFound(req, res);
      return;
    }

    res.writeHead(200, { 'content-type': 'text/html' });
    res.end(file);
  });
};


getContentType = (url) => {
  const extension = path.extname(url);
  const extensionType = {
    '.css' : 'text/css',
    '.html' : 'text/html',
    '.ico' : 'image/x-ico',
    'json' : 'applictation/json'
  };
  return extensionType[extension];
};


handlers.serveAssets = (req, res) => {
  fs.readFile(path.join(__dirname, '..', 'public', req.url), (err, file) => {
    if (err) {
      handlers.serveNotFound(req, res);
      return;
    }

    res.writeHead(200, { 'content-type': getContentType(req.url) });
    res.end(file);
  });
};


handlers.serveData = (req, res) => {
  getDataFromDatabase(req.url, (dbError, dbResponse) => {
    let dataToSend;
    if (dbError) {
      dataToSend = [{error: 'no data'}];
    } else {
      dataToSend = dbResponse.rows;
    }
    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(JSON.stringify(dataToSend));
  });
};


handlers.serveNotFound = (req, res) => {
  res.writeHead(404, { 'content-type': 'text/html' });
  res.end('<h1>Page Not Found 😩</h1>');
};


module.exports = handlers;
