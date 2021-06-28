import { useState, useEffect, useCallback } from "react"
import Login from "./Login"
import UrlList from "./UrlList";
import { AppContext } from "../libs/contextLibs";

const Admin = () => {

  let [sessionToken, setSessionToken] = useState("")
  let [urlList, setUrlList] = useState(null)
  let [errorMessage, setErrorMessage] = useState(null)

  let [search, setSearch] = useState("")
  let [sortBy, setSortBy] = useState("expiredTime")
  let [orderBy, setOrderBy] = useState("desc")
  let [size, setSize] = useState(5)
  let [page, setPage] = useState(0)

  function checkAuthentication() {
    if (!sessionToken) {
      var token = sessionStorage.getItem("jwttoken");
      setSessionToken(token)
    }
  }  

  useEffect(() => {
    checkAuthentication()
  }, [])

  function fetchData() {
    var searchQuery = (search.length > 0) ? "&search="+search : ""

    fetch(`http://localhost:8080/api/admin?page=${page}&size=${size}&sort=${sortBy},${orderBy}${searchQuery}`, {
      headers: new Headers({
        'Authorization': 'Bearer ' + sessionToken
      })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(response.status)
        }
        return response.json()
      })
      .then(data => {
        setUrlList(data)
      })
      .catch(error => {
        setErrorMessage(error.toString())
        console.error('There was an error!', error);
      });
  }

  useEffect(() => {
    if (sessionToken) {
      return fetchData()
    }
  },[sessionToken, sortBy, orderBy, size, search, page])

  function deleteItem(alias) {
    fetch(`http://localhost:8080/api/admin/${alias}`, {
      method: 'DELETE',
      headers: new Headers({
        'Authorization': 'Bearer ' + sessionToken
      })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(response.status)
        }
        fetchData()
      })
  }

  return (
    <AppContext.Provider value={{ sessionToken, setSessionToken }}>
      { errorMessage &&
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          Uh ooh! {errorMessage}
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"
            onClick={() => setErrorMessage("")}
          ></button>
        </div>
      }

      { !errorMessage && urlList ? (
          <UrlList 
            urlList={urlList}
            sortBy={sortBy}
            onSortByChange={sort => setSortBy(sort)}
            orderBy={orderBy}
            onOrderByChange={order => setOrderBy(order)}
            size={size}
            onSizeChange={size => setSize(size)}
            page={page}
            onPageChange={page => setPage(page)}
            search={search}
            onSearchChange={search => setSearch(search)}
            onDeleteItem={code => deleteItem(code)}
          />
        ) : (
          <Login />
        )
      }
    </AppContext.Provider>
  )
}
export default Admin