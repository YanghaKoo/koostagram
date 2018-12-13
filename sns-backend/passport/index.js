const local = require('./localStrategy')
const kakao = require('./kakaoStrategy')
const {User} = require('../models')

module.exports = (passport) => { 
  passport.serializeUser( (user,done) => {  
    // 세션에 모든정보가 아닌 id만 저장하겠다. 그게 시리얼라이즈 유저
    done(null, user.id)
  })

  // 지금 현재 메모리에서는 id:1만 저장되어 있음,
  // 매개변수인 id에 그 id가 저장되어 있음
  // 그 id만 있는 정보를 다시 db를 돌려서 원래의 정보로 돌려놓는거임
  passport.deserializeUser( (id, done) =>{

    User.find({where : {id}})
      .then(user=>done(null,user))
      .catch(e=>done(e))
  })

  //2가지의 전략
  local(passport)
  kakao(passport)
}