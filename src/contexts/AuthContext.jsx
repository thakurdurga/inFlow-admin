import React, { createContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export const AuthContext = createContext(null);

const AuthProvider = (props) => {
  const authData = useSelector((state) => state.user.userDetails);
  const [auth, setAuth] = useState({ data: null });
  const location = useLocation();
  const history = useNavigate();

  const setAuthData = (data) => {
    setAuth(data);
  };

  useEffect(() => {
    setAuth(authData);
  }, [authData]);

  useEffect(() => {
    const checkTokens = () => {
      setAuthData(authData);
    };
    checkTokens();
  }, [location, history, authData]);

  return (
    <AuthContext.Provider value={auth}>{props.children}</AuthContext.Provider>
  );
};

export default AuthProvider;
