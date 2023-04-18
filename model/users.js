const connection = require('../model/db.js');
const { use } = require('../router/mainRouter.js');

// 회원가입
const createUser = function(firstName, lastName, email, password){
    connection.query('INSERT INTO Users SET ?', 
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
    await connection.promise().query(query, [email], function(err, result, field) {
        try{
            if(err) {
                throw err;
            }
            console.log("SELECT Result is : " + JSON.stringify(result));
            return true;
        } catch(err) {
            console.log(err)
            return false;
        }
    })

}

let user = {}
user.createUser = createUser;
user.checkDupEmail = checkDupEmail;

module.exports = user;