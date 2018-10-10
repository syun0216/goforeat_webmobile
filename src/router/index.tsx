import React, { Component } from 'react';
import {Switch,Route,BrowserRouter,Redirect} from 'react-router-dom';
import asyncComponent from './asyncComponent';
//utils
import { isAuth } from '../utils/auth';
//views
const HOME = asyncComponent(() => import("../pages/home/HomePage"));
const LOGIN = asyncComponent(() => import("../pages/login/Login"));
const MYORDER = asyncComponent(() => import("../pages/myorder/MyOrder"));

interface Props {
  Component: typeof Component,
  rest: object
}

// const privateRoute = ({Component, ...rest}: Props) => (
//   <Route 
//     {...rest}
//     render={props => isAuth() ? <Component {...props}/> : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
//   />
// )

export default class RouteConfig extends Component {
  public render() {
    return (
      <BrowserRouter>
        <Route render={() => (
          <Switch>
            <Route path="/" exact component={HOME} />
            <Route path="/login" component={LOGIN} />
          </Switch>
          )
        }/>
      </BrowserRouter>
    )
  }
}
