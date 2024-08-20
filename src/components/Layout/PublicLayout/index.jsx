import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import PublicSidebar from "./PublicSidebar";
import LanguageSwitcher from "../LanguageSwitcher/Switcher";
import { AuthContext } from "../../../contexts/AuthContext";
const { PUBLIC_URL } = process.env;

const PublicLayout = (props) => {
  const auth = useContext(AuthContext);
  if (auth) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <React.Fragment>
      <section className="login-wrapper">
        <div className="login-container">
          <PublicSidebar />
          <div className="login-main">
            <div className="login-menu">
              <div className="logo-wrap">
                <a href="/dashboard">
                  <img src={`${PUBLIC_URL}/images/logo.png`} alt="" />
                </a>
              </div>
              <LanguageSwitcher />
            </div>
            <Outlet />
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default PublicLayout;
