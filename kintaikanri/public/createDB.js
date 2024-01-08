const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');

// テーブルの作成
const createTables = () => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run("CREATE TABLE IF NOT EXISTS attendances (userName TEXT, date TEXT, time TEXT, type TEXT)", (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  });
};

createTables()
  .then(() => {
    console.log('Tables created successfully');
    db.close();
  })
  .catch((error) => {
    console.error('Error creating tables:', error);
    db.close();
  });