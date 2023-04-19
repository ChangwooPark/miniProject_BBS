const express = require('express');
const app = express();
const router = express.Router();

let prms = {
    title : "",
    message : null,
}

router.get('/', function(req, res) {
    if(!req.session.user_id){
        res.redirect('/login');
    }
    let lastName = req.session.lastName;
    let firstName = req.session.firstName;
    let fullName = `${lastName} ${firstName}`;

    prms.title = "Main Page"
    prms.userName = fullName;
    res.render('mainBoard/main',{prms: prms});
})


module.exports = router;