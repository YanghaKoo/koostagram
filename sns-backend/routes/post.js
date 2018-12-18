const router = require("express").Router();
const multer = require("multer");
const path = require("path");

const { Post, Hashtag, User } = require("../models");

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

router.post("/", upload.single("img"), async (req, res, next) => {
  // without upload.single('img'),
  console.log(req.file);
  console.log(req.body);
  try {
    const post = await Post.create({
      content: req.body.text,
      img: `/img/${req.file.filename}`,
      userId: req.user["id"] // 왜 req.user.id는 안되지..
    });
    // 이게 새로고침이 되어서 로그인이 풀리는 듯?
    res.json(post);
  } catch (e) {
    console.log(e);
    next(e);
  }
});

// 여기는 user에 페이지에 각각의 데이터를 뿌려주는 부분
router.post("/getNick", async (req, res, next) => {
  const { userid } = req.body;
  console.log(typeof userid);
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
      where : {id : postid}
    });
    post.getLiker().then((liker)=>{      
      console.log(liker)            
      res.json(liker)
    })

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
      where : {id : userid}
    });
    user.getFollowers().then((followers)=>{      
      console.log(followers)            
      res.json(followers)
    })

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
      where : {id : userid}
    });
    user.getFollowing().then((following)=>{      
      console.log(following)            
      res.json(following)
    })
    
  } catch (e) {
    console.log(e);
    next(e);
  }
});

module.exports = router;
