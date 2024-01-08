const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = process.env.PORT || 3000; // Renderが提供するポートを使用

// SQLiteデータベースの初期化
const db = new sqlite3.Database('database.db');

// テーブルの作成
db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS attendances (userName TEXT, date TEXT, time TEXT, type TEXT)");
});

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({ secret: 'your_secret_key', resave: false, saveUninitialized: true }));

// 名前の入力と勤怠データ取得
app.post('/attendances', (req, res) => {
  const { userName, date, time, type } = req.body;

  // ユーザー名をセッションに保存
  req.session.userName = userName;

  // 勤怠データをデータベースに保存
  db.run("INSERT INTO attendances (userName, date, time, type) VALUES (?, ?, ?, ?)", [userName, date, time, type], (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      res.send('OK');
    }
  });
});

// 勤怠データの取得
app.get('/attendances', (req, res) => {
  const userName = req.session.userName;

  if (!userName) {
    res.status(401).send('Unauthorized');
    return;
  }

  // ユーザーの勤怠データを取得
  db.all("SELECT userName, date, time, type FROM attendances WHERE userName = ?", [userName], (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(rows);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
