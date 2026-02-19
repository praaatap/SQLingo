"use client"

import { useState, useEffect } from "react"
import { Download, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function PWAInstallPrompt() {
    const [showPrompt, setShowPrompt] = useState(false)
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null)

    useEffect(() => {
        const handler = (e: any) => {
            e.preventDefault()
            setDeferredPrompt(e)
            setShowPrompt(true)
        }

        window.addEventListener("beforeinstallprompt", handler)

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

    if (!showPrompt) return null

    return (
        <div className="fixed bottom-4 left-4 z-50 animate-in slide-in-from-bottom-5 fade-in duration-500">
            <div className="bg-card border border-border p-4 rounded-xl shadow-lg flex items-center gap-4 max-w-sm">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Download className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                    <p className="font-semibold text-foreground text-sm">Install SQL Practice</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Install the app for offline access</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={() => setShowPrompt(false)}>
                        <X className="h-4 w-4" />
                    </Button>
                    <Button size="sm" onClick={handleInstall} className="h-8">
                        Install
                    </Button>
                </div>
            </div>
        </div>
    )
}
