import React, { Component } from "react";
import classes from "./Pagenotfound.module.scss";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Pagenotfound = () => {
  const { t } = useTranslation();

  return (
    <div className={`${classes.pagewrap} d-flex flex-row align-items-center`}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-12 text-center">
            <span className="display-1 d-block">404</span>
            <div className="mb-4 lead">
              {t("the-page-you-are-looking-for-was-not-found")}
            </div>
            <Link to="/" className="btn btn-link">
              {t("back-to-home")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pagenotfound;
