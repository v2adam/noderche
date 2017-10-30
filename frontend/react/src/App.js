import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Route, Switch, withRouter } from 'react-router'

import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import './index.css';
import Sign from './scenes/Sign'
import DummyPage1 from './components/dummyPage1';
import PageNotFound from './scenes/PageNotFound';
import Home from './components/home';
import Header from './containers/header';
import Dummy2Container from './containers/dummy2Container';
import PrivateRoute from './misc/privateRoute';
import UrlParamComponent from './components/urlParamComponent';
import ChartDemoContainer from './containers/chartDemoContainer';
import AsyncExample from './scenes/AsyncExample';
import FirstExampleMain from './containers/firstExample/pageContainer';

class App extends Component {

  // itt add meg, hogy url-en keresztül mely scene-k érhetőek el
  render() {
    return (
      <div>
        <Header/>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/login' component={Sign}/>
          <Route path='/register' component={Sign}/>
          <Route path='/dummy1' component={DummyPage1}/>
          <Route path='/dummy2' component={Dummy2Container}/>
          <Route path='/chartdemo' component={ChartDemoContainer}/>
          <Route path='/async_example' component={AsyncExample}/>
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
