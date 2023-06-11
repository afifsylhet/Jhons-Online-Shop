import React, { useState } from 'react';
import { Pagination, Dropdown } from 'react-bootstrap';

const Paginations = ({products, productCount, resultPerPage, currentPage, handlePageChange}) => {


  // Sample data for pagination
  const totalResults = productCount;
  const totalPages = Math.ceil(totalResults / resultPerPage);
  const paginationItems = [];

  for (let i = 1; i <= totalPages; i++) {
    paginationItems.push(
      <Pagination.Item
        key={i}
        active={i === currentPage}
        onClick={() => handlePageChange(i)}
      >
        {i}
      </Pagination.Item>
    );
  }

  return (
    <div>
      <Pagination>
        <Pagination.Prev
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />
        {paginationItems}
        <Pagination.Next
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
      </Pagination>
    </div>
  );
};

export default Paginations;


