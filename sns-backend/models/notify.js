// 이건 일단 안쓰고 mysql에 직접 추가하자


module.exports = (sequelize, DataTypes) => (
  sequelize.define('notify', {
    category : {      // like, comment, mention
      type : DataTypes.STRING(30),
      allowNull : false
    },
    
    // 언급하는 사람 id
    notifying : {
      type : DataTypes.INTEGER,
      allowNull : false
    },

    // 언급 당한 사람 id
    notified : {
      type : DataTypes.INTEGER,
      allowNull : false
    },      
  
    // 언급한 게시물 id
    post : {    
      type : DataTypes.INTEGER,
      allowNull: false
    },
    
    // 알림 확인
    isChecked : {
      type : DataTypes.BOOLEAN,
      allowNull : false,
      defaultValue : false
    }

  },{
    timestamps : true,
    paranoid : true,
    charset : 'utf8',
    collate : 'utf8_general_ci',
  })
)

