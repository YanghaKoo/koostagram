const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const { User } = require('../models')

module.exports = (passport) => {
  
  passport.use(new LocalStrategy({
    usernameField : 'email',  // req.body.email을 뜻함
    passwordField : 'password'  // req.body.password를 뜻함
    // 그러면 콜백으로 email, password, 성공했을 때 뭐할지로 바로 이어짐, 
    // body에서 이메일/패스워드를 받아서 전략까지 이어지는거지
  }, async (email, password ,done) => {   // done(에러, 성공, 실패)  에러가 났을땐 done의 첫번째 인자로 에러를 넣어주면 됨 --> 바로 실패한거임
    try{
      
      const exUser = await User.find({where: {email}})
      if(exUser){
        //이메일이 위에서 있으면 -> 이제 비밀번호 검사
        const result = await bcrypt.compare(password, exUser.password); // result는 true나 false
        // 비밀번호를 비교할때 쓰는 bcrypt는 뭐냐면, 비밀번호를 암호화 해주는 알고리즘인데(sha512같은)
        // bcrypt로 암호화하고 bcrypt로 비교하고 할거임
        if(result){
          done(null, exUser)  // done의 성공자리에다가 사용자 정보를 넣는거야
        }else{
        done(null, false, {message : '비밀번호가 일치하지 않습니다.'})
        }   // done(에러, 성공, 실패) 이걸 잘 알아둬야 겠네
      }else{
        
        // 이메일이 없으면 실패
        done(null, false, {message : '(실패메세지)가입되지 않은 회원입니다.'})
      }
    }catch(e){
      console.log(error)
      done(error)
    }

  }))
}