module.exports = (seq, dat) => (
  seq.define('hashtag', {
    title : {
      type : dat.STRING(15),
      allowNull : false,
      unique : true
    }
  },{
    timestamps : true,
    paranoid : true
  })
)

// #노드 #익스프레스