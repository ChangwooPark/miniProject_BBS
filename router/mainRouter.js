const express = require('express');
const router = express.Router();
const session = require('express-session');
const bcrypt = require('bcrypt');

const db_user = require('../model/users.js');

const SALT_ROUNDS = 10;



// Main Page, if user doesn't have session redirect to login page
router.get('/', function(req, res){
    if(req.session){
        res.render('index', {title: "index"});
    } else {
        res.redirect('/login')
    }
})

// Login Page
router.get('/login', function(req, res) {
    res.render('login/login', {title: "Login Page"});
})

// Login Page
router.get('/regist', function(req, res) {
    res.render('login/regist', {title: "Regist Page"});
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
            res.send({success:200, data:"Password!"})
            loginFlag = false;
            console.log("Password!")
        }

        // 이미 가입된 이메일이 있는경우
        if(db_user.checkDupEmail(email)){
            res.send({success:200, data:"Email!"})
            loginFlag = false;
            console.log("Email!")
        }

        if(loginFlag){
            let hash = await bcrypt.hash(password_1, SALT_ROUNDS);

            let result = db_user.createUser(firstName,lastName,email,hash);
            console.log("회원가입!")
            res.send({success:200, data:"회원가입 완료"})
        }
    } catch(e){
        console.log(e);
    }
    
})



module.exports = router;