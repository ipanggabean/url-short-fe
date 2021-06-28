import { useParams } from "react-router";
import { useCallback, useEffect, useState } from "react";

const Extract = () => {
  let { id } = useParams();
  let [errorMessage, setErrorMessage] = useState("")

  const fetchOriginalLink = useCallback(() => {
    fetch(`http://localhost:8080/api/short/${encodeURIComponent(id)}`)
      .then(response => {
        if (!response.ok) {
          if (response.status === 410) {
            throw new Error("URL is already disabled")
          }
          throw new Error(response.status)
        }
        return response.json()
      })
      .then(data => data.url)
      .then(url => window.location = url)
      .catch(error => {
        setErrorMessage(error.toString())
        console.error('There was an error!', error);
      });
  },[])

  useEffect(() => {
    fetchOriginalLink()
  }, [fetchOriginalLink])

  return (
    <div className="container">
      { errorMessage &&
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          {errorMessage}
        </div>
      }
    </div>
  )
}

export default Extract