"use client"

import React, { useEffect, useRef } from "react"

export function Starfield() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        let animationFrameId: number
        let stars: Star[] = []
        const starCount = 150

        class Star {
            x: number
            y: number
            size: number
            speed: number
            opacity: number

            constructor() {
                this.x = Math.random() * canvas!.width
                this.y = Math.random() * canvas!.height
                this.size = Math.random() * 1.5
                this.speed = Math.random() * 0.5 + 0.1
                this.opacity = Math.random()
            }

            update() {
                this.y -= this.speed
                if (this.y < 0) {
                    this.y = canvas!.height
                    this.x = Math.random() * canvas!.width
                }
            }

            draw() {
                ctx!.fillStyle = `rgba(255, 255, 255, ${this.opacity})`
                ctx!.beginPath()
                ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2)
                ctx!.fill()
            }
        }

        const resize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
            stars = []
            for (let i = 0; i < starCount; i++) {
                stars.push(new Star())
            }
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            stars.forEach((star) => {
                star.update()
                star.draw()
            })
            animationFrameId = requestAnimationFrame(animate)
        }

        resize()
        animate()

        window.addEventListener("resize", resize)

        return () => {
            window.removeEventListener("resize", resize)
            cancelAnimationFrame(animationFrameId)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none opacity-40"
            style={{ background: "transparent" }}
        />
    )
}
