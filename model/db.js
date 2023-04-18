const mysql = require('mysql2');

// MySQL 서버와 연결을 생성합니다.
const connection = mysql.createConnection({
  host: '127.0.0.1', // MySQL 서버 호스트명
  user: 'root', // MySQL 사용자 이름
  password: 'password', // MySQL 사용자 비밀번호
  database: 'BulletBoard' // 사용할 데이터베이스 이름
});

// MySQL 서버와 연결합니다.
connection.connect(function(err) {
  if (err) {
    throw err
  } 
  console.log('Connected!');
});

module.exports = connection;