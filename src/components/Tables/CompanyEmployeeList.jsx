import { useTranslation } from "react-i18next";
import React from "react";
import {
  companyEmployee,
  updateEmployeeStatus,
  employeeResetPassword,
} from "../../stores/actions/company.actions.types";
import { connect } from "react-redux";
import debounce from "lodash.debounce";
import { useEffect, useMemo, useState } from "react";
import { format } from "date-fns";
import { errorMessage, successMessage } from "../../utilities/notification";
import { Modal } from "react-bootstrap";
import Pagination from "../helpers/Pagination";
const { PUBLIC_URL } = process.env;
const passwordRegEx =
  /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/;

const CompanyEmployeeList = (props) => {
  const [employeeList, setEmployeeList] = useState([]);
  const [query, setQuery] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState("");
  const [loadingResetPassword, setLoadingResetPassword] = useState(false);
  const [employee, setEmployee] = useState(null);
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState([]);
  const [pageSize, setPageSize] = useState(2);
  const [type, setType] = useState("password");
  const [filterQuery, setFilterQuery] = useState({});
  const { t } = useTranslation();
  const companyId = props.companyId;

  useEffect(() => {
    if (companyId) {
      getEmployeeList({
        search: query ? query : "",
        page: currentPage,
        size: pageSize,
        from_date: filterQuery.from_date ? filterQuery.from_date : "",
        to_date: filterQuery.to_date ? filterQuery.to_date : "",
      });
    }
  }, [query, companyId]);

  useEffect(() => {
    if (totalPage > 1) {
      let tempPageCount = [];

      for (let i = 1; i <= totalPage; i++) {
        tempPageCount = [...tempPageCount, i];
      }

      setPageCount(tempPageCount);
    } else {
      setPageCount([]);
    }
  }, [totalPage]);

  useEffect(() => {
    return () => {
      employeeSearchDebounce.cancel();
    };
  });

  const handleFilterByDate = (from_date, to_date) => {
    let tempFilterQuery = { search: query ? query : "" };
    if (from_date) {
      setFromDate(from_date);
      tempFilterQuery = { ...filterQuery, from_date };
    }

    if (to_date) {
      setToDate(to_date);
      tempFilterQuery = { ...filterQuery, to_date };
    }

    setFilterQuery((prev) => ({ ...prev, ...tempFilterQuery }));

    getEmployeeList({ ...tempFilterQuery });
  };

  const getEmployeeList = ({
    search = "",
    from_date = "",
    to_date = "",
    page,
    size,
  }) => {
    const callback = (data) => {
      if (data.success) {
        setEmployeeList(data?.data?.employees);
        setTotalPage(data?.data?.pagination_data?.total_pages);
        setCurrentPage(data?.data?.pagination_data?.current_page);
      }
    };

    props.companyEmployee({
      callback,
      companyId,
      search: search ? search : "",
      from_date: from_date ? from_date : "",
      to_date: to_date ? to_date : "",
      page: page ? page : "",
      size: size ? size : "",
    });
  };

  const handlePrev = () => {
    let filterQuery = {
      search: query,
      from_date: fromDate,
      to_date: toDate,
      page: currentPage - 1,
      size: pageSize,
    };

    getEmployeeList(filterQuery);
    setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    let filterQuery = {
      search: query,
      from_date: fromDate,
      to_date: toDate,
      page: currentPage + 1,
      size: pageSize,
    };

    getEmployeeList(filterQuery);
    setCurrentPage((prev) => prev + 1);
  };

  const handlePage = (pageNumber) => {
    let filterQuery = {
      search: query,
      from_date: fromDate,
      to_date: toDate,
      page: pageNumber,
      size: pageSize,
    };

    getEmployeeList(filterQuery);
    setCurrentPage(pageNumber);
  };

  const handlePageSize = (size) => {
    let filterQuery = {
      search: query,
      from_date: fromDate,
      to_date: toDate,
      page: currentPage,
      size,
    };

    getEmployeeList(filterQuery);
    setPageSize(size);
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const employeeSearchDebounce = useMemo(() => {
    return debounce(handleChange, 300);
  }, []);

  const updateEmployeeStatus = (employee, type) => {
    const status = employee?.status;

    if (status === type) {
      errorMessage(t("already-applied-status-error-message"));
    } else {
      let payload = {
        status: type,
      };
      const callback = (data) => {
        if (data.success) {
          successMessage(t("employee-status-update-success"));

          getEmployeeList({
            page: currentPage,
            size: pageSize,
            search: query ? query : "",
          });
        } else {
          errorMessage(data.message);
        }
      };

      props.updateEmployeeStatus({
        callback,
        employeeId: employee.id,
        data: payload,
      });
    }
  };

  const handleResetPassword = () => {
    const isValidPassword = password.match(passwordRegEx);
    if (!isValidPassword) {
      errorMessage(t("form-field-warning-password"));
    } else {
      setShowPasswordModal(false);
      setLoadingResetPassword(true);
      let payload = {
        password,
      };
      const callback = (data) => {
        setPassword("");
        if (data.success) {
          successMessage(t("employee-password-reset-success"));

          getEmployeeList({
            page: currentPage,
            size: pageSize,
            search: query ? query : "",
          });
        } else {
          errorMessage(data.message);
        }
      };

      props.employeeResetPassword({
        callback,
        employeeId: employee.id,
        data: payload,
      });
    }

    setLoadingResetPassword(false);
  };

  return (
    <section className="employee-data">
      <h2 className="main-title">{t("title-employees")}</h2>
      <div className="transactions-date-flter">
        <input
          type="date"
          name="date-from"
          className="date-field date-from"
          placeholder="3/6/2022"
          value={fromDate}
          onChange={(e) => handleFilterByDate(e.target.value, "")}
        />
        <span>{t("label-to")}</span>
        <input
          type="date"
          name="date-to"
          className="date-field date-to"
          placeholder="3/6/2022"
          value={toDate}
          onChange={(e) => handleFilterByDate("", e.target.value)}
        />
        <div className="company-filters">
          <div className="search-wrap">
            <input
              className="search-input company-search-input"
              type="text"
              placeholder={t("search-by-name-or-email")}
              value={query}
              onChange={handleChange}
            />
          </div>
        </div>{" "}
      </div>{" "}
      <div className="employee-data-list">
        <div className="table-row col-count-5 header hide-on-mobile">
          <div className="table-col">{t("th-employee-name")}</div>
          <div className="table-col">{t("label-email")}</div>
          <div className="table-col">{t("th-reg-date")}</div>
          <div className="table-col">{t("label-status")}</div>
          <div className="table-col">{t("label-actions")}</div>
        </div>{" "}
        {employeeList?.map((employee) => (
          <div className="table-row col-count-5" key={employee.id}>
            <div className="table-col">
              <span className="mobileLabel">{t("th-employee-name")}:</span>
              <img src={`${PUBLIC_URL}/images/emp1.png`} alt="back" />{" "}
              <b>{`${employee?.first_name} ${employee?.last_name}`}</b>
            </div>
            <div className="table-col">
              <span className="mobileLabel">{t("email-label")}:</span>
              <span className="emailCol">{employee?.email}</span>
            </div>
            <div className="table-col">
              <span className="mobileLabel">{t("th-reg-date")}:</span>
              {format(employee?.created_at, "dd MMM yyyy")}
            </div>
            <div className="table-col">
              <span className="mobileLabel">Status:</span>
              <span
                className={`status status-${
                  employee?.status === 1
                    ? "active"
                    : employee?.status === 2
                    ? "pending"
                    : employee?.status === 3
                    ? "archived"
                    : ""
                }`}
              >
                {employee?.status === 1
                  ? t("label-active")
                  : employee?.status === 2
                  ? t("label-pending")
                  : employee?.status === 3
                  ? t("label-decliend")
                  : ""}
              </span>
            </div>
            <div className="table-col">
              <span className="mobileLabel">{t("actions-label")}:</span>
              <a
                href="#"
                onClick={() => {
                  setShowPasswordModal(true);
                  setPassword("");
                  setEmployee(employee);
                }}
              >
                {t("label-reset-password")}
              </a>
              <ul className="manage-subscriptions">
                <li>
                  {" "}
                  <a>{t("label-change-status")}</a>
                  <ul>
                    <li onClick={() => updateEmployeeStatus(employee, 1)}>
                      <a>{t("label-active")}</a>
                    </li>
                    <li onClick={() => updateEmployeeStatus(employee, 2)}>
                      <a>{t("label-pending")}</a>
                    </li>
                    <li onClick={() => updateEmployeeStatus(employee, 3)}>
                      <a>{t("label-decliend")}</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        ))}
      </div>
      <Pagination
        pageCount={pageCount}
        currentPage={currentPage}
        totalPage={totalPage}
        handlePrev={handlePrev}
        handleNext={handleNext}
        handlePage={handlePage}
        handlePageSize={handlePageSize}
        pageSize={pageSize}
      />
      <Modal
        className="actv rejectModal compEmp"
        show={showPasswordModal}
        onHide={() => {
          setShowPasswordModal(false);
        }}
      >
        <div style={{ padding: "20px" }}>
          <div
            className="btn-close-big"
            onClick={() => setShowPasswordModal(false)}
          ></div>
          <Modal.Header closeButton>
            <Modal.Title>
              <h4>{t("reset-employee-password")}</h4>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="p-0 mt-3">
            <div className="login-main-inner">
              <div className="input-wrap" style={{ width: "100%" }}>
                <input
                  type={type}
                  name="password"
                  className="input-field"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setQuery("");
                  }}
                />
                <span
                  className="eye-icon"
                  onClick={() =>
                    setType((type) =>
                      type === "password" ? "text" : "password"
                    )
                  }
                ></span>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button
              onClick={handleResetPassword}
              disabled={!password}
              className="reset-employee-pass add-btn"
            >
              {loadingResetPassword ? t("submitting-btn") : t("reset-password")}
            </button>
          </Modal.Footer>
        </div>
      </Modal>
    </section>
  );
};

const mapStateToProps = (state) => ({
  loading: state.app.visible,
});
export default connect(mapStateToProps, {
  updateEmployeeStatus,
  companyEmployee,
  employeeResetPassword,
})(CompanyEmployeeList);
