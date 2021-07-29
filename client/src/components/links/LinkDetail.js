import { useCallback, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { AuthContext } from '../../context/AuthContext'
import useHttp from '../../hooks/useHttp'
import Loader from '../Loader'

export default function LinkDetail() {
  const [link, setLink] = useState(null)
  const linkId = useParams().id
  const { request, loading } = useHttp()
  const { token } = useContext(AuthContext)

  const getLink = useCallback(async () => {
    try {
      const response = await request(`/api/links/${linkId}`, 'GET', null, {
        Authorization: `Bearer ${token}`,
      })
      setLink(response)
    } catch (e) {}
  }, [token, linkId, request])

  useEffect(() => {
    getLink()
  }, [getLink])

  if (loading) return <Loader />

  return (
    <>
      {!loading && link && (
        <div className="mt-3">
          <p>
            Short link:{' '}
            <a href={link.shortUrl} target="_blank" rel="noopener noreferrer">
              {link.shortUrl}
            </a>
          </p>
          <p>
            Your link:{' '}
            <a href={link.url} target="_blank" rel="noopener noreferrer">
              {link.url}
            </a>
          </p>
          <p>
            Number of clicks: <strong>{link.clicks}</strong>
          </p>
          <p>
            Created at:{' '}
            <strong>{new Date(link.createdAt).toLocaleDateString()}</strong>
          </p>
        </div>
      )}
    </>
  )
}
