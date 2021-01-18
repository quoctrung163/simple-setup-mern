import express from 'express';
import devBundle from './devBundle';
import template from './../template';
import path from 'path';
import { MongoClient } from 'mongodb';

const app = express();

const port = process.env.PORT || 3000;
const CURRENT_WORKING_DIR = process.cwd();
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/mernSimpleSetup';

MongoClient.connect(url, (err, db) => {
  console.log(`Connected successfully to mongodb server`);
  db.close();
})

app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR,
  'dist')));
devBundle.compile(app);

app.get('/', (req, res) => {
  res.status(200).send(template())
});

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
  console.info(`Server started on port ${port}`);
});