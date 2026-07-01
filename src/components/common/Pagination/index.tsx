import type { PaginationProps } from "../../../types";

import styles from "./index.module.css";
import { GrNext, GrPrevious } from "react-icons/gr";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav className={styles.pagination} aria-label="Product pagination">
      <button
        type="button"
        aria-label="Go to previous page"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <GrPrevious aria-hidden />
      </button>

      <div className={styles.pages}>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <button
              key={page}
              type="button"
              aria-label={`Go to page ${page}`}
              aria-current={currentPage === page ? "page" : undefined}
              onClick={() => onPageChange(page)}
              className={currentPage === page ? styles.active : ""}
            >
              {page}
            </button>
          ),
        )}
      </div>

      <button
        type="button"
        aria-label="Go to next page"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <GrNext aria-hidden />
      </button>
    </nav>
  );
};

export default Pagination;
