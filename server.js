//서버 불러오는 기본 코드
const express = require('express');
const app = express();
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