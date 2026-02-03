"use client"

import { useState, useRef, useCallback, useEffect, type ReactNode } from "react"
import { cn } from "@/lib/utils"

interface ResizablePanelProps {
  direction: "horizontal" | "vertical"
  defaultSize: number
  minSize?: number
  maxSize?: number
  children: ReactNode
  className?: string
}

export function ResizablePanel({
  direction,
  defaultSize,
  minSize = 100,
  maxSize = 800,
  children,
  className,
}: ResizablePanelProps) {
  const [size, setSize] = useState(defaultSize)
  const isResizing = useRef(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = useCallback(() => {
    isResizing.current = true
    document.body.style.cursor = direction === "horizontal" ? "col-resize" : "row-resize"
    document.body.style.userSelect = "none"
  }, [direction])

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isResizing.current || !containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      let newSize: number

      if (direction === "horizontal") {
        newSize = e.clientX - rect.left
      } else {
        newSize = rect.bottom - e.clientY
      }

      newSize = Math.max(minSize, Math.min(maxSize, newSize))
      setSize(newSize)
    },
    [direction, minSize, maxSize]
  )

  const handleMouseUp = useCallback(() => {
    isResizing.current = false
    document.body.style.cursor = ""
    document.body.style.userSelect = ""
  }, [])

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [handleMouseMove, handleMouseUp])

  const style =
    direction === "horizontal"
      ? { width: size, minWidth: minSize, maxWidth: maxSize }
      : { height: size, minHeight: minSize, maxHeight: maxSize }

  return (
    <div
      ref={containerRef}
      className={cn("relative flex-shrink-0", className)}
      style={style}
    >
      {children}

      {/* Resize Handle */}
      <div
        onMouseDown={handleMouseDown}
        className={cn(
          "absolute z-10 transition-colors",
          direction === "horizontal"
            ? "top-0 right-0 w-1 h-full cursor-col-resize hover:bg-primary/50"
            : "left-0 bottom-0 w-full h-1 cursor-row-resize hover:bg-primary/50"
        )}
      />
    </div>
  )
}
