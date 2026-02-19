"use client"

import { useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"

export function NavigationTracker() {
    const pathname = usePathname()
    const router = useRouter()

    useEffect(() => {
        // Only run on client mount
        if (typeof window === 'undefined') return

        // If we are at root, check if we should redirect
        if (pathname === '/') {
            const hasRedirected = sessionStorage.getItem("sqlingo-redirected-session")
            const lastPath = localStorage.getItem("sqlingo-last-path")

            if (!hasRedirected && lastPath && lastPath !== '/') {
                sessionStorage.setItem("sqlingo-redirected-session", "true")
                router.push(lastPath)
            }
        } else if (pathname && !pathname.startsWith('/~')) {
            // Save current path if it's not root
            localStorage.setItem("sqlingo-last-path", pathname)
        }
    }, [pathname, router])

    return null
}
