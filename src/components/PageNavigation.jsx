import React from "react";

const PageNavigation = props => {
  console.log(props);
  const { changePage, totalPages, currentPage, limit } = props;
  const numberButtons = [];
  const pageTotal = Math.ceil(totalPages / limit);
  // array from
  for (let i = 1; i <= pageTotal; i++) {
    numberButtons.push(i);
  }
  if (totalPages > 0) {
    return (
      <div>
        {currentPage !== 1 && (
          <button onClick={() => changePage(-1)}>back</button>
        )}
        {pageTotal !== 1 &&
          numberButtons.map(numberButton => {
            return (
              <button
                key={numberButton}
                onClick={() => changePage(numberButton, "replace")}
              >
                {numberButton}
              </button>
            );
          })}
        {currentPage !== pageTotal && (
          <button onClick={() => changePage(1)}>next</button>
        )}
      </div>
    );
  } else return null;
};

export default PageNavigation;
