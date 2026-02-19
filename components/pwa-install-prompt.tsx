"use client"

import { useState, useEffect } from "react"
import { Download, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function PWAInstallPrompt() {
    const [showPrompt, setShowPrompt] = useState(false)
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
    const [showIOSPrompt, setShowIOSPrompt] = useState(false)
    const [isIOS, setIsIOS] = useState(false)

    useEffect(() => {
        // Check if device is iOS
        const isIosDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
        setIsIOS(isIosDevice);

        const handler = (e: any) => {
            e.preventDefault()
            setDeferredPrompt(e)
            setShowPrompt(true)
        }

        window.addEventListener("beforeinstallprompt", handler)

        // Show iOS prompt if not in standalone mode
        if (isIosDevice && !(window.navigator as any).standalone) {
            // Only show iOS prompt if user hasn't dismissed it before (could add localStorage logic here)
            setShowIOSPrompt(true)
        }

        return () => {
            window.removeEventListener("beforeinstallprompt", handler)
        }
    }, [])

    const handleInstall = async () => {
        if (!deferredPrompt) return

        deferredPrompt.prompt()
        const { outcome } = await deferredPrompt.userChoice

        if (outcome === 'accepted') {
            setShowPrompt(false)
        }
        setDeferredPrompt(null)
    }

    if (!showPrompt && !showIOSPrompt) return null

    return (
        <div className="fixed bottom-4 left-4 right-4 z-50 flex justify-center animate-in slide-in-from-bottom-5 fade-in duration-500 pointer-events-none">
            <div className="bg-card border border-border p-4 rounded-xl shadow-lg flex flex-col sm:flex-row items-center gap-4 max-w-sm w-full pointer-events-auto">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Download className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 text-center sm:text-left">
                    <p className="font-semibold text-foreground text-sm">Install SQL Practice</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                        {isIOS
                            ? "Tap 'Share' and 'Add to Home Screen' to install"
                            : "Install the app for offline access and better experience"}
                    </p>
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                    <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0"
                        onClick={() => {
                            setShowPrompt(false)
                            setShowIOSPrompt(false)
                        }}
                    >
                        <X className="h-4 w-4" />
                    </Button>
                    {!isIOS && (
                        <Button size="sm" onClick={handleInstall} className="h-8 flex-1 sm:flex-none">
                            Install
                        </Button>
                    )}
                </div>
            </div>
        </div>
    )
}
