//서버 불러오는 기본 코드
const express = require('express');
const app = express();
app.use(express.urlencoded({extended: true})) 

//mongodb 연결
var db;
const MongoClient = require('mongodb').MongoClient
MongoClient.connect('mongodb+srv://jeongin:wjddls0307@cluster0.u06t4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', function(에러, client){
if(에러){
    return console.log(에러)
}
db = client.db('todoapp');

//ejs 설치
app.set('view engine', 'ejs');

//css 파일 추가
app.use('/public', express.static('public'));

//db에 자료 저장하기
//저장할 자료는 object 형식으로 ex) {이름: 'Test', 나이: 20}
/*db.collection('post').insertOne({이름: 'John', 나이: 20, _id: 100}, function(에러, 결과){ //post라는 collection에 insertOne
    console.log('저장완료');
});*/

//연결 성공시
app.listen(8080, function(){
        console.log('listening on 8080');
     });


//숙제: 어떤 사람이 /add라는 경로로 post 요청을 하면, data 2개를 보내주는데 (제목, 날짜 데이터) 이때 post라는 이름을 가진 collection에 두 개 데이터 저장하기
//{ 제목: '어쩌구', 날짜: '어쩌구'}
app.post('/add', function(req, res){
    db.collection('counter').findOne({ name: '게시물개수'}, function(err, result){
        var totalPost = result.totalPost;
    db.collection('post').insertOne({제목: req.body.title , 날짜: req.body.date, _id: totalPost + 1}, function(에러, 결과){ //post라는 collection에 insertOne
        //counter collection의 totalPost도 1 증가시키기
        //1. 어떤 데이터를 수정할지, 수정값(operator: ~), function()
        db.collection('counter').updateOne({name:'게시물개수'}, { $inc : {totalPost:1} }, function(err, result){
            if(err){
                console.log(err)
            }
        res.send("제목: " + req.body.title + " 날짜: " + req.body.date + "\n저장 완료");

        })
    });
   });;
});

});
/*
2021년 이후로 설치한 프로젝트들은 body-parser 라이브러리가 express에 기본 포함되어있어서 따로 npm으로 설치할 필요가 없으므로 아래 두 줄 대신 "app.use(express.urlencoded({extended: true}))" 써줌
const bodyParser= require('body-parser')
app.use(bodyParser.urlencoded({extended: true})) */

//get 
app.get('/pet', function(req, res){
    res.send('펫 용품 쇼핑 사이트입니다');
});

//과제부분
app.get('/beauty', function(req, res){
    res.send('뷰티용품 쇼핑 사이트입니다');
});

app.get('/', function(req, res){
    res.render('index.ejs');
});

app.get('/write', function(req, res){
    res.render('write.ejs');
});

 //list를 get 요청으로 접속하면 (실제 db에 저장된 데이터들로 예쁘게 꾸며진) html을 보여줌
 app.get('/list', function(req, res){
     db.collection('post').find().toArray(function(err, result){
         console.log(result);
        res.render('list.ejs', { posts: result });
     });
     //db에 저장된 post라는 collection 안의 모든 데이터를 꺼내주세요
 })

 app.delete('/delete', function(req, res){
    console.log(req.body);
    req.body._id = parseInt(req.body._id); //id가 string으로 넘어가서 int로 변환해줌
    //req.body에 담겨온 게시물 번호를 가진 글을 db에서 찾아서 삭제해주세요
    db.collection('post').deleteOne(req.body, function(err, result){
        console.log('삭제완료');
        res.status(200).send({ message : "성공했습니다"});
    })
 })

 app.get('/detail/:id', function(req, res){
    db.collection('post').findOne({ _id : parseInt(req.params.id) }, function(err, result){
        if(err){
            console.log(err)
        }
        console.log(result);
        res.render('detail.ejs', { data : result });
    })
 })