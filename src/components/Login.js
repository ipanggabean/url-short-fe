import { useState } from "react"
import { Redirect } from "react-router"
import { useAppContext } from "../libs/contextLibs";

// const history = createHashHistory()

const Login = () => {
  let [username, setUsername] = useState("")
  let [password, setPassword] = useState("")
  let [errorMessage, setErrorMessage] = useState("")
  let [isLoggedIn, setIsLoggedIn] = useState(false);

  const { isAuthenticated, setIsAuthenticated } = useAppContext();

  function processAuthentication() {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username, password: password })
    };
    fetch('http://localhost:8080/api/auth', requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.status)
        }
        return response.json()
      })
      .then(data => data.jwttoken)
      .then(token => sessionStorage.setItem("jwttoken", token))
      .then(() => setIsAuthenticated(true))
      .catch(error => {
        setErrorMessage(error.toString())
        console.error('There was an error!', error);
      });
  }

  if (isAuthenticated) {
    return null
  }

  return (
    <div className="row align-items-center g-lg-5 py-5">
      <div className="col-md-10 mx-auto col-lg-5">
        <div className="p-4 p-md-5 border rounded-3 bg-light">          
          <div className="form-floating mb-3">
            <input type="text" className="form-control" id="username" name="username" 
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              ></input>
            <label htmlFor="username">Username</label>
          </div>
          <div className="form-floating mb-3">
            <input type="password" className="form-control" id="password" name="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            ></input>
            <label htmlFor="password">Password</label>
          </div>
          <button className="w-100 btn btn-lg btn-primary"
            onClick={processAuthentication}
          >Login</button>

          { errorMessage &&
          <div class="alert alert-danger alert-dismissible fade show" role="alert">
            {errorMessage}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"
              onClick={() => setErrorMessage("")}
            ></button>
          </div>
        }
        </div>
      </div>
    </div>
  )
}

export default Login