function Pagination({ postsPerPage, totalPosts, currentPage, paginate }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handlePageClick = (number) => {
    paginate(number);
  };

  let displayedPageNumbers = [];

  if (pageNumbers.length > 5) {
    if (currentPage <= 3) {
      displayedPageNumbers = [1, 2, 3, pageNumbers[2]+1,'...', pageNumbers.length];
    } else if (currentPage >= pageNumbers.length - 2) {
      displayedPageNumbers = [1, '...', pageNumbers.length-3, pageNumbers.length - 2, pageNumbers.length - 1, pageNumbers.length];
    } else {
      displayedPageNumbers = [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', pageNumbers.length];
    }
  } else {
    displayedPageNumbers = pageNumbers;
  }

  return (
    <ul className="pagination">
      {displayedPageNumbers.map((number, index) => (
        <li key={index} className={currentPage === number ? "selected-page" : 'page-number'}>
          <a href="#" onClick={() => handlePageClick(number)} className="page-link">
            {number}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default Pagination;
