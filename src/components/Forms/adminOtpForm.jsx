import React, { useEffect, useState } from "react";
import { login, initSIgnIn } from "../../stores/actions/user.actions.types";
import OtpInput from "react-otp-input";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { errorMessage, successMessage } from "../../utilities/notification";

function AdminOtpForm({ credentials, initSignIn, otp, setOtp, login }) {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!credentials && !credentials.email && !credentials.email) {
      navigate("/");
    }
  }, []);

  const onResendClick = () => {
    // dispatch(initSIgnIn(...credentials));

    const callback = (data) => {
      if (data.success) {
        successMessage(t("sent-otp-code-success"));
      } else {
        errorMessage(t("invalid-credentials"));
      }
    };
    initSignIn({
      data: credentials,
      callback,
    });
  };

  const onSubmit = (e) => {
    setLoading(true);
    e.preventDefault(0);

    const request = {
      ...credentials,
      otp,
    };

    const callback = (data) => {
      setLoading(false);
      if (data.success) {
        successMessage(t("msg-signin-success"));
        navigate("/dashboard");
      } else {
        errorMessage(t("invalid-otp-code"));
      }
    };
    login({
      data: request,
      callback,
    });
  };

  return (
    <>
      <div className="login-main-inner align-center">
        <h2 className="medium-margin">{t("enter-security-code-label")}</h2>
        <p>{t("please-check-your-email-for-security-code")}</p>
        <form>
          <div className="input-wrap otp-box">
            <OtpInput
              inputType="number"
              containerStyle={"input-wrap otp-box"}
              inputStyle={"input-field input-text"}
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderInput={(props) => <input {...props} />}
            />
          </div>
          <div className="input-wrap">
            <button type="submit" onClick={onSubmit} className="input-submit">
              {loading
                ? `${t("submitting-btn")}`
                : `${t("signin-form-field-submit-btn")}`}
            </button>
          </div>
          <div className="input-wrap forgot-password">
            {`${t("not-received-the-code")}`}?{" "}
            <span onClick={onResendClick} style={{ cursor: "pointer" }}>
              {" "}
              &nbsp;<Link>{`${t("resend-link")}`}</Link>
            </span>
          </div>
        </form>
      </div>
    </>
  );
}
const mapStateToProps = (state) => ({
  userDetails: state.user.userDetails,
});

export default connect(mapStateToProps, {
  login,
  initSignIn: initSIgnIn,
})(AdminOtpForm);
