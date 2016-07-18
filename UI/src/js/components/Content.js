var React = require('react');
var arr=["Bangalore","Chennai","Mumbai","Hyderabad","Cochin","Puducherry",
                "Kolkata",
                "Noida"];
var details=[];
var Content=React.createClass({
  getInitialState:function () {
  console.log("init");
  $.ajax({
    url:"weatherAdd/list",
    dataType:'json',
    cache:false,
    async: false,
    success:function (data) {
      details=data;
      //details.push(data);
    }.bind(this),
    error:function (x,status,err) {
      console.error(this.props.url,status,err.toString());
    }.bind(this)
      });
  return ({cities:["Bangalore","Chennai","Mumbai","Hyderabad","Cochin","Puducherry",
                  "Kolkata",
                  "Noida"],city:"",cityDetails:""});
  },
  componentWillMount:function (d) {

  },
  fetchDB:function (d) {
    //this.setState({city:d});
    var mydata;
    console.log(d);
    var url="weatherAdd/read/"+d;
    $.ajax({
      url:url,
      dataType:'json',
      cache:false,
      async: false,
      success:function (data) {
        console.log(data);
        mydata=data;
      }.bind(this),
      error:function (x,status,err) {
        console.error(this.props.url,status,err.toString());
      }.bind(this)
        });
        return (mydata);
  },
  fetchOne:function (d) {
    this.setState({cityDetails:this.fetchDB(d)});
  },
  render :function () {
    var self=this;
    var count=0;
    return(<div>{

      arr.map(function (d) {
        console.log(d);
        var temp=undefined;
        for(var i=0;i<details.length;i++){
          console.log(details[i].name);
          if(details[i].name==d){
            temp=details[i];
          }
        }
        d=temp;
        console.log(d+" "+arr[count]);
        var name=arr[count];
        count++;
        //  var list=self.fetchDB(d);
        //self.setState({cityDetails:list});
        // for(var p in list){
        //   console.log(p);
        // }
        // if(list["0"]!=undefined&&list!=[]){
        // console.log(list["0"].coord);}
      return(
          <div className="well">
            <div className="row">
                <div className="col-sm-2">
                    <h1><a href="#" onClick={(event)=>{self.fetchOne(name)}}>{name}</a></h1>
                </div>
                <div className="col-sm-7" id="fewDetails">
                  {self.display(d)}
                </div>
                <div className="col-sm-2">
                    <button className="btn btn-primary" onClick={(event)=>{self.fetchFromOnline(name)}}>Refresh</button>
                </div>
            </div>
          </div>
        );
      })
    }</div>);
  },
  display:
    function (d) {
      console.log("display "+d);
      // console.log(this.state.city);
      // var name=this.state.cityDetails.name;
      // console.log(this.state.cityDetails.name);
      // if(name!=undefined){
      //   console.log("if");
      //   return(<div><h4>Temparature : {cityDetails.main.temp}</h4>
      //               <h5>Pressure : {cityDetails.main.pressure}</h5>
      //               <h5>Humidity : {cityDetails.main.humidity}</h5>
      //   </div>);
      // }
      // else{
      if(d!=undefined){
        return(<div><h4>Temparature : {d.main.temp}</h4>
                    <h5>Pressure : {d.main.pressure}</h5>
                    <h5>Humidity : {d.main.humidity}</h5>
        </div>);
      }
    //}
    },
    fetchFromOnline:function (d) {
      var self=this;
      var mydata;
      console.log(d);
      var count=0;
      for(var i=0;i<details.length;i++){
        //console.log(details[i].name);
        if(details[i].name==d){
          count++;
        }
      }
      if(count==0){
        var url="http://api.openweathermap.org/data/2.5/weather/?q="+d+"&APPID=1c00985032b69359d3e3b5cc65c3f2a9";
        $.ajax({
          url:url,
          dataType:'json',
          cache:false,
          async: false,
          success:function (data) {
            console.log(data);
            self.setState({cityDetails:data})
            details.push(data);
            mydata=data;
          }.bind(this),
          error:function (x,status,err) {
            console.error(this.props.url,status,err.toString());
          }.bind(this)
            });
            url="localhost:8080/weatherAdd/add"
            console.log(url);
            $.ajax({
              url:url,
              type:"POST",
              dataType:'json',
              cache:false,
              async: false,
              data:mydata,
              success:function (data) {
              console.log(data);
              }.bind(this),
              error:function (x,status,err) {
                console.error(this.props.url,status,err.toString());
              }.bind(this)
                });
      }


          //this.display(d);
    }

});
module.exports = Content;
