const express = require('express');
const app = express();
const ejs = require('ejs'); // ejs모듈
const expressLayouts = require('express-ejs-layouts'); // ejs 모듈화

// =========================== MidleWare ===========================//

app.set('view engine', 'ejs'); 
app.set('views', './views');

app.use(express.static('public')); // 루트 디렉터리 지정

// router모듈 사용을 위한 미들웨어 지정
app.use(express.json()); 
app.use(express.urlencoded());
// ejs모듈화를 위한 미들웨어 지정
app.use(expressLayouts);
app.set('layout','layout');
app.set('layout extractScripts', true);


// =========================== Route ===========================//

// mainRouter import 
const mainRouter = require('./router/mainRouter')
app.use('/', mainRouter)

app.listen(3000, function(req, res) {
    console.log("Server Started");
})