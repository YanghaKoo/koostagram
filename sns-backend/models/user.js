module.exports =  (sequelize ,DataTypes) => (
  sequelize.define('user', {
      email : {
        type : DataTypes.STRING(40),
        allowNull : false,
        unique : true,
      },
      nick : {
        type : DataTypes.STRING(15),
        allowNull : false,
      }, 
      password : {
        type : DataTypes.STRING(100),
        allowNull : true                  // 왜냐면 카카오로그인을 할 떄는 비밀번호를 따로 입력을 안하니간!
      },
      provider : {
        type : DataTypes.STRING(10),
        allowNull : false,
        defaultValue : 'local'
      },
      snsId : {       // 카카오로 로그인 시 카카오아이디를 알려줌, 그걸 저장을 하는거야, 이메일/pw로 로그인 했을 경우엔 null d이겠지
        type: DataTypes.STRING(30),
        allowNull : true
      },
      pic : {
        type : DataTypes.STRING(200),
        allowNull : true,
      }
  },{
    timestamps : true, // 얘는 생성일, 수정일 자동으로 기록해줌 시간
    paranoid : true    // 얘를 넣으면 삭제일도 기록을 해줌, 복구를 위해서
  })
)


