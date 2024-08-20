import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { companyCard } from "../../stores/actions/company.actions.types";
import { useEffect, useMemo, useState } from "react";
import debounce from "lodash.debounce";
import Pagination from "../helpers/Pagination";
import { format } from "date-fns";
const { PUBLIC_URL } = process.env;

const CompanyCardList = (props) => {
  const [filterCard, setFilterCard] = useState("");
  const [query, setQuery] = useState("");
  const [cardList, setCardList] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState([]);
  const [pageSize, setPageSize] = useState(2);

  const { t } = useTranslation();
  const companyId = props.companyId;

  useEffect(() => {
    if (companyId) {
      getCardList({
        last_digits: query ? query : "",
        card_status: filterCard ? filterCard : "",
        page: currentPage,
        size: pageSize,
      });
    }
  }, [companyId, query]);

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
      cardSearchDebounce.cancel();
    };
  });

  const handlePrev = () => {
    let filterQuery = {
      last_digits: query,
      card_status: filterCard,
      page: currentPage - 1,
      size: pageSize,
    };

    getCardList(filterQuery);
    setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    let filterQuery = {
      last_digits: query,
      card_status: filterCard,
      page: currentPage + 1,
      size: pageSize,
    };

    getCardList(filterQuery);
    setCurrentPage((prev) => prev + 1);
  };

  const handlePage = (pageNumber) => {
    let filterQuery = {
      last_digits: query,
      card_status: filterCard,
      page: pageNumber,
      size: pageSize,
    };

    getCardList(filterQuery);
    setCurrentPage(pageNumber);
  };

  const handlePageSize = (size) => {
    let filterQuery = {
      last_digits: query,
      card_status: filterCard,
      page: currentPage,
      size,
    };

    getCardList(filterQuery);
    setPageSize(size);
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const cardSearchDebounce = useMemo(() => {
    return debounce(handleChange, 300);
  }, []);

  const handleFilterByStatus = (card_status) => {
    let tempFilter = { last_digits: query ? query : "" };
    setFilterCard(card_status);
    if (card_status) {
      tempFilter = { ...tempFilter, card_status };
    } else {
      tempFilter = { ...tempFilter, page: currentPage, size: pageSize };
    }

    getCardList(tempFilter);
  };

  const getCardList = ({ last_digits, card_status, page, size }) => {
    const callback = (data) => {
      if (data.success) {
        setCardList(data?.data?.cards);
        setTotalPage(data?.data?.pagination_data?.total_pages);
        setCurrentPage(data?.data?.pagination_data?.current_page);
      } else {
        setCardList([]);
        setTotalPage(1);
        setCurrentPage(1);
      }
    };

    props.companyCard({
      callback,
      companyId,
      last_digits: last_digits ? last_digits : "",
      card_status: card_status ? card_status : "",
      page: page ? page : "",
      size: size ? size : "",
    });
  };

  return (
    <section className="cards-data">
      <h2 className="main-title">{t("label-card")}</h2>
      <div className="transactions-date-flter">
        <div className="company-filters">
          <div className="search-wrap">
            <input
              className="search-input company-search-input"
              type="text"
              placeholder={t("search-by-last-4-digits")}
              value={query}
              onChange={handleChange}
            />
          </div>
          <select
            className="select-field"
            onChange={(e) => handleFilterByStatus(e.target.value)}
            value={filterCard}
          >
            <option value="" selected>
              {t("all-cards")}
            </option>
            <option value="CARD_ISSUED">{t("issued-label")}</option>
            <option value="CARD_ACTIVE">{t("actived-label")}</option>
            <option value="CARD_DISABLED">{t("disabled-label")}</option>
            <option value="CARD_REPLACED">{t("replaced-label")}</option>
          </select>
        </div>{" "}
      </div>{" "}
      <div className="cards-data-list">
        <div className="table-row col-count-5 header hide-on-mobile">
          <div className="table-col">{t("label-card-number")}</div>
          <div className="table-col">{t("label-expiration-date")}</div>
          <div className="table-col">{t("label-remaining-limit-sar")}</div>
          <div className="table-col">{t("label-type")}</div>
          <div className="table-col">{t("label-linked-to")}</div>
        </div>
        {cardList?.map((card) => (
          <div className="table-row col-count-5" key={card.id}>
            <div className="table-col">
              <span className="mobileLabel">{t("label-card-number")}:</span>
              <img src={`${PUBLIC_URL}/images/emp1.png`} alt="back" />{" "}
              <b>{card?.cardMaskedNumber}</b>
            </div>
            <div className="table-col">
              <span className="mobileLabel">{t("label-expiration-date")}:</span>
              {format(card?.cardExpiryDate, "dd MMM yyyy")}
            </div>
            <div className="table-col">
              <span className="mobileLabel">
                {t("label-remaining-limit-sar")}:
              </span>
              370.45
            </div>
            <div className="table-col">
              <span className="mobileLabel">{t("label-type")}:</span>
              <span className="status status-active">{card?.cardType}</span>
            </div>
            <div className="table-col">
              <span className="mobileLabel">{t("label-linked-to")}:</span>
              {card?.cardholderName}
              <img src={`${PUBLIC_URL}/images/settings.svg`} alt="settings" />
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
    </section>
  );
};

const mapStateToProps = (state) => ({
  loading: state.app.visible,
});
export default connect(mapStateToProps, {
  companyCard,
})(CompanyCardList);
