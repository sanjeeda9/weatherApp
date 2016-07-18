var React = require('react');
var Content=require('./Content');
var movList=[];
var Head=React.createClass({
  render:function () {
    return (

      <div>
      <div id="h" >
      <h1 id="title">Weather Report</h1>
      <center><button className="btn btn-success">Home</button></center>
      </div>
      <div className="container">
          <div id="cityList">
          <Content />
          </div>
      </div>
    </div>
  );
  },
  });
module.exports = Head;
