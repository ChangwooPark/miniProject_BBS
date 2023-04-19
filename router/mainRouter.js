const express = require('express');
const app = express();
const router = express.Router();
const bcrypt = require('bcrypt');

const db_user = require('../model/users.js');
const { render } = require('ejs');

const SALT_ROUNDS = 10;

let prms = {
    title : "",
    message : null,
}


// Main Page, if user doesn't have session redirect to login page
router.get('/', function(req, res){
    if(req.session.user_id){
        prms.title = "Login Page";
        res.render('index', {prms: prms});
    } else {
        res.redirect('/login')
    }
})

// Login Page
router.get('/login', function(req, res) {
    prms.title = "Login Page"
    res.render('login/login', {prms: prms});
})

// Login Process
router.post('/login', async function(req, res) {
    let email = req.body.email;
    let password = req.body.password;
    let loginOK = false;
    let result = await db_user.checkPassword(email);
    console.log("result : " + result.email);
    if(result){
        loginOK = await bcrypt.compare(password, result.password); // bcript로 DB 패스워드와 Input 패스워드 비교
        console.log("loginOK : " + loginOK)
    }
    if(loginOK) {
        req.session.user_id = result.email;
        req.session.user_firstName = result.firstName;
        req.session.user_lastName = result.lastName;
        res.redirect('/main');
    }
})

// regist Page
router.get('/regist', function(req, res) {
    prms.title = "Regist Page"
    prms.message = null;
    res.render('login/regist', {prms: prms});
})

// regist process
router.post('/regist', async function(req, res) {
    try{
        let loginFlag = true;
        let firstName = req.body.firstName;
        let lastName = req.body.lastName;
        let email = req.body.email;
        let password_1 = req.body.password_1;
        let password_2 = req.body.password_2;

        // 확인용 패스워드가 다른경우
        if(password_1 !== password_2){ 
            prms.title = "Reigst Page";
            prms.message = "Please Check Password!";
            res.render('login/regist', {prms: prms})
            console.log("Password check error!!")
            loginFlag = false;
        }

        const isDuplicated = await db_user.checkDupEmail(email);
        if(isDuplicated){ // 이미 가입된 이메일이 있는경우
            prms.title = "Reigst Page";
            prms.message = "Email is already exist!";
            res.render('login/regist', {prms: prms})
            console.log("Email Duplicated")
            loginFlag = false;
        } 

        console.log("loginFlag : " + loginFlag)
        if(loginFlag == true){
            let hash = await bcrypt.hash(password_1, SALT_ROUNDS);

            let result = await db_user.createUser(firstName,lastName,email,hash);
            console.log("회원가입!")
            res.redirect("/registComplete");
        }
    } catch(e){
        console.log(e);
    }
})

// regist Complete
router.get("/registComplete", function(req, res) {
    prms.title = "Regist Complete"
    res.render("login/registComplete", {prms, prms})
})



module.exports = router;