
const router = require("express").Router();
const multer = require("multer");
const path = require("path");

const { Post, Hashtag, User } = require("../models");
// img는 input type=file의 id

// router.post('/', upload.single('image'), async (req,res, next)=>{
//   try{
//     const post = await Post.create({
//       content : req.body.content,               // 이걸 axios.post로 보냈잖아
//       // img : `/img/${req.body.img}`,             // 아니면 req.body.img ?? 로 해야하나
//       userId : req.user["id"]     // 왜 req.user.id는 안되지..
//     })
//     res.json(post)
//   }catch(e){
//     console.log(e)
//     next(e)
//   }
// })



// 여긴 연습이고 실제는 저기 우에꺼에다 해서 db에 주소까지 저장시키게해야함

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
  }),
})

router.post("/", upload.single('img'), async (req, res, next) => {                    // without upload.single('img'),
  console.log(req.file)
  console.log(req.body)
  try{
    const post = await Post.create({
      content : req.body.text,
      img : `/img/${req.file.filename}`,
      userId : req.user["id"]    // 왜 req.user.id는 안되지..
    })
    // 이게 새로고침이 되어서 로그인이 풀리는 듯?
    res.json(post)
  }catch(e){
    console.log(e)
    next(e)
  }
});



//기존 글만 업로드
// router.post('/',  async (req,res, next)=>{
//   try{
//     const post = await Post.create({
//       content : req.body.content,
//       userId : req.user["id"]     // 왜 req.user.id는 안되지..
//     })
//     // 이게 새로고침이 되어서 로그인이 풀리는 듯?
//     res.json(post)
//   }catch(e){
//     console.log(e)
//     next(e)
//   }
// })

module.exports = router;



// const router = require("express").Router();
// const multer = require("multer");
// const path = require("path");
// const fs = require("fs");
// const { Post, Hashtag, User } = require("../models");
// // img는 input type=file의 id

// // router.post('/', upload.single('image'), async (req,res, next)=>{
// //   try{
// //     const post = await Post.create({
// //       content : req.body.content,               // 이걸 axios.post로 보냈잖아
// //       // img : `/img/${req.body.img}`,             // 아니면 req.body.img ?? 로 해야하나
// //       userId : req.user["id"]     // 왜 req.user.id는 안되지..
// //     })
// //     res.json(post)
// //   }catch(e){
// //     console.log(e)
// //     next(e)
// //   }
// // })

// // 이거 빼놈 다시 그거 할 때 넣어야함 사진 넣을 때
// fs.readdir("uploads", error => {
//   if (error) {
//     console.error("uploads 폴더가 없어 uploads 폴더를 생성합니다.");
//     fs.mkdirSync("uploads");
//   }
// });
// // upload.single(req.files.img)


// // 여긴 연습이고 실제는 저기 우에꺼에다 해서 db에 주소까지 저장시키게해야함

// const upload = multer({
//   storage: multer.diskStorage({
//     destination(req, file, cb) {
//       cb(null, "uploads/");
//     },
//     filename(req, file, cb) {
//       const ext = path.extname(file.originalname);
//       cb(
//         null,
//         path.basename(file.originalname, ext) + new Date().valueOf() + ext
//       );
//     }
//   }),
//   // limits: { fileSize: 5 * 1024 * 1024 }
// })

// router.post("/test", upload.single('img'), async (req, res, next) => {                    // without upload.single('img'),
//   // 어레이로 하래
//   console.log(req.file)
//   console.log(req.body)
//   console.log(req.files)
//   res.send('asd')
// });



// //기존 글만 업로드
// // router.post('/',  async (req,res, next)=>{
// //   try{
// //     const post = await Post.create({
// //       content : req.body.content,
// //       userId : req.user["id"]     // 왜 req.user.id는 안되지..
// //     })
// //     // 이게 새로고침이 되어서 로그인이 풀리는 듯?
// //     res.json(post)
// //   }catch(e){
// //     console.log(e)
// //     next(e)
// //   }
// // })

// module.exports = router;