import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"

export function NavigationTracker() {
    const location = useLocation()
    const pathname = location.pathname
    const navigate = useNavigate()

    useEffect(() => {
        if (pathname === '/') {
            const hasRedirected = sessionStorage.getItem("sqlingo-redirected-session")
            const lastPath = localStorage.getItem("sqlingo-last-path")

            if (!hasRedirected && lastPath && lastPath !== '/') {
                sessionStorage.setItem("sqlingo-redirected-session", "true")
                navigate(lastPath)
            }
        } else if (pathname && !pathname.startsWith('/~')) {
            // Save current path if it's not root
            localStorage.setItem("sqlingo-last-path", pathname)
        }
    }, [pathname, navigate])

    return null
}
