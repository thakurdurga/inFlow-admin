import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  getUserPreference,
  updateUserPreference,
  getSitePreference,
  updateSitePreference,
} from "../../stores/actions/user.actions.types";
import { useTranslation } from "react-i18next";

import { Modal } from "react-bootstrap";
import { useParams } from "react-router-dom";

const { PUBLIC_URL } = process.env;

const initialUserPreference = {
  email: "",
  first_name: "",
  last_name: "",
  phone: "",
};

const initialSitePreference = {
  color: "",
  font_size: "",
  dark_theme: null,
  otp_method: "",
};

const Cards = (props) => {
  const [showOrderAcard, setOrderAcard] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [loadingOrderAcard, setloadingOrderAcard] = useState(false);
  const { t } = useTranslation();

  return (
    <div className="settings-main-inner">
      <div className="settings-container">
        <section className="card-details-wrapper">
          <div className="titleWrapper">
            <h2 className="main-title">All Cards</h2>
            <div className="transactions-date-flter">
              <div className="company-filters">
                <div className="search-wrap">
                  <input
                    className="search-input company-search-input"
                    type="text"
                    placeholder="Search by last 4 digits"
                  />
                </div>
                <select className="select-field">
                  <option value="">All Cards</option>
                  <option value="CARD_ISSUED">Issued</option>
                  <option value="CARD_ACTIVE">Actived</option>
                  <option value="CARD_DISABLED">Disabled</option>
                  <option value="CARD_REPLACED">Replaced</option>
                </select>
              </div>
            </div>
            <a
              className="btn"
              onClick={() => {
                setOrderAcard(true);
              }}
            >
              Order Card
            </a>
          </div>
          <div className="table-row header col-count-6 hide-on-mobile">
            <div className="table-col">Card Number</div>
            <div className="table-col"> Expiration Date</div>
            <div className="table-col"> Remaining Limit</div>
            <div className="table-col"> Type</div>
            <div className="table-col"> Linked to</div>
            <div className="table-col align-left"> Actions</div>
          </div>{" "}
          {/* table-row header col-count-6 */}
          <div className="table-row col-count-6">
            <div className="table-col">
              <span className="mobileLabel">Card Number:</span>{" "}
              <img src={`${PUBLIC_URL}/images/master-card.png`} alt="" />{" "}
              <b>3201 ********* 958</b>
            </div>
            <div className="table-col">
              {" "}
              <span className="mobileLabel">Expiration Date:</span> 12 Jan 2024
            </div>
            <div className="table-col">
              <span className="mobileLabel">Remaining Limit:</span>$350.45
            </div>
            <div className="table-col">
              {" "}
              <span className="mobileLabel">Type:</span>
              <span className="btn btn-green">Virtual</span>
            </div>
            <div className="table-col">
              <span className="mobileLabel">Linked to:</span>Adam smith &nbsp;
              <img src={`${PUBLIC_URL}/images/settings.svg`} alt="" />
            </div>
            <div className="table-col">
              <span className="mobileLabel">Actions:</span>
              <a className="btn">Show Balance</a>
              <a className="btn">Deposit Fund</a>
              <a className="btn">Withdraw Request</a>
            </div>
          </div>{" "}
          {/* table-row col-count-6 */}
          <div className="table-row col-count-6">
            <div className="table-col">
              {" "}
              <img src={`${PUBLIC_URL}/images/master-card.png`} alt="" />{" "}
              <b>3201 ********* 958</b>
            </div>
            <div className="table-col">12 Jan 2024</div>
            <div className="table-col">$350.45</div>
            <div className="table-col">
              <span className="btn btn-green">Virtual</span>
            </div>
            <div className="table-col">
              Adam smith &nbsp;
              <img src={`${PUBLIC_URL}/images/settings.svg`} alt="" />
            </div>
            <div className="table-col">
              <a className="btn">Show Balance</a>
              <a className="btn">Deposit Fund</a>
              <a className="btn">Withdraw Request</a>
            </div>
          </div>{" "}
          {/* table-row col-count-6 */}
          <div className="table-row col-count-6">
            <div className="table-col">
              {" "}
              <img src={`${PUBLIC_URL}/images/master-card.png`} alt="" />{" "}
              <b>3201 ********* 958</b>
            </div>
            <div className="table-col">12 Jan 2024</div>
            <div className="table-col">$350.45</div>
            <div className="table-col">
              <span className="btn btn-green">Virtual</span>
            </div>
            <div className="table-col">
              Adam smith &nbsp;
              <img src={`${PUBLIC_URL}/images/settings.svg`} alt="" />
            </div>
            <div className="table-col">
              <a className="btn">Show Balance</a>
              <a className="btn">Deposit Fund</a>
              <a className="btn">Withdraw Request</a>
            </div>
          </div>{" "}
          {/* table-row col-count-6 */}
        </section>
        <div className="pagination">
          <div className="pagination-pages">
            Rows per page:
            <div className="select">
              <select>
                <option value="1">1</option>
                <option value="2">2</option>
              </select>
            </div>
          </div>
          <ul className="pagination-numbers">
            <li className="prev">
              {" "}
              <button> Prev </button>{" "}
            </li>
            <li> 1 </li>
            <li className="next">
              {" "}
              <button>Next</button>
            </li>
          </ul>
        </div>{" "}
        {/* pagination */}
      </div>

      <Modal
        className="actv orderAcardModal"
        show={showOrderAcard}
        onHide={() => {
          setOrderAcard(false);
        }}
      >
        <div
          className="btn-close-big"
          onClick={() => setOrderAcard(false)}
        ></div>
        <Modal.Header closeButton>
          <Modal.Title>
            <h4>Order a Card</h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <fieldset>
            <legend>Type of card</legend>
            <div>
              <input
                type="radio"
                id="physicalCard"
                name="cardType"
                value="physicalCard"
                checked
              />
              <span></span>
              <label for="huey">Physical Card</label>
            </div>
            <div>
              <input
                type="radio"
                id="virtualCard"
                name="cardType"
                value="virtualCard"
              />
              <span></span>
              <label for="dewey">Virtual Card</label>
            </div>
          </fieldset>
          <fieldset>
            <legend>Type of card account</legend>
            <select className="select-field">
              <option value="">Select Account</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </fieldset>
          <fieldset>
            <legend>Assign to Employee</legend>
            <select className="select-field">
              <option value="">Select Employee</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </fieldset>
          <fieldset>
            <legend>Set card limit</legend>
            <b>$500 ------$100000</b>
            <input type="text" placeholder="Enter Limit" />
          </fieldset>
          {/* success message */}
          <div className="cardOrderSuccess" style={{ display: "none" }}>
            <img src={`${PUBLIC_URL}/images/thumb-up.svg`} alt="" />
            <h2>Order Successfully placed</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur. Proin tincidunt lectus
              faucibus non id. Diam.
            </p>
            <button
              onClick={() => {
                setOrderAcard(false);
              }}
            >
              {" "}
              Done{" "}
            </button>
          </div>
          {/* .cardOrderSuccess success message */}
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-cancel"
            onClick={() => {
              setOrderAcard(false);
            }}
          >
            {" "}
            Cancel{" "}
          </button>
          <button> Order Card </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => ({
  loading: state.app.visible,
});
export default connect(mapStateToProps, {
  getUserPreference,
  updateUserPreference,
  getSitePreference,
  updateSitePreference,
})(Cards);
