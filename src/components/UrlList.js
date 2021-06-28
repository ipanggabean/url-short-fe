const UrlList = ({urlList}) => {

  urlList = [
    {
      "alias": "b986d994",
      "url": "https://one.com/",
      "expired_time": "2022-06-23T15:38:37",
      "hit": 0
    },
    {
        "alias": "0669d834",
        "url": "https://two.com/",
        "expired_time": "2022-06-23T15:38:42",
        "hit": 0
    },
    {
        "alias": "5b36e5b5",
        "url": "https://three.com/",
        "expired_time": "2022-06-23T15:38:46",
        "hit": 0
    },
    {
        "alias": "27205e82",
        "url": "https://four.com/",
        "expired_time": "2022-06-23T15:38:51",
        "hit": 0
    },
    {
        "alias": "8b955b14",
        "url": "https://five.com/",
        "expired_time": "2022-06-23T15:38:54",
        "hit": 0
    }
  ]

  return (
    <div>
      <h1>Manage Short URL</h1>
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
            urlList
              .map(urlItem => (
                <tr>
                  <td><a href={"http://localhost:3000/" + urlItem.alias}>{urlItem.alias}</a></td>
                  <td>{urlItem.url}</td>
                  <td>{urlItem.hit}</td>
                  <td>{new Date(urlItem.expired_time).toLocaleString()}</td>
                  <td><button type="button" class="btn-close" aria-label="Close"></button></td>
                </tr>
              ))
          }          
        </tbody>
        </table>
      </div>
    </div>
  )
}
export default UrlList