import { errorMessage, successMessage } from "../../utilities/notification";
import {
  deleteCompany,
  companyList,
} from "../../stores/actions/company.actions.types";
import { connect } from "react-redux";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../helpers/Loading";
import Pagination from "../helpers/Pagination";

const { PUBLIC_URL } = process.env;

function CompanyList(props) {
  const [appications, setApplications] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState([]);
  const [pageSize, setPageSize] = useState(2);

  const { t } = useTranslation();

  useEffect(() => {
    let query = {
      status: props.filterCompany,
      search: props.query,
      page: currentPage,
      size: pageSize,
    };

    getCompanyList(query);
  }, [props.filterCompany, props.query]);

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

  const handlePrev = () => {
    let query = {
      status: props.filterCompany,
      search: props.query,
      page: currentPage - 1,
      size: pageSize,
    };

    getCompanyList(query);

    setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    let query = {
      status: props.filterCompany,
      search: props.query,
      page: currentPage + 1,
      size: pageSize,
    };

    getCompanyList(query);

    setCurrentPage((prev) => prev + 1);
  };

  const handlePage = (pageNumber) => {
    let query = {
      status: props.filterCompany,
      search: props.query,
      page: pageNumber,
      size: pageSize,
    };

    getCompanyList(query);

    setCurrentPage(pageNumber);
  };

  const handlePageSize = (size) => {
    let query = {
      status: props.filterCompany,
      search: props.query,
      page: currentPage,
      size,
    };

    getCompanyList(query);
    setPageSize(size);
  };

  const getCompanyList = ({ status = "", search = "", page = 1, size = 1 }) => {
    const callback = (data) => {
      if (data.success) {
        setApplications(data?.data?.companies);
        setTotalPage(data?.data?.pagination_data?.total_pages);
        setCurrentPage(data?.data?.pagination_data?.current_page);
      }
    };

    let request = { callback, status, search, page, size };

    props.companyList(request);
  };

  const handleClick = (item) => {
    const callback = (data) => {
      if (data.success) {
        successMessage(t("company-delete-success"));

        getCompanyList();
      } else {
        errorMessage(data.message);
      }
    };
    props.deleteCompany({ callback, companyId: item?.company_info?.id });
  };

  return (
    <>
      {props.loading ? (
        <Loading />
      ) : (
        <>
          <div className="plan-box col-count-6 header-row">
            <div className="plan-col col-1">{t("company-name-label")}</div>
            {props?.listFrom === "company-list" ? (
              <div className="plan-col col-2">{t("cr-number-label")}</div>
            ) : (
              <div className="plan-col col-2">{t("package-label")}</div>
            )}
            <div className="plan-col col-3">{t("phone-no-label")}</div>
            <div className="plan-col col-4">
              <span className="emailCol">{t("email-label")}</span>
            </div>
            <div className="plan-col col-5">{t("status-label")}</div>
            <div className="plan-col col-6">{t("actions-label")}</div>
          </div>
          {appications?.map((application, i) => (
            <div
              className={`plan-box col-count-6 color-${i + 1}`}
              key={application.company_id}
            >
              <div className="plan-col col-1">
                <span className="mobileLabel">{t("company-name-label")}:</span>
                <span className="first-letter">
                  {application?.company_info?.company_name[0]?.toUpperCase()}
                </span>
                {`${application?.company_info?.company_name}`}
              </div>
              {props?.listFrom === "company-list" ? (
                <div className="plan-col col-2">
                  {application?.company_info?.company_cr_number}
                </div>
              ) : (
                <div className="plan-col col-2">
                  {props?.listFrom === "company-list" ? (
                    <span className="mobileLabel">
                      {t("cr-number-label")}:{" "}
                    </span>
                  ) : (
                    <span className="mobileLabel">{t("package-label")}: </span>
                  )}
                  Basic
                </div>
              )}
              <div className="plan-col col-3">
                <span className="mobileLabel">{t("phone-no-label")}:</span>
                {application?.submitted_by?.phone}
              </div>
              <div className="plan-col col-4">
                <span className="mobileLabel">{t("email-label")}:</span>
                <span className="emailCol">
                  {application?.submitted_by?.email}
                </span>
              </div>
              <div className="plan-col col-5">
                <span className="mobileLabel">{t("status-label")}:</span>{" "}
                <span
                  className={`status status-${
                    application?.status === "PENDING"
                      ? "pending"
                      : application?.status === "APPROVED"
                      ? "active"
                      : application?.status === "DECLINED"
                      ? "archived"
                      : ""
                  }`}
                >
                  {application?.status?.toLowerCase()}
                </span>
              </div>
              <div className="plan-col col-6">
                <span className="mobileLabel">{t("actions-label")}:</span>
                {props?.listFrom !== "company-list" ? (
                  <a onClick={() => handleClick(application)}>
                    <img src={`${PUBLIC_URL}/images/delete.png`} alt="" />
                  </a>
                ) : null}

                {props?.listFrom !== "dashboard" ? (
                  <Link to={`/company-detail/${application?.company_id}`}>
                    {t("view-details-btn")}
                  </Link>
                ) : null}
              </div>
            </div>
          ))}
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
        </>
      )}
    </>
  );
}

const mapStateToProps = (state) => ({
  loading: state.app.visible,
});
export default connect(mapStateToProps, {
  deleteCompany,
  companyList,
})(CompanyList);
