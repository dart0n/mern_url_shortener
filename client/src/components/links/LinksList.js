import { Link } from 'react-router-dom'

export default function LinksList({ links }) {
  if (!links.length) {
    return <p className="center">No links yet</p>
  }
  return (
    <>
      <h3 className="mt-3">Links</h3>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Origin link</th>
            <th scope="col">Short link</th>
            <th scope="col">Show Info</th>
          </tr>
        </thead>
        <tbody>
          {links.map((link, index) => (
            <tr key={link._id}>
              <th scope="row">{index + 1}</th>
              <td>{link.url}</td>
              <td>{link.shortUrl}</td>
              <td>
                <Link to={`/links/${link._id}`}>Show</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
