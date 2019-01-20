const router = require('express').Router();
const bcrypt = require('bcrypt')
const passport = require('passport')

const { User } = require('../models')

// 회원가입
router.post('/join', async (req,res,next)=>{
  const { email, nick, password } = req.body
  
  try{
    // 이미 이메일이 존재하면 회원가입 실패
    const exUser = await User.find({where : {email}})
    
    if(exUser){ 
      return res.send("email duplicate")
    }

    // 이제 암호화임 여기는
    // 우선 hash화된 비밀번호를 만들자
    const hash = await bcrypt.hash(password, 12)
    await User.create({
      email,
      nick,
      password : hash
    })   

    // 가입과 동시에 자기자신을 팔로우 하게 함
    const user = await User.find({where : { email }})
    await user.addFollowers(user.dataValues.id)
    
    // 가입과 동시에 관리자 계정을 팔로우 하게함 & 관리자가 해당 계정을 팔로우하게 함    
    //  1.18 : 관리자가 해당 계정을 팔로우만 하게 끔 수정,
    await user.addFollowers(2)
    // await user.addFollowing(2)
    
    return res.send("success")

  }catch(e){
    res.send("failure")
    console.log(e)
    next(e)
  }
})



// 로그인정보 react 단에서 얘를 읽어 와서 로그인여부를 확인
router.get('/login',(req,res)=>{
  res.json({'user':req.user})
})



// 로그인
router.post('/login', (req,res, next)=>{    // req.body.eamil , req.body.password가 넘어오지  
  console.log(req.body.email, req.body.password)

  passport.authenticate('local', (authError, user, info)=>{
    if(authError){
      console.log(authError)
      return next(authError)
    }

    if(!user){ // 로그인 에러, 유저가 없음
      return res.send("failure")
      // return res.redirect('/')
    }

    // 성공인 경우
    return req.login(user, async (loginError)=>{   // req.user에 로그인한 사용자 정보를 찾을 수 있음
      if(loginError){
        console.log(loginError)
        return next(loginError)
      }
      
      // return res.redirect(`/user/${user.id}`)

      const user = await User.find({where : {email : req.body.email}})
      console.log(user.dataValues)
      return res.json(user.dataValues)
      // return res.redirect('/feed')
    })

  })(req,res,next);
})






// 닉네임 중복 검사
router.post("/nickCheck", async (req, res, next)=>{
  try {
    const {nick} = req.body
    const user = await User.find({
      where : { nick }
    });
    user? res.send("duplicate") : res.send("ok")

  } catch (e) {
    console.log(e);
    next(e);
  }
})


router.post("/emailCheck", async (req, res, next)=>{
  try {
    const {email} = req.body
    const user = await User.find({
      where : { email }
    });
    user ? res.send("duplicate") : res.send("ok")

  } catch (e) {
    console.log(e);
    next(e);
  }
})

router.get('/logout', (req,res)=>{
  req.logout();
  req.session.destroy(); // req.user, 세션을 지워주는 거임
  res.redirect('/auth/login')
  
})

// 프론트에서 로그아웃
router.post('/logout',(req,res)=>{
  req.logout();
  req.session.destroy();
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