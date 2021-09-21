//서버 불러오는 기본 코드
const express = require('express');
const app = express();
app.use(express.urlencoded({extended: true})) 

/*
2021년 이후로 설치한 프로젝트들은 body-parser 라이브러리가 express에 기본 포함되어있어서 따로 npm으로 설치할 필요가 없으므로 아래 두 줄 대신 "app.use(express.urlencoded({extended: true}))" 써줌
const bodyParser= require('body-parser')
app.use(bodyParser.urlencoded({extended: true})) */


app.listen(8080, function(){
   console.log('listening on 8080');
});

//get 
app.get('/pet', function(req, res){
    res.send('펫 용품 쇼핑 사이트입니다');
});

//과제부분
app.get('/beauty', function(req, res){
    res.send('뷰티용품 쇼핑 사이트입니다');
});

app.get('/', function(req, res){
   res.sendFile(__dirname + '/index.html');
});

app.get('/write', function(req, res){
    res.sendFile(__dirname + '/write.html');
 });

 app.post('/add', function(req, res){
    console.log(req.body);
    res.send('전송완료')
  });