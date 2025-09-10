import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080/api/v1',
  timeout: 10000,
})

/**
 * Optional: normalize Spring ProblemDetail errors for the UI.
 */
api.interceptors.response.use(
  (res) => res,
  (error) => {
    const resp = error?.response
    if (resp?.data) {
      const d = resp.data
      const message =
        d.detail ||
        d.title ||
        d.message ||
        `Request failed with status ${resp.status}`

      return Promise.reject({
        status: resp.status,
        message,
        data: d,
      })
    }
    return Promise.reject(error)
  }
)

export default api
