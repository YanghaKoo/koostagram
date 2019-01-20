const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const Sequelize = require("sequelize");

const { Post, Hashtag, User, Comment } = require("../models");

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "uploads/");
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(
        null,
        path.basename(file.originalname, ext) + new Date().valueOf() + ext
      );
    }
  })
});

// 글 작성
router.post("/", upload.single("img"), async (req, res, next) => {  
  try {
    const post = await Post.create({
      content: req.body.text,
      img: `/img/${req.file.filename}`,
      userId : req.body.id
      // userId: req.user["id"]
    });

    // 해쉬태그 db에 추가
    // const hashtags = req.body.text.match(/#[^\s]*/g);
    const hashtags = req.body.text.match(/#[^(\s|#)]*/g);
    if (hashtags) {
      const result = await Promise.all(
        hashtags.map(tag =>
          Hashtag.findOrCreate({
            where: { title: tag.slice(1).toLowerCase() }
          }).catch(e => {
            console.log(e);
          })
        )
      );
      await post.addHashtags(result.map(r => r[0]));      
    }
    
    
    res.json(post);
  } catch (e) {
    
    console.log(e);
    res.send('failure')
    next(e);
  }
});



// 프로필사진 변경 ///////////////////
router.post("/profile", upload.single("img"), async (req, res, next) => {
  console.log(req.file.filename);
  const { userid } = req.body;

  try {
    const user = await User.update(
      { pic: `/img/${req.file.filename}` },
      { where: { id: userid } }
    );
    console.log(user);
    res.send("success");
  } catch (e) {
    console.log(e);
    next(e);
  }
});



// 여기는 user에 페이지에 각각의 데이터를 뿌려주는 부분
router.post("/getNick", async (req, res, next) => {
  const { userid } = req.body;
  try {
    const info = await User.findOne({
      where: { id: userid }
    });
    res.send(info.dataValues.nick);
  } catch (e) {
    console.log(e);
    next(e);
  }
});

// 게시물 여러개 (layout) 받아오기 , /user/1
router.post("/getPosts", async (req, res, next) => {
  const { userid } = req.body;
  try {
    const info = await Post.findAll({
      where: { userId: userid }
    });
    res.json(info);
  } catch (e) {
    console.log(e);
    next(e);
  }
});

router.post("/getSinglePost", async (req, res, next) => {
  const { postid } = req.body;
  try {
    const info = await Post.findOne({
      where: { id: postid }
    });
    res.json(info);
  } catch (e) {
    console.log(e);
    next(e);
  }
});

// 좋아요
router.post("/like", async (req, res, next) => {
  const { userid, postid } = req.body;
  try {
    const post = await Post.find({ where: { id: postid } });
    await post.addLiker(userid);
  } catch (e) {
    console.log(e);
    next(e);
  }
});

//좋아요 취소
router.post("/unlike", async (req, res, next) => {
  const { userid, postid } = req.body;
  try {
    const post = await Post.find({ where: { id: postid } });
    await post.removeLiker(userid);
  } catch (e) {
    console.log(e);
    next(e);
  }
});

// 게시물의 like 수 가져오기
router.post("/getLikeCount", async (req, res, next) => {
  const { postid } = req.body;
  try {
    const post = await Post.find({
      where: { id: postid }
    });
    post.getLiker().then(liker => {
      console.log(liker);
      res.json(liker);
    });
  } catch (e) {
    console.log(e);
    next(e);
  }
});

// follow
router.post("/follow", async (req, res, next) => {
  const { userid, followid } = req.body;
  try {
    const user = await User.find({ where: { id: userid } });
    await user.addFollowers(followid);
  } catch (e) {
    console.log(e);
    next(e);
  }
});

// follow 취소
router.post("/unfollow", async (req, res, next) => {
  const { userid, followid } = req.body;
  try {
    const user = await User.find({ where: { id: userid } });
    await user.removeFollowers(followid);
  } catch (e) {
    console.log(e);
    next(e);
  }
});

// follower 가져오기(날 팔로우 하는 애들)
router.post("/getFollowers", async (req, res, next) => {
  const { userid } = req.body;
  try {
    const user = await User.find({
      where: { id: userid }
    });
    user.getFollowers().then(followers => {
      console.log(followers);
      res.json(followers);
    });
  } catch (e) {
    console.log(e);
    next(e);
  }
});

// following 가져오기(내가 팔로우하는 애들)
router.post("/getFollowing", async (req, res, next) => {
  const { userid } = req.body;
  try {
    const user = await User.find({
      where: { id: userid }
    });
    user.getFollowing().then(following => {
      console.log(following);
      res.json(following);
    });
  } catch (e) {
    console.log(e);
    next(e);
  }
});

// following 하는 feed 가져오기
router.post("/getFollowingPosts", async (req, res, next) => {
  const { userid } = req.body;

  try {
    const user = await User.find({
      where: { id: userid }
    });
    let following = await user.getFollowing();
    following = following.map(item => item.id);

    // 팔로우가 없거나 게시물이 없는 경우
    if (!following[0]) {
      res.send("no data");
      return;
    }

    try {
      const post = await Post.findAll({
        where: {
          userId: {
            [Sequelize.Op.or]: following
          }
        }
      });

      res.json(post);
    } catch (e) {
      console.log(e);
      next(e);
    }
  } catch (e) {
    console.log(e);
    next(e);
  }
});

// 추천 팔로우 계정 찾기용 모든 유저 데이터 가져오기
router.post("/getAllUser", async (req, res, next) => {
  try {
    const user = await User.findAll();
    res.json(user);
  } catch (e) {
    console.log(e);
    next(e);
  }
});

// 프사 가져오기
router.post("/getUserPic", async (req, res, next) => {
  try {
    const { userid } = req.body;
    const user = await User.find({ where: { id: userid } });
    res.send(user.dataValues.pic);
  } catch (e) {
    console.log(e);
    next(e);
  }
});

// hashtag query로 접근할 때
router.post("/getHashTagPost", async (req, res, next) => {
  try {
    const { tag } = req.body;
    console.log(tag);
    const hashtag = await Hashtag.find({ where: { title: tag } });

    if (hashtag) {
      const post = await hashtag.getPosts();
      console.log(post);
      res.json(post);
    } else {
      res.send("no data");
    }
  } catch (e) {
    console.log(e);
    next(e);
  }
});

// 댓글 등록
router.post("/uploadComment", async (req, res, next) => {
  try {
    const { usernick, postid, content } = req.body;              
    const comment = await Comment.create({
      content: content,
      postId: postid,
      usernick: usernick
    })
    
    const post = await Post.find({where : { id : postid}})
    
    // 해쉬태그 db에 추가
    const hashtags = content.match(/#[^(\s|#)]*/g);
    if (hashtags) {
      const result = await Promise.all(
        hashtags.map(tag =>
          Hashtag.findOrCreate({
            where: { title: tag.slice(1).toLowerCase() }
          }).catch(e => {
            console.log(e);
          })
        )
      );
      await post.addHashtags(result.map(r => r[0]));      
    }

    res.send("success")
  } catch (e) {
    console.log(e);
    next(e);
  }
});

router.post("/getComments", async (req, res, next) => {
  try {
    const { postid } = req.body;
    const comments = await Comment.findAll({ where: { postId: postid } });
    res.send(comments);
  } catch (e) {
    console.log(e);
    next(e);
  }
});

router.post("/getIdByNick", async (req, res, next) => {
  try {
    const { nick } = req.body;
    const id = await User.findOne({ where: { nick: nick } });
    res.send(id);
  } catch (e) {
    console.log(e);
    next(e);
  }
});

// 헤더에서 검색기능 구현, 유저와 해쉬태그를 모두 검색해줌
router.post("/search", async (req, res, next) => {
  try {
    const { input } = req.body;
    const results = {}

    // 유저를 검색해줌
    const uresults = await User.findAll({
      where: {
        nick: {
          [Sequelize.Op.like]: "%" + input + "%"
        }
      }
    });

    // 해쉬태그를 검색해줌
    const hresults = await Hashtag.findAll({
      where: {
        title: {
          [Sequelize.Op.like]: "%" + input + "%"
        }
      }
    });

    results.user = uresults
    results.hashtag = hresults

    res.send(results);
  } catch (e) {
    console.log(e);
    next(e);
  }
});


//delete post
router.post("/deletePost", async (req, res, next) => {
  try {
    const { postid } = req.body;
    const id = await Post.destroy({ where: { id: postid } });        
    res.send(toString(id));
  } catch (e) {
    console.log(e);
    next(e);
  }
});



module.exports = router;
