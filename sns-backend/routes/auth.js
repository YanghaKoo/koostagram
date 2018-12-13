const router = require('express').Router();
const bcrypt = require('bcrypt')
const passport = require('passport')

const { User } = require('../models')

// 회원가입
router.post('/join', async (req,res,next)=>{
  const { email, nick, password } = req.body
  
  try{
    const exUser = await User.find({where : {email}})
    // 이메일이 존재하면 회원가입 시키면 안되지
    if(exUser){ 
      return res.redirect('/register')
    }

    // 이제 암호화임 여기는
    // 우선 hash화된 비밀번호를 만들자
    const hash = await bcrypt.hash(password, 12)
    await User.create({
      email,
      nick,
      password : hash
    })   
    return res.redirect('/')
  }catch(e){
    console.log(e)
    next(e)
  }
})



// 로그인정보 react 단에서 얘를 읽어 와서 로그인여부를 확인
router.get('/login',(req,res)=>{
  res.json({'user':req.user})
})

// 로그인
router.post('/login',(req,res, next)=>{    // req.body.eamil , req.body.password가 넘어오지
  
  passport.authenticate('local', (authError, user, info)=>{
    if(authError){
      console.log(authError)
      return next(authError)
    }

    if(!user){ // 로그인 에러, 유저가 없음
      return res.redirect('/')
    }

    // 성공인 경우
    return req.login(user, (loginError)=>{   // req.user에 로그인한 사용자 정보를 찾을 수 있음
      if(loginError){
        console.log(loginError)
        return next(loginError)
      }
      
      return res.redirect(`/user/${user.id}`)
    })

  })(req,res,next);
})

router.get('/logout', (req,res)=>{
  req.logout();
  req.session.destroy(); // req.user, 세션을 지워주는 거임
  res.redirect('/auth/login')
  
})



// 카카오 로그인 관련
// 이  url로 오면 카카오 전략이 실행되게 한거임, 카카오 서버가 우리대신 로그인 인증을 대신해줌
// /kakao로 가면 kakaoStrategy가 실행이 되어서 인증이 시작함 (1)
// router.get('/kakao', passport.authenticate('kakao'))
router.get('/kakao',passport.authenticate('kakao'))

// 로그인 완료되면 이 url로 응답이 오지
// (3)
router.get('/kakao/callback', passport.authenticate('kakao', {
  failureRedirect : '/'    // 로그인 실패시  
}),(req,res)=>{
  res.redirect('/')     // 성공 시
})



module.exports = router;