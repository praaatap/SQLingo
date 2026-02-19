"use client"

import Link from "next/link"
import { WifiOff, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function OfflinePage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-6 text-center">
            <div className="w-20 h-20 rounded-full bg-muted/30 flex items-center justify-center mb-6">
                <WifiOff className="h-10 w-10 text-muted-foreground" />
            </div>

            <h1 className="text-3xl font-bold mb-3">You are offline</h1>
            <p className="text-muted-foreground max-w-md mb-8">
                It seems you've lost your internet connection.
                You can still practice solving problems if you've visited them before!
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
                <Button onClick={() => window.location.reload()} className="gap-2">
                    <RotateCcw className="h-4 w-4" />
                    Try Reconnecting
                </Button>
            </div>
        </div>
    )
}
