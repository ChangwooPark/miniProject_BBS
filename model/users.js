const connection = require('../model/db.js');
const { use } = require('../router/mainRouter.js');

// 회원가입
const createUser = async function(firstName, lastName, email, password){
    await connection.promise().query('INSERT INTO Users SET ?', 
        {first_Name : firstName, last_Name : lastName, email: email, password: password}, function(err, result, field) {
        try{
            if(err) {
                throw err;
            }
            console.log(result);
            return true;
        } catch(err) {
            console.log(err)
            return false;
        }
    })
}

// 아이디 중복체크 
const checkDupEmail = async function(email){
    const query = 'SELECT * FROM users WHERE email = ?';
    const [rows, fields] = await connection.promise().query(query, [email]);
    console.log(rows);
    console.log(rows.length);
    if(rows.length > 0) {
        console.log("SELECT Result is : " + JSON.stringify(rows));
        return true;
    } else {
        console.log("SELECT Result is empty");
        return false;
    }
}

let user = {}
user.createUser = createUser;
user.checkDupEmail = checkDupEmail;

module.exports = user;