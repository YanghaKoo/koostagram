module.exports = (seq, dat) => (
  seq.define('comment', {
    content : {
      type : dat.STRING(50),
      allowNull : false,
      unique : false
    },
    usernick : {
      type : dat.STRING(15),
      allowNull : false,
    }
  },{
    timestamps : true,
    paranoid : true,
    charset : 'utf8',
    collate : 'utf8_general_ci',
  })
)

