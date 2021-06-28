import { useParams } from "react-router";
import { useCallback, useEffect } from "react";

const Extract = () => {
  let { id } = useParams();

  const fetchOriginalLink = useCallback(() => {
    fetch(`http://localhost:8080/api/short/${encodeURIComponent(id)}`)
      .then(response => response.json())
      .then(data => data.url)
      .then(url => window.location = url)
      .catch(error => {
        console.error('There was an error!', error);
    });
  },[])

  useEffect(() => {
    fetchOriginalLink()
  }, [fetchOriginalLink])

  return null
}

export default Extract