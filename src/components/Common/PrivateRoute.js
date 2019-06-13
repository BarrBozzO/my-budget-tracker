import React from "react";
import { Route, Redirect } from "react-router-dom";

function PrivateRoute({
  component: Component,
  auth: isAuthenticated,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
