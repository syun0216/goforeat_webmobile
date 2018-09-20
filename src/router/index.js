import React, { Component } from 'react';
import { HashRouter,Switch,Route,BrowserRouter } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import asyncComponent from './asyncComponent';
//utils
import { isAuth } from '@/utils/auth';
//views
const home = asyncComponent(() => import("@/pages/homepage/HomePage"));
const login = asyncComponent(() => import("@/pages/loginpage/LoginPage"));
const myorder = asyncComponent(() => import("@/pages/myOrder/MyOrderPage"));
const content = asyncComponent(() => import("@/pages/contentpage/ContentPage"));
//styles


const AUTH = (nextState, replace, callback) => {
  console.log(nextState, replace, callback);
}

export default class routeConfig extends Component {
  render() {
    return (
      <BrowserRouter>
        <Route render={({location}) => (
          <TransitionGroup className="route-container">
            <CSSTransition
              key={location.key}
              timeout={300}
              classNames="slide">
              <Switch>
                <Route path="/" exact component={home}/>
                <Route path="/login" component={login} />
                <Route path="/content" component={content}/>
                <Route path="/myorder" component={myorder} onEnter={AUTH()}/>
              </Switch>
            </CSSTransition>
          </TransitionGroup>
          )
        }/>
        
      </BrowserRouter>
    )
  }
}