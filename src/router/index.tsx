import React, { Component } from 'react';
import {Switch,Route,BrowserRouter,Redirect} from 'react-router-dom';
import asyncComponent from './asyncComponent';
//utils
import { isAuth } from '../utils/auth';
//views
const FOODDETAILS = asyncComponent(() => import("../pages/fooddetails/FoodDetails"));
const FOODLIST = asyncComponent(() => import("../pages/foodslist/FoodList"))
const LOGIN = asyncComponent(() => import("../pages/login/Login"));
const MYORDER = asyncComponent(() => import("../pages/myOrder/MyOrder"));

interface Props {
  Component: typeof Component,
  rest: object
}

// const privateRoute = ({Component, ...rest}: any) => (
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
            <Route path="/" exact component={FOODLIST} />
            <Route path="/foodDetails/:dateFoodId" component={FOODDETAILS} />
            <Route path="/login" component={LOGIN} />
            <Route path="/myOrder" component={MYORDER}/>
          </Switch>
          )
        }/>
      </BrowserRouter>
    )
  }
}
