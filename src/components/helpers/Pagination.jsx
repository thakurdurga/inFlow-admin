const Pagination = (props) => {
  return (
    <div className="pagination">
      {/* <div className="pagination-pages">
        Rows per page:
        <div class="select">
          <select
            value={props.pageSize}
            onChange={(e) => {
              props.handlePageSize(e.target.value);
            }}
          >
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
        </div>
      </div> */}

      {props.pageCount.length > 0 ? (
        <ul className="pagination-numbers">
          <li className="prev">
            <button
              onClick={props.handlePrev}
              disabled={props.currentPage === 1}
            >
              Prev
            </button>
          </li>

          {props.pageCount.map((pageNumber, index) => (
            <li
              key={index}
              onClick={() => props.handlePage(pageNumber)}
              style={{
                backgroundColor:
                  props.currentPage === pageNumber ? "#A537DC" : "",
                borderColor: props.currentPage === pageNumber ? "#A537DC" : "",
                color: props.currentPage === pageNumber ? "#fff" : "",
              }}
            >
              {pageNumber}
            </li>
          ))}

          <li className="next">
            <button
              onClick={props.handleNext}
              disabled={props.currentPage === props.totalPage}
            >
              Next
            </button>
          </li>
        </ul>
      ) : null}
    </div>
  );
};

export default Pagination;
