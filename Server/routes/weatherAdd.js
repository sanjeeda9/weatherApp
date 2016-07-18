var express=require('express');
var app=express.Router();
var weather=require('../models/weatherSchema');

//Create
app.post('/add',function (req,res) {
  console.log("enter");
  var id=req.body;
  console.log(id);
    var m1=new weather(id);
  m1.save(function (err,data) {
    if(err) throw err;
    else{
      console.log(data.name);
      console.log("inserted");}
    res.send("success");
  });
});
//find all
app.get('/list',function(req,res){
  weather.find({},function(err,data){
    if(err) throw err;
    else{
      res.json(data);
    }
  });
});
//Read
app.get('/read/:id',function (req,res) {
  var id=req.params.id;
  console.log(id);
  weather.find({name:id},function (err,data) {
      if(err) throw err;
      else{
        res.json(data);
      }
  });
});
app.delete('/delete/:id',function (req,res) {
  console.log("inside delete");
  var id=req.params.id;
  //id=req.body;
  weather.findOneAndRemove({_id:id},function (err) {
    if(err) throw err;
      console.log("deleted");
      res.send("deleted")
  });
});
module.exports=app;
