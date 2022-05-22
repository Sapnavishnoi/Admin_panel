import React from "react";
import PropTypes from "prop-types";
import MuiPagination from "@mui/material/Pagination";

const Pagination = ({
  currentPage,
  totalEntries,
  pageSize,
  onChangePage: _onChangePage,
  rows,
}) => {

  const onChangePage = (_, newPage) => _onChangePage(newPage);

  if (typeof currentPage !== "number") return null;

  if (totalEntries <= pageSize) return null;

  return (
    <div style={{ padding: "10px 0", display: "flex", justifyContent: "center" }}>
      <MuiPagination
        color="primary"
        boundaryCount={2}
        defaultPage={1}
        page={currentPage}
        count={Math.ceil(totalEntries / pageSize)}
        siblingCount={2}
        size="large"
        onChange={onChangePage}
    />
    </div>
  );
};

Pagination.defaultProps = {
  rows: [],
  onChangePage: () => {},
  totalEntries: 0,
  pageSize: 0
};

Pagination.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.object),
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  onChangePage: PropTypes.func,
};

export default Pagination;
