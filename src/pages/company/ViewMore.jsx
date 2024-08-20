import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { errorMessage, successMessage } from "../../utilities/notification";
import {
  companyInc,
  companyDetail,
  updateCompanyStatus,
  deleteCompany,
} from "../../stores/actions/company.actions.types";
import DirectorList from "../../components/Tables/DirectorList";
import OwnerList from "../../components/Tables/OwnerList";
import CompanyGeneralInfo from "../../components/pages/viewMore/CompanyGeneralInfo";
import CompanyAddress from "../../components/pages/viewMore/CompanyAddress";
import { generateCrInPdf } from "../../utilities/generateCrInfoPdf";
const { PUBLIC_URL } = process.env;

const ViewMore = (props) => {
  const [showAuthorizationModal, setShowAuthorizationModal] = useState(false);
  const [companyInc, setCompanyInc] = useState();
  const [company, setCompany] = useState();
  const [rejectReason, setRejectReason] = useState("");
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [loadingReject, setLoadingReject] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showCrModal, setShowCrModal] = useState(false);
  const navigate = useNavigate();

  const { companyId } = useParams();
  const { t } = useTranslation();

  useEffect(() => {
    if (companyId) {
      getCompanyDetail();
    }
  }, [companyId]);

  useEffect(() => {
    if (companyId) {
      getCompanyInc();
    }
  }, [companyId]);

  const getCompanyInc = () => {
    const callback = (data) => {
      if (data.success) {
        setCompanyInc(data?.data);
      } else {
        errorMessage(data.message);
      }
    };

    props.companyInc({ callback, companyId });
  };

  const getCompanyDetail = () => {
    const callback = (data) => {
      if (data.success) {
        setCompany(data?.data);
      } else {
        errorMessage(data.message);
      }
    };

    props.companyDetail({ callback, companyId });
  };

  const handleUpdateCompnayStatus = (company, type) => {
    const id = company?.application[0]?.id;
    const status = company?.application[0]?.status;
    setShowRejectModal(false);

    if (status === type) {
      errorMessage(t("already-applied-status-error-message"));
    } else {
      if (type === "reject") {
        setLoadingReject(true);
      }
      const callback = (data) => {
        if (data.success) {
          successMessage(t("company-status-update-success"));
          if (type === "reject") {
            setShowRejectModal(false);
            setRejectReason("");
            setLoadingReject(false);
          }
          getCompanyDetail();
        } else {
          errorMessage(data.message);
        }
      };

      let payload = {};
      if (type === "APPROVED") {
        payload = { status: "APPROVED" };
      } else if (type === "DECLINED") {
        payload = {
          status: "DECLINED",
          rejection_reason: rejectReason,
        };
      } else if (type === "PENDING") {
        payload = { status: "PENDING" };
      }
      props.updateCompanyStatus({ callback, companyId: id, data: payload });
    }
  };

  const handleDeleteCompany = () => {
    const callback = (data) => {
      if (data.success) {
        successMessage(t("company-delete-success"));

        navigate("/companies");
      } else {
        errorMessage(data.message);
      }
    };
    props.deleteCompany({ callback, companyId });
    setShowDeleteModal(false);
  };

  const handleDownloadPdf = () => {
    generateCrInPdf(company);
  };

  return (
    <div className="settings-main-inner">
      <div className="settings-container">
        <div className="back-nav">
          <a className="btn-back-new" onClick={() => navigate(-1)}>
            <img src={`${PUBLIC_URL}/images/arrow-left1.png`} alt="back" />{" "}
            {t("back-link")}{" "}
          </a>
          <div className="pull-right action-buttons">
            <a href="#" className="btn-edit">
              {t("edit-btn")}{" "}
              <img src={`${PUBLIC_URL}/images/edit.svg`} alt="edit" />
            </a>
            <a className="btn-delete" onClick={() => setShowDeleteModal(true)}>
              {t("delete-btn")}
              <img src={`${PUBLIC_URL}/images/trash.svg`} alt="delete" />
            </a>
          </div>
        </div>
        <div className="company-details style-2">
          <div className="plan-box col-count-6 header-row">
            <div className="plan-col col-1">{t("label-company")}</div>
            <div className="plan-col col-2">{t("label-cr-number")}</div>
            <div className="plan-col col-3">{t("label-country")}</div>
            <div className="plan-col col-4">{t("label-city")}</div>
            <div className="plan-col col-5">{t("label-status")}</div>
            <div className="plan-col col-6">{t("label-action")}</div>
          </div>

          <div className="plan-box col-count-6 content-row">
            <div className="plan-col col-1">
              <span className="mobileLabel">
                {t("form-field-label-company-name")}:
              </span>
              <span className="first-letter">J</span>
              <b>{company?.company_name}</b>
            </div>
            <div className="plan-col col-2">
              <span className="mobileLabel">{t("label-cr-number")}:</span>
              <b>{company?.company_cr_number}</b>
            </div>
            <div className="plan-col col-3">
              <span className="mobileLabel">{t("label-country")}:</span>
              <b>{company?.country}</b>
            </div>
            <div className="plan-col col-4">
              <span className="mobileLabel">{t("label-city")}:</span>
              <b>{company?.city}</b>
            </div>
            <div className="plan-col col-5">
              <span className="mobileLabel">{t("label-status")}</span>{" "}
              <span
                className={`status status-${
                  company?.application?.length > 0
                    ? company?.application[0]?.status === "PENDING"
                      ? "pending"
                      : company?.application[0]?.status === "APPROVED"
                      ? "active"
                      : company?.application[0]?.status === "DECLINED"
                      ? "archived"
                      : ""
                    : ""
                }`}
              >
                {company?.application?.length > 0 &&
                  company?.application[0]?.status?.toLowerCase()}
              </span>
            </div>
            <div className="plan-col col-6">
              <span className="mobileLabel">{t("label-actions")}:</span>
              <ul className="manage-subscriptions">
                <li>
                  <a>{t("label-change-status")}</a>
                  <ul>
                    <li>
                      <a
                        onClick={() =>
                          handleUpdateCompnayStatus(company, "PENDING")
                        }
                      >
                        {t("label-pending")}
                      </a>
                    </li>
                    <li>
                      <a onClick={() => setShowRejectModal(true)}>
                        {t("label-decliend")}
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={() =>
                          handleUpdateCompnayStatus(company, "APPROVED")
                        }
                      >
                        {t("label-active")}
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>

          <hr />
          <CompanyGeneralInfo company={company} />

          <hr />

          <div className="directors-nav">
            <Link onClick={() => setShowCrModal(true)}>
              {t("view-cr")}{" "}
              <img src={`${PUBLIC_URL}/images/view.svg`} alt="view" />
            </Link>
            <Link onClick={() => setShowAuthorizationModal(true)}>
              {t("view-authorization-letter-label")}{" "}
              <img src={`${PUBLIC_URL}/images/view.svg`} alt="view" />
            </Link>
          </div>
        </div>

        <CompanyAddress company={company} />

        <OwnerList parties={company?.extended_cr_info?.parties || []} />

        <DirectorList directors={company?.directors || []} />

        <Modal
          className="actv authorizationModal pdf-file"
          show={showCrModal}
          onHide={() => {
            setShowCrModal(false);
          }}
        >
          <Modal.Header closeButton className="border-bottom">
            <button
              onClick={handleDownloadPdf}
              className="btn btn-download-pdf"
            >
              Download
            </button>
          </Modal.Header>
          <Modal.Body className="p-0 mt-2">
            <div>
              <div>
                <div>
                  <h4>Company info</h4>
                  <p>
                    Corporate Registration Name:{" "}
                    {company?.company_name || "---"}
                  </p>
                  <p>
                    Corporate Registration Number:{" "}
                    {company?.company_registration_number || "---"}
                  </p>
                  <p>
                    Corporate Registration Entity Number:{" "}
                    {company?.extended_cr_info?.crEntityNumber || "---"}
                  </p>
                  <p>
                    Corporate Registration Main Entity Number:{" "}
                    {company?.extended_cr_info?.crMainEntityNumber || "---"}
                  </p>
                  <p>
                    Corporate Registration Main Number:{" "}
                    {company?.extended_cr_info?.crMainNumber || "---"}
                  </p>
                  <p>
                    Issue Date: {company?.extended_cr_info?.issueDate || "---"}
                  </p>
                  <p>
                    IsExpiry Date:{" "}
                    {company?.extended_cr_info?.expiryDate || "---"}
                  </p>
                  <p>Business Type: {company?.business_type || "---"}</p>
                  <p>
                    Status: {company?.extended_cr_info?.status?.name || "---"}
                  </p>
                  <p>
                    Status (English):{" "}
                    {company?.extended_cr_info?.status?.nameEn || "---"}
                  </p>
                  <p>
                    Location:{" "}
                    {company?.extended_cr_info?.location?.name || "---"}
                  </p>
                  <p>
                    Description:{" "}
                    {company?.extended_cr_info?.activities?.description ||
                      "---"}
                  </p>
                  <p>
                    Is active:{" "}
                    {company?.extended_cr_info?.status?.nameEn === "Active"
                      ? "Yes"
                      : "No"}
                  </p>
                  <p>
                    Is eCommerce:{" "}
                    {company?.extended_cr_info?.isEcommerce ? "Yes" : "No"}
                  </p>
                  <p>
                    Cancellation:{" "}
                    {company?.extended_cr_info?.cancellation || "---"}
                  </p>
                  <p>
                    Period:{" "}
                    {company?.extended_cr_info?.company?.period || "---"}
                  </p>
                  <p>
                    Start Date:{" "}
                    {company?.extended_cr_info?.company?.startDate || "---"}
                  </p>
                  <p>
                    End Date:{" "}
                    {company?.extended_cr_info?.company?.endDate || "---"}
                  </p>
                  {company?.extended_cr_info?.fiscalYear ? (
                    <>
                      <p>Fiscal year: </p>

                      <ul>
                        <li>
                          Day:{" "}
                          {company?.extended_cr_info?.fiscalYear?.day || ""}
                        </li>
                        <li>
                          Month:{" "}
                          {company?.extended_cr_info?.fiscalYear?.month || ""}
                        </li>
                        <li>
                          Calendar type:{" "}
                          {company?.extended_cr_info?.fiscalYear?.calendarType
                            ?.name || ""}
                        </li>
                      </ul>
                    </>
                  ) : (
                    <p>Fiscal year: ---</p>
                  )}
                </div>
                <div>
                  <hr />
                  <h4>Address</h4>
                  <p>
                    Website:{" "}
                    {company?.extended_cr_info?.address?.general?.website ||
                      "---"}
                  </p>
                  <p>
                    Address:{" "}
                    {company?.extended_cr_info?.address?.general?.address ||
                      "---"}
                  </p>
                  <p>
                    Email:{" "}
                    {company?.extended_cr_info?.address?.general?.email ||
                      "---"}
                  </p>
                  <p>
                    Fax 1:{" "}
                    {company?.extended_cr_info?.address?.general?.fax1 || "---"}
                  </p>
                  <p>
                    Fax 2:{" "}
                    {company?.extended_cr_info?.address?.general?.fax2 || "---"}
                  </p>
                  <p>
                    Telephone 1:{" "}
                    {company?.extended_cr_info?.address?.general?.telephone1 ||
                      "---"}
                  </p>
                  <p>
                    Telephone 2:{" "}
                    {company?.extended_cr_info?.address?.general?.telephone2 ||
                      "---"}
                  </p>
                  <p>
                    Postal Box 1:{" "}
                    {company?.extended_cr_info?.address?.general?.postalBox1 ||
                      "---"}
                  </p>
                  <p>
                    Postal Box 2:{" "}
                    {company?.extended_cr_info?.address?.general?.postalBox2 ||
                      "---"}
                  </p>
                  <p>
                    Building Number:{" "}
                    {company?.extended_cr_info?.address?.national
                      ?.buildingNumber || "---"}
                  </p>
                  <p>
                    Additional Number:{" "}
                    {company?.extended_cr_info?.address?.national
                      ?.additionalNumber || "---"}
                  </p>
                  <p>
                    Street Name:{" "}
                    {company?.extended_cr_info?.address?.national?.streetName ||
                      "---"}
                  </p>
                  <p>
                    City:{" "}
                    {company?.extended_cr_info?.address?.national?.city ||
                      "---"}
                  </p>
                  <p>
                    Zip Code:{" "}
                    {company?.extended_cr_info?.address?.national?.zipcode ||
                      "---"}
                  </p>
                  <p>
                    Unit Number:{" "}
                    {company?.extended_cr_info?.address?.national?.unitNumber ||
                      "---"}
                  </p>
                  <p>
                    UnDistrict:{" "}
                    {company?.extended_cr_info?.address?.national
                      ?.districtName || "---"}
                  </p>
                </div>
                <div>
                  <hr />
                  <h4>Owners</h4>
                  {company?.extended_cr_info?.parties &&
                    company?.extended_cr_info?.parties.length > 0 &&
                    company?.extended_cr_info?.parties?.map((user) => (
                      <>
                        {(user?.relation?.name === "رئيس مجلس الادارة" ||
                          user?.relation?.name === "مدير") && (
                          <div key={user?.id}>
                            <ul>
                              <li>Name: {user?.name || "---"}</li>
                            </ul>
                            <p>NIN/Iqama: {user?.identity?.id || "---"}</p>
                            <p>Address: {user?.address || "---"}</p>
                            <p>Date Of Birth: {user?.birthDate || "---"}</p>
                            <p>Shares Count: {user?.sharesCount || "---"}</p>
                            <p>Gross: {user?.gross || "---"}</p>
                            <p>Relation: {user?.relation?.name || "---"}</p>
                            <p>
                              Nationality: {user?.nationality?.name || "---"}
                            </p>
                          </div>
                        )}
                      </>
                    ))}
                </div>
                <div>
                  <hr />
                  <h4>Capital</h4>
                  <p>
                    Price per share:{" "}
                    {company?.extended_cr_info?.capital?.share?.sharePrice ||
                      "---"}
                  </p>
                  <p>
                    Number of shares:{" "}
                    {company?.extended_cr_info?.capital?.share?.sharesCount ||
                      "---"}
                  </p>
                  <p>
                    Paid amount:{" "}
                    {company?.extended_cr_info?.capital?.paidAmount || "---"}
                  </p>
                  <p>
                    Announced amount:{" "}
                    {company?.extended_cr_info?.capital?.announcedAmount ||
                      "---"}
                  </p>
                  <p>
                    Subscribed amount:{" "}
                    {company?.extended_cr_info?.capital?.subscribedAmount ||
                      "---"}
                  </p>
                </div>
                <div>
                  <hr />
                  <h4>ISIC</h4>
                  {company?.extended_cr_info?.activities?.isic &&
                    company?.extended_cr_info?.activities?.isic?.length > 0 &&
                    company?.extended_cr_info?.activities?.isic?.map((item) => (
                      <div key={item?.id}>
                        <ul>
                          <li>Name: {item?.name || "---"}</li>
                        </ul>
                        <p>Name (English): {item?.nameEn || "---"}</p>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>

        <Modal
          className="actv authorizationModal"
          show={showAuthorizationModal}
          onHide={() => {
            setShowAuthorizationModal(false);
          }}
        >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body className="p-0 mt-3">
            {companyInc?.mime_type === "application/pdf" ? (
              <embed
                src={companyInc?.path}
                type="application/pdf"
                style={{ height: "100vh", width: "100%" }}
              />
            ) : (
              <img src={companyInc?.path} alt="Authorization Latter" />
            )}
          </Modal.Body>
        </Modal>

        <Modal
          className="actv rejectModal compViewMore"
          show={showRejectModal}
          onHide={() => {
            setShowRejectModal(false);
          }}
        >
          <div style={{ padding: "20px" }}>
            <div
              className="btn-close-big"
              onClick={() => setShowRejectModal(false)}
            ></div>
            <Modal.Header closeButton>
              <Modal.Title>
                <h4>{t("application-rejected-successfully-label")}</h4>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-0 mt-3">
              <p>{t("application-rejected-desc-label")}</p>
              <textarea
                name="reject"
                onChange={(e) => setRejectReason(e.target.value)}
              ></textarea>
            </Modal.Body>
            <Modal.Footer>
              <button
                onClick={() => handleUpdateCompnayStatus(company, "DECLINED")}
                disabled={!rejectReason}
              >
                {loadingReject ? t("submitting-btn") : t("submit-btn")}
              </button>
            </Modal.Footer>
          </div>
        </Modal>

        <Modal
          className="actv companyDelete orderAcardModal"
          show={showDeleteModal}
          onHide={() => {
            setShowDeleteModal(false);
          }}
        >
          <div
            className="btn-close-big"
            onClick={() => setShowDeleteModal(false)}
          ></div>
          <Modal.Header closeButton>
            <Modal.Title>
              <h4>Delete company</h4>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="p-0 mt-3">
            <div style={{ padding: "0 20px 10px" }}>
              <p>
                Please verify the deletion of the company by entering its name (
                {company?.company_name}) in the following field:
              </p>
              <input type="text" value={company?.company_name} disabled />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button
              onClick={() => setShowDeleteModal(false)}
              className="btn-cancel"
            >
              {t("cancel-btn")}
            </button>
            <button onClick={handleDeleteCompany}>{t("confirm-btn")}</button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  loading: state.app.visible,
});
export default connect(mapStateToProps, {
  companyInc,
  companyDetail,
  updateCompanyStatus,
  deleteCompany,
})(ViewMore);
