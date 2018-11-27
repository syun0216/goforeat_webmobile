import React, { Component } from "react";
import { Switch, Route, BrowserRouter, Redirect, HashRouter } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import asyncComponent from "./asyncComponent";
//hoc
import BasicHOC from "../components/HOC/BasicHOC";
//utils
import { isAuth } from "../utils/auth";
import { isEmpty } from "../utils/common";
//styles
import "../styles/transitions.less";
//pages
const FOODDETAILS = asyncComponent(() =>
  import("../pages/fooddetails/FoodDetails")
);
const FOODLIST = asyncComponent(() => import("../pages/foodslist/FoodList"));
const LOGIN = asyncComponent(() => import("../pages/login/Login"));
const MYORDER = asyncComponent(() => import("../pages/myOrder/MyOrder"));
const EDITINFO = asyncComponent(() => import("../pages/editInfo/EditInfo"));
const CONFIRMORDER = asyncComponent(() =>
  import("../pages/confirmOrder/ConfirmOrder")
);
const CONTENT = asyncComponent(() => import("../pages/content/content"));

interface Props {
  Component: typeof Component;
  rest: object;
}

const privateRoute = ({ PComponent, ...rest }: any) => {
  // console.log({ rest });
  return isAuth() ? (
    <Route {...rest} component={PComponent} />
  ) : (
    <Redirect to={{ pathname: "/login", state: { from: rest.location,params: isEmpty(rest.location.state) ? null : rest.location.state.params || null }}} />
  );
};

export default class RouteConfig extends Component {
  public render() {
    const PRoute = privateRoute;
    return (
      <BrowserRouter>
        <Route
          render={props => (
            <TransitionGroup>
              <CSSTransition
                key={props.location.key}
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
                    path="/foodDetails"
                    component={BasicHOC(FOODDETAILS)}
                  />
                  <Route path="/content" component={BasicHOC(CONTENT)} />
                  <Route path="/login" component={BasicHOC(LOGIN)} />
                  <PRoute
                    path="/myOrder"
                    PComponent={BasicHOC(MYORDER)}
                    {...props}
                  />
                  <Route path="/editInfo" component={BasicHOC(EDITINFO)} />
                  <PRoute
                    path="/confirmOrder"
                    PComponent={BasicHOC(CONFIRMORDER)}
                    {...props}
                  />
                  {/* <Route path="/confirmOrder/:dateFoodId" component={BasicHOC(CONFIRMORDER)}/> */}
                </Switch>
              </CSSTransition>
            </TransitionGroup>
          )}
        />
      </BrowserRouter>
    );
  }
}
