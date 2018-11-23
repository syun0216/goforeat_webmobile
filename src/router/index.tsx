import React, { Component } from "react";
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import asyncComponent from "./asyncComponent";
//hoc
import BasicHOC from "../components/HOC/BasicHOC";
//utils
import { isAuth } from "../utils/auth";
//styles
import "../styles/transitions.less";
//pages
const FOODDETAILS = asyncComponent(() =>
  import("../pages/fooddetails/FoodDetails")
);
const FOODLIST = asyncComponent(() => import("../pages/foodslist/FoodList"));
const LOGIN = asyncComponent(() => import("../pages/login/Login"));
const MYORDER = asyncComponent(() => import("../pages/myOrder/MyOrder"));
const CONTENT = asyncComponent(() => import("../pages/content/content"));

interface Props {
  Component: typeof Component;
  rest: object;
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
        <Route
          render={({ location }) => (
            <TransitionGroup>
              <CSSTransition
                key={location.key}
                timeout={1000}
                classNames={{
                  enter: "animated",
                  enterActive: "fadeIn",
                  exit: "animated",
                  exitActive: "fadeIn"
                }}
                mountOnEnter={true}
                unmountOnExit={true}
              >
                <Switch>
                  <Route path="/" exact component={BasicHOC(FOODLIST)} />
                  <Route
                    path="/foodDetails/:dateFoodId"
                    component={BasicHOC(FOODDETAILS)}
                  />
                  <Route path="/content" component={BasicHOC(CONTENT)} />
                  <Route path="/login" component={BasicHOC(LOGIN)} />
                  <Route path="/myOrder" component={BasicHOC(MYORDER)} />
                </Switch>
              </CSSTransition>
            </TransitionGroup>
          )}
        />
      </BrowserRouter>
    );
  }
}
