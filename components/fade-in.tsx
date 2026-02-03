"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface FadeInProps {
    children: React.ReactNode
    className?: string
    delay?: number
    direction?: "up" | "down" | "left" | "right" | "none"
}

export function FadeIn({ children, className, delay = 0, direction = "up" }: FadeInProps) {
    const [isVisible, setIsVisible] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                    observer.unobserve(entry.target)
                }
            },
            {
                threshold: 0.1,
                rootMargin: "0px 0px -50px 0px",
            }
        )

        if (ref.current) {
            observer.observe(ref.current)
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current)
            }
        }
    }, [])

    const getDirectionClass = () => {
        switch (direction) {
            case "up":
                return "translate-y-8"
            case "down":
                return "-translate-y-8"
            case "left":
                return "translate-x-8"
            case "right":
                return "-translate-x-8"
            default:
                return ""
        }
    }

    return (
        <div
            ref={ref}
            className={cn(
                "transition-all duration-1000 ease-out",
                isVisible ? "opacity-100 translate-y-0 translate-x-0 blur-0" : `opacity-0 blur-sm ${getDirectionClass()}`,
                className
            )}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    )
}
