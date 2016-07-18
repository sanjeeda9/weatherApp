var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

var Master = require('./pages/Master/Master');
var Head=require('./components/Head');
module.exports = (
<Route>
        <Route handler={Master}>
           <DefaultRoute handler={Head} name="Home"/>
        </Route>
</Route>
);
