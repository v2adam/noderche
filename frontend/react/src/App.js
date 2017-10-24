import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Route, Switch, withRouter } from 'react-router'

import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';

import './index.css';
import LoginContainer from './containers/loginContainer';
import About from './components/about';
import DummyPage1 from './components/dummyPage1';
import PageNotFound from './components/pageNotFound';
import Home from './components/home';
import Header from './containers/header';
import Dummy2Container from './containers/dummy2Container';
import RegisterContainer from './containers/registerContainer';
import SecretContainer from './containers/secretContainer';
import PrivateRoute from './misc/privateRoute';
import UrlParamComponent from './components/urlParamComponent';
import CommentDisplay from './components/statelessComponent';
import ChartDemoContainer from './containers/chartDemoContainer';
import MapDemoContainer from './containers/mapDemoContainer';
import FirstExampleMain from './containers/firstExample/pageContainer';

//olyan mint az angularban az app.component
//ez a főkomponens, ide rakni a route-okat
//ez az app, innen renderelődnek a különböző page-k a route-ok alapján
class App extends Component {


  render() {
    return (
      <div>
        <Header/>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/login' component={LoginContainer}/>
          <Route path='/register' component={RegisterContainer}/>
          <Route path='/about' component={About}/>
          <Route path='/dummy1' component={DummyPage1}/>
          <Route path='/dummy2' component={Dummy2Container}/>
          <PrivateRoute path="/secret" component={SecretContainer}
                        isAuthenticated={this.props.isAuthenticated}/>
          <Route path='/asd' component={CommentDisplay} valami='itt'/>
          <Route path='/chartdemo' component={ChartDemoContainer}/>
          <Route path='/mapdemo' component={MapDemoContainer}/>
          <PrivateRoute path="/firstexample" component={FirstExampleMain}
                        isAuthenticated={this.props.isAuthenticated}/>
          <Route path="/valami/:id"
                 component={UrlParamComponent}/> {/* url-ben átadható paraméter*/}


          <Route component={PageNotFound}/>
          {/* <Redirect from='/new_path' to='/new_path' /> lehet ilyet is belerakni*/}

        </Switch>
      </div>
    );

  }
}

// ezzel lehet rákapcsolódni a store-ra, és kinyerni belőle az állapotokat
function mapStateToProps(state) {
  return {
    isAuthenticated: state.currentUser.isAuthenticated,
  };
}


// ezzel érem el az action-öket
function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

// ezzel a kiajánlással egy store-ral összekötött komponensem lesz (smart componenet) => container !!!!
// alapból ez szokott kelleni: export default connect(mapStateToProps, mapDispatchToProps)(App);
// a with router miatt működik a navigálás
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
