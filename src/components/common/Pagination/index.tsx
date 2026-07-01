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
    <div className={styles.pagination}>
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <GrPrevious />
      </button>

      <div className={styles.pages}>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={currentPage === page ? styles.active : ""}
            >
              {page}
            </button>
          ),
        )}
      </div>

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <GrNext />
      </button>
    </div>
  );
};

export default Pagination;
