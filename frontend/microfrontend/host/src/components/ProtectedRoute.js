import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { useCurrentUserContext } from "context/CurrentUserContext";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isLoggedIn } = useCurrentUserContext();  // Use context instead of prop

  return (
      <Route
          {...rest}
          render={(props) =>
              isLoggedIn ? <Component {...props} /> : <Redirect to="/signin" />
          }
      />
  );
};

export default ProtectedRoute;