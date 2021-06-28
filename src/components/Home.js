import { useState, useEffect } from 'react';
import UrlInput from './UrlInput';

const Home = () => {
  
  let [originalLink, setOriginalLink] = useState("")
  let [shortenLink, setShortenLink] = useState("")
  let [errorMessage, setErrorMessage] = useState("")
  let [expiredTime, setExpiredTime] = useState(null)

  function processShortLink(url) {
    setOriginalLink(url)

    fetch('http://localhost:8080/api/short', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: url, expired_time: expiredTime })
    })
      .then(response => {
        if (!response.ok) {
          if (response.status === 400) {
            throw new Error("URL is not valid")
          }
          throw new Error(response.status)
        }
        return response.json()
      })
      .then(data => setShortenLink("http://localhost:3000/" + data.alias))
      .catch(error => {
        setErrorMessage(error.toString())
        console.error('There was an error!', error);
      });
  }

  useEffect(() => {
    var date = new Date();
    date.setDate(date.getDate() + 1);
    setExpiredTime(date)
    return null
  }, []);

  return (
    <div className="col-md-10 mx-auto col-lg-8">
      <h1 className="text-center">URL Shortener</h1>
      
      <div className="p-5 border rounded-3 bg-light row">
        <UrlInput 
          onCreateShort={url => processShortLink(url)}
          expiredTime={expiredTime}
          onExpiredTimeChange={(time) => setExpiredTime(time)}
        />

        { shortenLink &&
          <div>
            <hr className="my-4"></hr>
            <p>Your link: <a href={originalLink}>{originalLink}</a></p>
            <p>Your shorten link: <a href={shortenLink}>{shortenLink}</a></p>
          </div>
        }
        
        { errorMessage &&
          <div className="alert alert-danger alert-dismissible fade show" role="alert">
            {errorMessage}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"
              onClick={() => setErrorMessage("")}
            ></button>
          </div>
        }
      </div>
    </div>
  )
}

export default Home