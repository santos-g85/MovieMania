import React from "react";

const Pagination = ({ page, totalPages, handlePrevious, handleNext }) => {
  return (
    <div className="my-3 d-flex justify-content-between align-items-center">
      <button
        className="px-3 py-1 m-1 text-center btn-primary"
        onClick={handlePrevious}
        disabled={page === 1}
      >
        Previous
      </button>
      <span>
        Page {page} of {totalPages}
      </span>
      <button
        className="px-3 py-1 m-1 text-center btn-primary"
        onClick={handleNext}
        disabled={page === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
