## Moving Ratings PostgreSQL Database


### Setup PostgreSQL on Heroku

1. create heroku app and push it to Heroku

1. create database on heroku or using herok cli
https://elements.heroku.com/addons/heroku-postgresql
https://devcenter.heroku.com/articles/heroku-postgresql#create-a-new-database

1. try accessing database from command line using psql
```
psql databaseUrlhere
```
https://devcenter.heroku.com/articles/heroku-postgresql#pg-psql

```sql
CREATE TABLE movies (
  id       SERIAL PRIMARY KEY,
  title    VARCHAR(100) NOT NULL
);

INSERT INTO movies(title) VALUES
  ('Matrix'),
  ('Terminator')
RETURNING ID;
```

1. Set up back end to connect to Heroku database
https://devcenter.heroku.com/articles/heroku-postgresql#connecting-in-node-js
