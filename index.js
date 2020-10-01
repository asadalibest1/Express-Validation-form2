const express = require('express');
const app = express();

const {check, validationResult} = require('express-validator/check');
const {matchedData} = require('express-validator/filter');

app.set('views', './');
app.set('view engine', 'twig')

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
// bodyParser.json();

app.get('/', (req, res)=>{
    res.render('app', {header: 'Form Validation'});
});
// app.post('/', (req, res)=>{
//     console.log(matchedData());
// })
app.post('/', [
    check('email', 'error acurred in email').trim().isEmail().normalizeEmail(),
    check('password', 'Password must be greater then 10').trim().isLength({min: 10}),
    check('rePassword').custom((val, {req})=>{
        if(val !== req.body.password)
            throw new Error("Password did't match!");
        else
            return true;
    })
] ,(req, res)=>{
const Errors = validationResult(req);
var data = matchedData(req);
    if (!Errors.isEmpty())
        res.render('app', {errors: Errors.mapped(), Data: data, header: 'Form Validation'});
    else
        res.render('app', {Data: data, header: 'Form Validation'});
})


app.listen(4000, ()=> console.log("your server is running on http//localhost:4000"));