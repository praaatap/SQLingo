"use client"

import React, { useState } from "react"
import { Sparkles, Copy, Loader2, CheckCircle2 } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { generateNewSQLQuestion } from "@/hooks/use-ai"
import { useAISettings } from "@/hooks/use-ai"
import { toast } from "sonner"

interface GenerateQuestionDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function GenerateQuestionDialog({ open, onOpenChange }: GenerateQuestionDialogProps) {
    const [topic, setTopic] = useState("")
    const [difficulty, setDifficulty] = useState<"Easy" | "Medium" | "Hard">("Medium")
    const [isGenerating, setIsGenerating] = useState(false)
    const [generatedQuestion, setGeneratedQuestion] = useState<any>(null)
    const [copied, setCopied] = useState(false)

    const { geminiApiKey } = useAISettings()

    const handleGenerate = async () => {
        if (!geminiApiKey) {
            toast.error("Please set your Gemini API key in settings first")
            return
        }

        setIsGenerating(true)
        setGeneratedQuestion(null)

        try {
            const question = await generateNewSQLQuestion(geminiApiKey, topic, difficulty)
            setGeneratedQuestion(question)
            toast.success("Question generated successfully!")
        } catch (error: any) {
            console.error(error)
            toast.error(error.message || "Failed to generate question")
        } finally {
            setIsGenerating(false)
        }
    }

    const handleCopy = () => {
        if (!generatedQuestion) return

        const jsonString = JSON.stringify(generatedQuestion, null, 2)
        navigator.clipboard.writeText(jsonString)
        setCopied(true)
        toast.success("Question JSON copied to clipboard!")
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-primary" />
                        Generate SQL Question with AI
                    </DialogTitle>
                    <DialogDescription>
                        Specify a topic and difficulty, and Gemini will create a new practice problem for you.
                    </DialogDescription>
                </DialogHeader>

                {!generatedQuestion ? (
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="topic">Topic or Scenario (Optional)</Label>
                            <Input
                                id="topic"
                                placeholder="e.g. IPL Cricket, Hospital Management, Zomato Orders..."
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="difficulty">Difficulty</Label>
                            <Select value={difficulty} onValueChange={(val: any) => setDifficulty(val)}>
                                <SelectTrigger id="difficulty">
                                    <SelectValue placeholder="Select difficulty" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Easy">Easy</SelectItem>
                                    <SelectItem value="Medium">Medium</SelectItem>
                                    <SelectItem value="Hard">Hard</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                ) : (
                    <div className="py-4 space-y-4">
                        <div className="rounded-lg border bg-muted/50 p-4">
                            <h3 className="font-bold text-lg mb-1">{generatedQuestion.title}</h3>
                            <div className="flex items-center gap-2 mb-3">
                                <span className="text-xs font-mono bg-primary/10 text-primary px-2 py-0.5 rounded">
                                    {generatedQuestion.difficulty}
                                </span>
                                {generatedQuestion.tags?.map((tag: string) => (
                                    <span key={tag} className="text-[10px] font-mono bg-secondary px-2 py-0.5 rounded">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-3 mb-2">
                                {generatedQuestion.description}
                            </p>
                        </div>

                        <div className="bg-zinc-950 p-3 rounded-lg overflow-x-auto text-xs font-mono text-zinc-300 max-h-[200px]">
                            <pre>{JSON.stringify(generatedQuestion, null, 2)}</pre>
                        </div>

                        <p className="text-xs text-muted-foreground italic">
                            Note: This question is not automatically saved to the database. Copy the JSON and add it to `src/lib/questions.ts` or use the CLI script.
                        </p>
                    </div>
                )}

                <DialogFooter>
                    {!generatedQuestion ? (
                        <Button
                            onClick={handleGenerate}
                            className="w-full sm:w-auto gap-2"
                            disabled={isGenerating}
                        >
                            {isGenerating ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Generating...
                                </>
                            ) : (
                                <>
                                    <Sparkles className="h-4 w-4" />
                                    Generate Question
                                </>
                            )}
                        </Button>
                    ) : (
                        <div className="flex gap-2 w-full sm:w-auto">
                            <Button variant="outline" onClick={() => setGeneratedQuestion(null)} className="flex-1 sm:flex-none">
                                Reset
                            </Button>
                            <Button onClick={handleCopy} className="flex-1 sm:flex-none gap-2">
                                {copied ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                {copied ? "Copied!" : "Copy JSON"}
                            </Button>
                        </div>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
