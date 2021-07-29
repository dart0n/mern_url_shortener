import { useCallback, useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import useHttp from '../../hooks/useHttp'
import Loader from '../Loader'
import LinksList from './LinksList'

export default function Links() {
  const [links, setLinks] = useState([])
  const { loading, request } = useHttp()
  const { token } = useContext(AuthContext)

  const getLinks = useCallback(async () => {
    try {
      const response = await request('/api/links', 'GET', null, {
        Authorization: `Bearer ${token}`,
      })
      setLinks(response)
    } catch (e) {}
  }, [token, request])

  useEffect(() => {
    getLinks()
  }, [getLinks])

  if (loading) return <Loader />

  return <>{!loading && <LinksList links={links} />}</>
}
