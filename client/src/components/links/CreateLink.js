import { useContext, useState } from 'react'
import { useHistory } from 'react-router'
import { AuthContext } from '../../context/AuthContext'
import useHttp from '../../hooks/useHttp'

export default function CreateLink() {
  const [url, setUrl] = useState('')
  const history = useHistory()
  const { request } = useHttp()
  const { token } = useContext(AuthContext)

  const createUrl = async () => {
    try {
      const response = await request(
        '/api/links',
        'POST',
        { url },
        { Authorization: `Bearer ${token}` }
      )
      history.push(`/links/${response.link._id}`)
    } catch (e) {}
  }

  return (
    <div className="mt-2">
      <h3>Create short url</h3>

      <div>
        <div className="mb-3">
          <label className="form-label">
            Url
            <input
              type="text"
              className="form-control"
              value={url}
              required
              onChange={(e) => setUrl(e.target.value)}
            />
          </label>
        </div>

        <button type="submit" className="btn btn-primary" onClick={createUrl}>
          Create
        </button>
      </div>
    </div>
  )
}
