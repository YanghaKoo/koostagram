const express = require('express')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const path = require('path')
const session = require('express-session')
const cors = require('cors');

const passport = require('passport')
require('dotenv').config()      // .env를 쓸 수 있게

const indexRouter = require('./routes/index')          // index 페이지 라우터
const authRouter = require('./routes/auth')
const postRouter = require('./routes/post')

const {sequelize} = require('./models')
const passportConfig = require('./passport')

const app = express();
sequelize.sync()
passportConfig(passport)    

app.set('port', process.env.PORT || 8001)
app.use(cors());

app.use(morgan('dev'))
app.use(express.static(path.join(__dirname,'public')))
app.use('/img', express.static(path.join(__dirname,'uploads')))     // /img/abc.png 로 해야 uploads의 폴더로 접근 할 수 있음

app.use(express.json());
app.use(express.urlencoded({extended : false}))

app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(session({
  resave : false,
  saveUninitialized : false,
  secret : process.env.COOKIE_SECRET,      // 쿠키 비번과 같게
  cookie : {
    httpOnly : true,
    secure : false
  }
}))

app.use(passport.initialize());
app.use(passport.session());

app.use('/',indexRouter)
app.use('/auth',authRouter)
app.use('/post',postRouter)


app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});


app.listen(app.get('port'), ()=>{
  console.log(`${app.get('port')} port connected!`)
})