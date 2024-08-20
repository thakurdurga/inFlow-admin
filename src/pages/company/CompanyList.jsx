import CompanyListTable from "../../components/Tables/CompanyList";
import { useEffect, useMemo, useState } from "react";
import debounce from "lodash.debounce";
import { useTranslation } from "react-i18next";

const CompanyList = () => {
  const [filterCompany, setFilterCompany] = useState("");
  const [query, setQuery] = useState("");
  const { t } = useTranslation();

  useEffect(() => {
    return () => {
      companySearchDebounce.cancel();
    };
  });

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const companySearchDebounce = useMemo(() => {
    return debounce(handleChange, 300);
  }, []);

  return (
    <div className="settings-main-inner">
      <div className="settings-container">
        <div className="companies-list">
          <div className="inside-nav companies-list">
            <h2>{t("all-companies-label")}</h2>
            <div className="company-filters">
              <select
                className="select-field"
                onChange={(e) => setFilterCompany(e.target.value)}
                value={filterCompany}
              >
                <option value="" selected>
                  {t("filter-by-label")}
                </option>
                <option value="PENDING">{t("filter-by-pending-label")}</option>
                <option value="APPROVED">
                  {t("filter-by-Approved-label")}
                </option>
                <option value="DECLINED">
                  {t("filter-by-Declined-label")}
                </option>
              </select>
              <div className="search-wrap">
                <input
                  className="search-input company-search-input"
                  type="text"
                  placeholder="Search by name or CR"
                  value={query}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <CompanyListTable
            listFrom="company-list"
            filterCompany={filterCompany}
            query={query}
          />
        </div>
      </div>
    </div>
  );
};

export default CompanyList;
