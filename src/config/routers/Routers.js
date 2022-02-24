import React, { useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";

import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

// imports
import routes from "./index";

function setTitle(path, routeArray,t) {
  var pageTitle;
  for (var i = 0; i < routeArray.length; i++) {
    if (routeArray[i].path === path) {
      pageTitle = "UAQ | " + t(routeArray[i].title);
    }
  }
  document.title = pageTitle ? pageTitle : "U.A.Q";
}

const RenderRoute = (route) => {
  const state = useSelector((state) => state);
  //   const authState = state.authReducer.user;
  const { t } = useTranslation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  // const setTitle =(path, routeArray) => {
  //   var pageTitle;
  //   for (var i = 0; i < routeArray.length; i++) {
  //     if (routeArray[i].path === path) {
  //       pageTitle = "UAQ | " + t(routeArray[i].title);
  //     }
  //   }
  //   document.title = pageTitle ? pageTitle : "U.A.Q";
  // }
  setTitle(route.path, routes,t);

  //   if (route.isLoginRequired) {
  //     return (
  //     //   <ProtectedRoute
  //     //     path={route.path}
  //     //     exact={route.exact}
  //     //     component={route.component}
  //     //   ></ProtectedRoute>
  //     );
  //   }
  return (
    <Route
      path={route.path}
      exact={route.exact}
      component={route.component}
    ></Route>
  );
};

export default function Routers() {
  const { t } = useTranslation();
  const history = useHistory();

  useEffect(() => {
    setTitle(history.location.pathname, routes, t);
  }, []);
  // const setTitle =(path, routeArray) => {
  //   var pageTitle;
  //   for (var i = 0; i < routeArray.length; i++) {
  //     if (routeArray[i].path === path) {
  //       pageTitle = "UAQ | " + t(routeArray[i].title);
  //     }
  //   }
  //   document.title = pageTitle ? pageTitle : "U.A.Q";
  // }

  return (
    <>
      <Switch>
        {routes.map((route, index) => {
          return <RenderRoute {...route} key={index} />;
        })}
      </Switch>
    </>
  );
}
