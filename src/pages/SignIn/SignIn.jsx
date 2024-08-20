import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { initSIgnIn } from "../../stores/actions/user.actions.types";
import { errorMessage, successMessage } from "../../utilities/notification";
import SignInForm from "../../components/Forms/signinform";
import { useTranslation } from "react-i18next";
import AdminOtpForm from "../../components/Forms/adminOtpForm";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const SignIn = (props) => {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState();
  const [credentials, setCredentials] = useState();

  const signIn = async (request) => {
    const callback = (data) => {
      if (data.success) {
        successMessage(t("sent-otp-code-success"));
        setStep(2);
      } else {
        errorMessage(t("invalid-credentials"));
      }
    };
    props.initSIgnIn({
      data: request,
      callback,
    });
  };

  return (
    <AuthContext.Consumer>
      {(auth) => {
        if (auth) {
          return <Navigate to="/dashboard" />;
        }
        return (
          <>
            {step === 1 ? (
              <div className="login-main-inner">
                <h2>{t("login-to-your-account")}</h2>
                <SignInForm
                  loading={props.visible}
                  setCredentials={setCredentials}
                  signIn={signIn}
                />
              </div>
            ) : (
              <AdminOtpForm
                otp={otp}
                setOtp={setOtp}
                loading={props.visible}
                credentials={credentials}
              />
            )}
          </>
        );
      }}
    </AuthContext.Consumer>
  );
};

const mapStateToProps = (state) => ({
  userDetails: state.user.userDetails,
  visible: state.app.visible,
});

export default connect(mapStateToProps, {
  initSIgnIn,
})(SignIn);
