import React, { Component } from "react";
import {
  Switch,
  Route,
  BrowserRouter,
  Redirect,
  HashRouter
} from "react-router-dom";
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
const PICKPLACE = asyncComponent(() => import("../pages/pickPlace/PickPlace"));
const FEEDBACK = asyncComponent(() => import("../pages/feedback/feedback"));
const COUPON = asyncComponent(() => import("../pages/coupon/Coupon"))
const SETTING = asyncComponent(() => import("../pages/setting/Setting"));
const NOTFOUND = asyncComponent(() => import("../pages/404"));

interface Props {
  Component: typeof Component;
  rest: object;
}

const privateRoute = ({ PComponent, ...rest }: any) => {
  // console.log({ rest });
  return isAuth() ? (
    <Route {...rest} component={PComponent} />
  ) : (
    <Redirect
      to={{
        pathname: "/login",
        state: {
          from: rest.location,
          params: isEmpty(rest.location.state)
            ? null
            : rest.location.state.params || null
        }
      }}
    />
  );
};

export default class RouteConfig extends Component<any,{}> {
  public render() {
    const PRoute = privateRoute;
    return (
      <HashRouter>
        <Route
          render={props => (
            <TransitionGroup>
              <CSSTransition
                key={props.location.pathname}
                timeout={1000}
                classNames={{
                  enter: "animated",
                  enterActive: "fadeIn",
                  exit: "animated",
                  exitActive: "fadeIn"
                }}
                mountOnEnter={true}
                unmountOnExit={true}
                exit={false}
              >
                <Switch>
                  <Route path="/" exact component={BasicHOC(FOODLIST)} />
                  <Route
                    path="/foodDetails/:dateFoodId"
                    component={BasicHOC(FOODDETAILS)}
                  />
                  <Route path="/content" component={BasicHOC(CONTENT)} />
                  <Route path="/login" component={BasicHOC(LOGIN)} />
                  <Route path="/pickplace" component={PICKPLACE}/>
                  <Route path="/feedback" component={FEEDBACK}/>
                  <Route path="/setting" component={SETTING}/>
                  <PRoute
                    path="/myOrder"
                    PComponent={BasicHOC(MYORDER)}
                    {...props}
                  />
                  <PRoute path="/coupon" PComponent={COUPON} {...props}/>
                  <PRoute path="/editInfo" PComponent={BasicHOC(EDITINFO)} {...props}/>
                  <PRoute
                    path="/confirmOrder"
                    PComponent={BasicHOC(CONFIRMORDER)}
                    {...props}
                  />
                  <Route path="*" component={BasicHOC(NOTFOUND)}/>
                </Switch>
              </CSSTransition>
            </TransitionGroup>
          )}
        />
      </HashRouter>
    );
  }
}
