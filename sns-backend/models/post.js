module.exports = (sequelize, DataTypes) => (
  sequelize.define('post', {
    content : {
      type : DataTypes.STRING(140),
      allowNull : false
    },
    img : {     // 우리는 이미지의 주소를 올릴거기 때문에 STRING임
      type : DataTypes.STRING(150),
      allowNull: true
    }
  },{
    timestamps : true,
    paranoid : true,
    charset : 'utf8',
    collate : 'utf8_general_ci',
  })
)

