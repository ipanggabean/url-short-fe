import { useState } from 'react';
import UrlInput from './UrlInput';

const Home = () => {
  
  let [originalLink, setOriginalLink] = useState("")
  let [shortenLink, setShortenLink] = useState("")
  let [errorMessage, setErrorMessage] = useState("")

  function processShortLink(url) {
    setOriginalLink(url)

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: url })
    };
    fetch('http://localhost:8080/api/short', requestOptions)
      .then(response => response.json())
      .then(data => setShortenLink("http://localhost:3000/" + data.alias))
      .catch(error => {
        setErrorMessage(error.toString())
        console.error('There was an error!', error);
      });
  }

  return (
    <div className="col-md-10 mx-auto col-lg-5">
      <h1 className="text-center">URL Shortener</h1>
      
      <div className="p-5 border rounded-3 bg-light row">
        <UrlInput onCreateShort={url => processShortLink(url)}/>

        { shortenLink &&
          <div>
            <hr className="my-4"></hr>
            <p>Your link: <a href={originalLink}>{originalLink}</a></p>
            <p>Your shorten link: <a href={shortenLink}>{shortenLink}</a></p>
          </div>
        }
        
        { errorMessage &&
          <div className="alert alert-danger alert-dismissible fade show" role="alert">
            Uh ooh! Error: {errorMessage}
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