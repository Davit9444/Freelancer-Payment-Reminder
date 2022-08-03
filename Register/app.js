const express = require('express');
const path = require('path');
const authRouter = require('./routes/auth-router');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const appErrorHandler = require('./errors/appErrorHandler');

const app = express();

app.set('view engine', 'ejs');
app.set('views',path.resolve('views'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.resolve('public')));
app.use(cookieParser(process.env.COOKIE_PARSER));
app.use(session({
    secret: process.env.COOKIE_PARSER,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: false,
        maxAge: 400000
    }
}))

app.use('/auth',authRouter);



app.get('/',(req,res) => {
    res.sendFile(path.resolve('public/main.html'));
});
app.get('/auth/home',(req,res) => {
    res.sendFile(path.resolve('public/home.html'));
});
app.use((req,res) => {
    res.status(404).sendFile(path.resolve('public/404.html'));
});



app.use(appErrorHandler);


app.listen(process.env.PORT || 3000);

