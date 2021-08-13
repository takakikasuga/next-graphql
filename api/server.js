const express = require('express');
const morgan = require('morgan');

const app = express();

// リクエストの種類をログで出力する
app.use(morgan('dev'));

// リクエスト本体のデータを受け取る
app.use(express.json({ extended: false }));

console.log('process.env.API_PORT', process.env.API_PORT);
const PORT = process.env.API_PORT || 8000;

app.get('*', (req, res) => {
  res.send('接続確認テスト');
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
