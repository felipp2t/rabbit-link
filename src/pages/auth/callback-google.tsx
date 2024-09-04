import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const CallbackGoogle = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search)

    const token = queryParams.get("token")

    if (!token) {
      return navigate("/")
    }

    localStorage.setItem("token", token)
    navigate("/")
  }, [navigate])
  return (
    <div>
      <h1>Carregando...</h1>
    </div>
  )
}
