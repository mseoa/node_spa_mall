const express = require('express');//익스프레스라는 라이브러리를 가져와서 변수에 넣고
const app = express();//익스프레스 실행을 해서 앱객체를 만들어줌
const port = 3000;
const goodsRouter = require('./routes/goods.js')
const cartsRouter = require('./routes/carts.js')

const connect = require("./schemas")
connect();

app.use(express.json()) //POST 바디데이터 사용할수 있게. 바디파서 미들웨어를 쓰기위한 문법; request 객체 안에 있는 바디를 쓰기 위해 이걸 써야한다
app.use("/api",[goodsRouter, cartsRouter])

app.post("/",(req,res)=>{
    console.log(req.body)
    res.send('기본 URI에 POST 메소드가 정상적으로 실행되었습니다.')
})



app.get("/",(req,res)=>{
    console.log(req.query)

    const obj = {
        "KeyKey" : "value 입니다",
        "이름입니다" : "이릅일까요?",
    }

    res.status(400).json(obj);
})

// get 메소드로 api를 실행할 수 있게 만들어줌
// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

app.get("/:id", (req,res)=>{
    console.log(req.params);

    res.send(":id URI에 정상적으로 반환되었습니다");
})

//localhost:3000/api -> goodsRouter
app.use("/api", goodsRouter);

//실제로 서버를 실행하는 곳은 앱 리슨. 앱객체로 익스프레스 서버를 열어봄
app.listen(port, () => {
  console.log(port, '포트로 서버가 열렸어요!');
});