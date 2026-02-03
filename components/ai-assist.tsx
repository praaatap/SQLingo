"use client"

import { useState } from "react"
import { Sparkles, Settings, Loader2, Key, X, Check, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useAISettings, generateSQLSuggestion, type AIResponse } from "@/hooks/use-ai"
import { cn } from "@/lib/utils"

interface AIAssistButtonProps {
    questionTitle: string
    questionDescription: string
    schema: { name: string; columns: { name: string; type: string }[] }[]
    currentQuery: string
    errorMessage?: string
    onInsertSuggestion?: (suggestion: string) => void
}

export function AIAssistButton({
    questionTitle,
    questionDescription,
    schema,
    currentQuery,
    errorMessage,
    onInsertSuggestion,
}: AIAssistButtonProps) {
    const { geminiApiKey, setGeminiApiKey } = useAISettings()
    const [showSettings, setShowSettings] = useState(false)
    const [showResult, setShowResult] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [result, setResult] = useState<AIResponse | null>(null)
    const [apiKeyInput, setApiKeyInput] = useState(geminiApiKey || "")

    const handleSaveApiKey = () => {
        if (apiKeyInput.trim()) {
            setGeminiApiKey(apiKeyInput.trim())
            setShowSettings(false)
            setError(null)
        }
    }

    const handleRemoveApiKey = () => {
        setGeminiApiKey(null)
        setApiKeyInput("")
    }

    const handleGetSuggestion = async () => {
        if (!geminiApiKey) {
            setShowSettings(true)
            return
        }

        setLoading(true)
        setError(null)
        setResult(null)

        try {
            const response = await generateSQLSuggestion(
                geminiApiKey,
                questionTitle,
                questionDescription,
                schema,
                currentQuery,
                errorMessage
            )
            setResult(response)
            setShowResult(true)
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to get AI suggestion")
            setShowResult(true)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            {/* Main AI Button */}
            <div className="flex items-center gap-1">
                <Button
                    onClick={handleGetSuggestion}
                    disabled={loading}
                    size="sm"
                    variant="outline"
                    className={cn(
                        "gap-2 border-primary/30 hover:border-primary hover:bg-primary/10 text-primary",
                        "transition-all duration-300"
                    )}
                >
                    {loading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                        <Sparkles className="h-4 w-4" />
                    )}
                    <span className="hidden sm:inline">AI Hint</span>
                </Button>

                {/* Settings Button */}
                <Button
                    onClick={() => setShowSettings(true)}
                    size="sm"
                    variant="ghost"
                    className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                    title="AI Settings"
                >
                    <Settings className="h-4 w-4" />
                </Button>
            </div>

            {/* Settings Dialog */}
            <Dialog open={showSettings} onOpenChange={setShowSettings}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <Key className="h-5 w-5 text-primary" />
                            Gemini API Key
                        </DialogTitle>
                        <DialogDescription>
                            Enter your Google Gemini API key to enable AI-powered SQL hints.
                            Get a free key at{" "}
                            <a
                                href="https://aistudio.google.com/apikey"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:underline"
                            >
                                aistudio.google.com
                            </a>
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4">
                        <div className="flex gap-2">
                            <Input
                                type="password"
                                placeholder="Enter your Gemini API key..."
                                value={apiKeyInput}
                                onChange={(e) => setApiKeyInput(e.target.value)}
                                className="flex-1"
                            />
                        </div>

                        {geminiApiKey && (
                            <div className="flex items-center gap-2 p-3 rounded-lg bg-success/10 border border-success/20">
                                <Check className="h-4 w-4 text-success" />
                                <span className="text-sm text-success">API key is configured</span>
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    className="ml-auto h-6 text-xs text-muted-foreground hover:text-destructive"
                                    onClick={handleRemoveApiKey}
                                >
                                    Remove
                                </Button>
                            </div>
                        )}

                        <p className="text-xs text-muted-foreground">
                            Your API key is stored locally in your browser and never sent to our servers.
                        </p>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowSettings(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleSaveApiKey} disabled={!apiKeyInput.trim()}>
                            Save Key
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Result Dialog */}
            <Dialog open={showResult} onOpenChange={setShowResult}>
                <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <Sparkles className="h-5 w-5 text-primary" />
                            AI Suggestion
                        </DialogTitle>
                    </DialogHeader>

                    {error ? (
                        <div className="flex items-start gap-3 p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                            <AlertCircle className="h-5 w-5 text-destructive mt-0.5" />
                            <div>
                                <p className="font-medium text-destructive">Error</p>
                                <p className="text-sm text-muted-foreground mt-1">{error}</p>
                            </div>
                        </div>
                    ) : result ? (
                        <div className="space-y-4">
                            {/* Suggestion */}
                            <div className="space-y-2">
                                <h4 className="text-sm font-medium text-foreground">💡 Hint</h4>
                                <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                                    <pre className="text-sm whitespace-pre-wrap font-mono text-foreground/90">
                                        {result.suggestion}
                                    </pre>
                                </div>
                            </div>

                            {/* Explanation */}
                            <div className="space-y-2">
                                <h4 className="text-sm font-medium text-foreground">📝 Explanation</h4>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {result.explanation}
                                </p>
                            </div>
                        </div>
                    ) : null}

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowResult(false)}>
                            Close
                        </Button>
                        {result && onInsertSuggestion && (
                            <Button
                                onClick={() => {
                                    onInsertSuggestion(result.suggestion)
                                    setShowResult(false)
                                }}
                            >
                                Use This Hint
                            </Button>
                        )}
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}
