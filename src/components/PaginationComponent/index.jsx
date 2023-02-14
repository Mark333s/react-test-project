import React from "react";
import ReactPaginate from "react-paginate";

import styles from "./Pagination.module.css";

export const Pagination = ({ currentPage, onChangePage }) => {
  console.log(currentPage, "currentPage");
  return (
    <>
      {currentPage > 6 ? (
        <ReactPaginate
          className={styles.root}
          activeClassName={styles.active}
          breakLabel="..."
          onPageChange={(event) => onChangePage(event.selected + 1)}
          pageRangeDisplayed={4}
          pageCount={7}
          forcePage={currentPage - 1}
          renderOnZeroPageCount={null}
          previousLabel="Previous"
          nextLabel="..."
        />
      ) : (
        <ReactPaginate
          className={styles.root}
          activeClassName={styles.active}
          breakLabel="..."
          onPageChange={(event) => onChangePage(event.selected + 1)}
          pageRangeDisplayed={4}
          pageCount={7}
          forcePage={currentPage - 1}
          previousLabel="Previous"
          renderOnZeroPageCount={null}
          nextLabel="Next"
        />
      )}
    </>
  );
};
