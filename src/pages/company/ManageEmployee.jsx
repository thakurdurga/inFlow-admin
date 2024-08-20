import { useTranslation } from "react-i18next";
const { PUBLIC_URL } = process.env;

const ManageEmployee = () => {
  const { t } = useTranslation();

  return (
    <div className="settings-main-inner">
      <div className="settings-container">
        <div className="companies-list">
          <div className="inside-nav companies-list">
            <h2>{t("all-employees")}</h2>
            <div className="company-filters">
              <select className="select-field">
                <option value="" selected>
                  {t("all-employees")}
                </option>
                <option>{t("status-label")}</option>
                <option>{t("cr-number-label")}</option>
              </select>
              <div className="search-wrap">
                <input
                  className="search-input company-search-input"
                  type="text"
                  placeholder="Search by name"
                />
              </div>
            </div>
          </div>

          <div className="col-row header-row">
            <div className="col">th-employee-name</div>
            <div className="col">Email</div>
            <div className="col">Status</div>
            <div className="col">Actions</div>
          </div>
          <div className="col-row">
            <div className="col">
              <img src={`${PUBLIC_URL}/images/emp1.png`} alt="" />{" "}
              <b>Jessie Brooks</b>
            </div>
            <div className="col">jessie_brook@gmail.com</div>
            <div className="col">
              <span className="status status-active">Active</span>
            </div>
            <div className="col">
              <a href="#">
                <u>Reset Password</u>
              </a>
              <ul className="status-dropdown">
                <li>
                  <a href="">Change status</a>
                  <ul>
                    <li>
                      <a href="">Disable Account</a>
                    </li>
                    <li>
                      <a href="">Delete Account</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-row">
            <div className="col">
              <img src={`${PUBLIC_URL}/images/emp1.png`} alt="" />{" "}
              <b>Jessie Brooks</b>
            </div>
            <div className="col">jessie_brook@gmail.com</div>
            <div className="col">
              <span className="status status-active">Active</span>
            </div>
            <div className="col">
              <a href="#">
                <u>Reset Password</u>
              </a>
              <ul className="status-dropdown">
                <li>
                  <a href="">Change status</a>
                  <ul>
                    <li>
                      <a href="">Disable Account</a>
                    </li>
                    <li>
                      <a href="">Delete Account</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-row">
            <div className="col">
              <img src={`${PUBLIC_URL}/images/emp1.png`} alt="" />{" "}
              <b>Jessie Brooks</b>
            </div>
            <div className="col">jessie_brook@gmail.com</div>
            <div className="col">
              <span className="status status-archived">Disabled</span>
            </div>
            <div className="col">
              <a href="#">
                <u>Reset Password</u>
              </a>
              <ul className="status-dropdown">
                <li>
                  <a href="">Change status</a>
                  <ul>
                    <li>
                      <a href="">Disable Account</a>
                    </li>
                    <li>
                      <a href="">Delete Account</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-row">
            <div className="col">
              <img src={`${PUBLIC_URL}/images/emp1.png`} alt="" />{" "}
              <b>Jessie Brooks</b>
            </div>
            <div className="col">jessie_brook@gmail.com</div>
            <div className="col">
              <span className="status status-active">Active</span>
            </div>
            <div className="col">
              <a href="#">
                <u>Reset Password</u>
              </a>
              <ul className="status-dropdown">
                <li>
                  <a href="">Change status</a>
                  <ul>
                    <li>
                      <a href="">Disable Account</a>
                    </li>
                    <li>
                      <a href="">Delete Account</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageEmployee;
