module.exports = (seq, dat) => (
  seq.define('hashtag', {
    title : {
      type : dat.STRING(15),
      allowNull : false,
      unique : true
    }
  },{
    timestamps : true,
    paranoid : true,
    charset : 'utf8',
    collate : 'utf8_general_ci',
  })
)

// #노드 #익스프레스