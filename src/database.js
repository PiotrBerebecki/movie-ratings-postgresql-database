const dbConnection = require('./database_connection');
const pipe = require('./helpers');

const getSqlQuery = (urlQuery) => {
  const sqlQueries = {
    movies: `SELECT * title FROM movies`
  };
  return sqlQueries[urlQuery];
};


const getUrlQuery = (url) => url.split('/')[2];


const getDataFromDatabase = (url, handlerCallback) => {
  const sqlQuery = pipe(getUrlQuery, getSqlQuery)(url);

  if (!sqlQuery) {
    handlerCallback('Query not found');
    return;
  }

  dbConnection.query(`SELECT title FROM movies`, (err, res) => {
    if (err) {
      handlerCallback(err);
    } else {
      handlerCallback(err, res);
    }
  });
};


module.exports = getDataFromDatabase;
