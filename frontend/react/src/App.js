import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Route, Switch, withRouter } from 'react-router'

import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import './index.css';
import Sign from './scenes/Sign'
import PageNotFound from './scenes/PageNotFound';
import Home from './scenes/Home';
import Header from './components/Header';
import ManyExample from './scenes/ManyExample';
import PrivateRoute from './misc/privateRoute';
import ChartSandBox from './scenes/ChartSandBox';
import AsyncExample from './scenes/AsyncExample';
import FirstExampleMain from './scenes/FirstComplexExample';
import DashboardEditScene from "./scenes/DashboardEditScene";
import DashboardViewScene from "./scenes/DashboardViewScene";

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
          <Route path='/many_example' component={ManyExample}/>
          <Route path='/chart_sandbox' component={ChartSandBox}/>
          <Route path='/async_example' component={AsyncExample}/>
          <PrivateRoute path="/first_example" component={FirstExampleMain}
                        isAuthenticated={this.props.isAuthenticated}/>

          <PrivateRoute path="/dashboard_editor" component={DashboardEditScene}
                        isAuthenticated={this.props.isAuthenticated}/>
          <PrivateRoute path="/dashboard/:id" component={DashboardViewScene}
                        isAuthenticated={this.props.isAuthenticated}/>
          <PrivateRoute path="/dashboard" component={DashboardViewScene}
                        isAuthenticated={this.props.isAuthenticated}/>


          {/* this.props.match.params.id nyerhető ki
          <Route path="/valami/:id"
                 component={UrlParamComponent}/>
          */}

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
