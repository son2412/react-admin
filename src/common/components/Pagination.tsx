import React from 'react';
import ReactJsPaginate from 'react-js-pagination';

function Pagination({ pageIndex, totalRow, pageSize, onPageChange }: paginate) {
  if (!totalRow) return null;
  return (
    <ReactJsPaginate activePage={pageIndex} itemsCountPerPage={pageSize} totalItemsCount={totalRow} pageRangeDisplayed={5} onChange={onPageChange} />
  );
}

export default Pagination;

interface paginate {
  pageIndex: number;
  totalRow: number;
  pageSize: number;
  onPageChange: any;
}
