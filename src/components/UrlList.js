const UrlList = ({urlList, 
  sortBy,
  onSortByChange,
  orderBy,
  onOrderByChange,
  size,
  onSizeChange,
  page,
  onPageChange,
  search,
  onSearchChange,
  onDeleteItem}) => {

  const paginationButtons = []

  for (let i of [...Array(urlList.totalPages).keys()]) {
    paginationButtons.push(
      <li key={i} className={`page-item ${i===urlList.pageable.pageNumber ? 'active' : ''}`}>
        <button className="page-link"
          onClick={() => onPageChange(i)}
        >{i+1}</button>
      </li>
    )
  }

  return (
    <div>
      <h1>Manage Short URL</h1>

      {/* Table header */}
      <div className="row mb-2 py-2">

        {/* Page size */}
        <div className="col-md">
          <label className="d-flex align-items-center">
            Show
            <select className="form-select form-select-sm w-auto mx-2"
              onChange={(event) => onSizeChange(event.target.value)}
              value={size}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </select>
            entries
          </label>
        </div>

        {/* Search */}
        <div className="col-md">
          <label className="d-flex align-items-center justify-content-end">
            Search:
            <input type="search" className="form-control form-control-sm w-auto mx-2"
              onChange={(event) => onSearchChange(event.target.value)}
              value={search}
            ></input>
            Sort By:
            <select className="form-select form-select-sm w-auto ms-2"
              onChange={(event) => onSortByChange(event.target.value)}
              value={sortBy}
            >
              <option value="url">URL</option>
              <option value="hit">Hit count</option>
              <option value="expiredTime">Expired time</option>
            </select>
            <select className="form-select form-select-sm w-auto"
              onChange={(event) => onOrderByChange(event.target.value)}
              value={orderBy}
            >
              <option value="asc">ASC</option>
              <option value="desc">DESC</option>
            </select>
          </label>
        </div>
      </div>

      {/* List table */}
      <div className="table-responsive">
        <table className="table table-striped table-sm">
        <thead className="table-light">
          <tr>
            <th scope="col">#</th>
            <th scope="col">URL</th>
            <th scope="col">Hit</th>
            <th scope="col">Expired</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {
            (!urlList.empty) ?
            urlList.content
              .map(urlItem => (
                <tr key={urlItem.alias}>
                  <td><a href={window.location.href + urlItem.alias}>{urlItem.alias}</a></td>
                  <td>{urlItem.url}</td>
                  <td>{urlItem.hit}</td>
                  <td>{new Date(urlItem.expired_time).toLocaleString()}</td>
                  <td className="text-end">
                    <button type="button" className="btn-close" aria-label="Close"
                      onClick={() => onDeleteItem(urlItem.alias)}
                    ></button>
                  </td>
                </tr>
              ))
            :
            <tr>
              <td colSpan="5">No data</td>
            </tr>
          }          
        </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="row">
        <div className="col-md">
          <small>Showing {urlList.pageable.offset + 1} to {urlList.pageable.offset + urlList.numberOfElements} of {urlList.totalElements} entries</small>
        </div>
        <div className="col-md">
          <ul className="pagination pagination-sm justify-content-end">
            <li className={`page-item ${urlList.first ? 'disabled' : ''}`}>
              <button className="page-link"
                onClick={() => onPageChange(urlList.pageable.pageNumber-1)}              
              >Previous</button>
            </li>
            {paginationButtons}
            <li className={`page-item ${urlList.last ? 'disabled' : ''}`}>
              <button className="page-link"                
                onClick={() => onPageChange(urlList.pageable.pageNumber+1)}    
              >Next</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
export default UrlList