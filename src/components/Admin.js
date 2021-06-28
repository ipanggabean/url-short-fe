import { useState, useEffect, useCallback } from "react"
import Login from "./Login"
import UrlList from "./UrlList";
import { AppContext } from "../libs/contextLibs";

const Admin = () => {

  let [isAuthenticated, setIsAuthenticated] = useState(false)
  let [urlList, setUrlList] = useState([])

  return (
    <AppContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <Login />
      { isAuthenticated &&
        <UrlList urlList={urlList}/>
      }
    </AppContext.Provider>
  )
}
export default Admin