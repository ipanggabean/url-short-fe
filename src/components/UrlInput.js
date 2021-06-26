import { useState } from "react"

const UrlInput = ({onCreateShort}) => {
  let [originalLink, setOriginalLink] = useState("")

  function processCreateShort() {
    onCreateShort(originalLink)
    setOriginalLink("")
  }

  return (
    <div className="input-group mb-3">
      <i className="bi bi-link-45deg input-group-text bg-primary text-white"></i>
      <input 
        onChange={(event) => setOriginalLink(event.target.value)}
        value={originalLink}
        className="form-control" type="text" name="url_source" id="url_source" placeholder="URL to shorten here"></input>
      <button type="button" 
        onClick={processCreateShort}
        className="btn btn-primary">Shorten URL
      </button>
    </div>
  )
}

export default UrlInput