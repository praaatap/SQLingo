"use client"

import { useState, useEffect } from "react"

export function Clock() {
    const [time, setTime] = useState<Date | null>(null)

    useEffect(() => {
        setTime(new Date())
        const timer = setInterval(() => {
            setTime(new Date())
        }, 1000)
        return () => clearInterval(timer)
    }, [])

    if (!time) return null

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        })
    }

    return (
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/3 border border-white/8 backdrop-blur-sm shadow-inner group transition-all duration-300 hover:border-primary/30">
            <div className="relative w-2 h-2">
                <div className="absolute inset-0 rounded-full bg-primary/40 animate-ping" />
                <div className="relative rounded-full w-2 h-2 bg-primary shadow-[0_0_8px_rgba(var(--primary),0.8)]" />
            </div>
            <span className="text-sm font-mono text-muted-foreground group-hover:text-foreground transition-colors">
                {formatTime(time)}
            </span>
        </div>
    )
}
