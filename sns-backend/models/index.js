const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(
  config.database, config.username, config.password, config,
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// 모델들 가져오기
db.User = require('./user')(sequelize, Sequelize)
db.Post = require('./post')(sequelize, Sequelize)
db.Hashtag = require('./hashtag')(sequelize, Sequelize)

// ***관계 설정***
// 얘네는 1:다 관계, 유저는 포스트가 여러개고 포스트는 하나의 유저만 갖고
db.User.hasMany(db.Post)
db.Post.belongsTo(db.User)

// 그런데 포스트와 해쉬태그는 다:다 관계지
// 다대다 관계는 서로를 belongsToMany 해주면 됨. 그리고 다대다 관계가 설정되면 새로운 모델(테이블)이 생김 그게 뒤의 through
db.Post.belongsToMany(db.Hashtag, {through : 'PostHashtag'});
db.Hashtag.belongsToMany(db.Post, {through : 'PostHashtag'});

// 그 다음, 팔로잉, 팔로워 관계 이것도 다대다 관계임 같은 테이블 
// 포린키는 상대의 ID as는 매칭 모델 이름?
// as와 foreingKey는 반대겠지 서로
db.User.belongsToMany(db.User, {through : 'Follow', as : "Followers", foreignKey : 'followingId'}); // 얘가 일반인들팔로우 하는애들
db.User.belongsToMany(db.User, {through : 'Follow', as : "Following", foreignKey : 'followerId'});  // 얘가 유명한사람


// 게시글 좋아요 및 취소 기능
// 한사람이 여러개를 좋아요 할 수 있고, 하나의 게시글에 좋아요가 여러개 달릴수 있음 --> 다대다
// 사용자와 게시글간의 좋아요라는 다대다 관계가 맺어지는 거지
db.User.belongsToMany(db.Post, {through : 'Like'})
db.Post.belongsToMany(db.User, {through : 'Like', as :"Liker"})


// 댓글 기능 다대다
db.User.belongsToMany(db.Post, {through : "Comment"})
db.Post.belongsToMany(db.User, {through : "Comment"})

module.exports = db;
