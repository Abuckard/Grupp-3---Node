import nedb from 'nedb-promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const usersDB = nedb.create({
  filename: path.join(__dirname, 'users.db'),
  autoload: true
});

const orderHistoryDB = nedb.create({
  filename: path.join(__dirname, 'orderhistory.db'),
  autoload: true
});

export { usersDB, orderHistoryDB };