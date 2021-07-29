import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import useHttp from '../../hooks/useHttp'
import Message from '../Message'

export default function AuthForm({ signup = false }) {
  const auth = useContext(AuthContext)

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    passwordConfirmation: '',
  })
  const [hasErrors, setHasErrors] = useState(false)
  const [successMessage, setsSuccessMessage] = useState(null)

  const { loading, request, error, clearError } = useHttp()

  useEffect(() => {
    if (error) {
      setHasErrors(true)
    }
  }, [error])

  const changeHandler = (event) => {
    // change value for email or password
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    clearError()
    setHasErrors(false)

    const url = signup ? '/api/auth/signup' : '/api/auth/signin'

    try {
      const data = await request(url, 'POST', { ...formData })
      if (signup) {
        setsSuccessMessage(data.message)
      } else {
        auth.login(data.token, data.userId)
      }
    } catch (e) {}
  }

  return (
    <div className="col-8 mx-auto">
      <h2 className="mt-3">Sign {signup ? 'Up' : 'In'}</h2>

      <form onSubmit={submitHandler}>
        {hasErrors && <Message color="danger" text={error} />}
        {successMessage && <Message color="primary" text={successMessage} />}

        <div className="mb-3">
          <label className="form-label">
            Email
            <input
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={changeHandler}
              required
            />
          </label>
        </div>
        <div className="mb-3">
          <label className="form-label">
            Password
            <input
              type="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={changeHandler}
              required
            />
          </label>
        </div>
        {signup && (
          <div className="mb-3">
            <label className="form-label">
              Repeat password
              <input
                type="password"
                name="passwordConfirmation"
                className="form-control"
                value={formData.passwordConfirmation}
                onChange={changeHandler}
                required
              />
            </label>
          </div>
        )}

        <button type="submit" className="btn btn-primary" disabled={loading}>
          Sign {signup ? 'Up' : 'In'}
        </button>
      </form>

      <p className="mt-3">
        Or{' '}
        <Link to={signup ? '/signin' : '/signup'}>
          {signup ? 'Sign In' : 'Sign Up'}
        </Link>
      </p>
    </div>
  )
}
