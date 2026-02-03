"use client"

import ReactMarkdown from "react-markdown"
import { cn } from "@/lib/utils"
import {
  Lightbulb,
  Lock,
  ChevronLeft,
  ChevronRight,
  FileText,
  BookOpen,
  Target,
  Trophy,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Question } from "@/lib/questions"
import Link from "next/link"

interface QuestionPanelProps {
  question: Question
  hintsUnlocked: boolean
  attempts: number
  prevQuestionId?: string
  nextQuestionId?: string
}

export function QuestionPanel({
  question,
  hintsUnlocked,
  attempts,
  prevQuestionId,
  nextQuestionId,
}: QuestionPanelProps) {
  const showHints = hintsUnlocked || attempts >= 2

  return (
    <div className="flex flex-col h-full bg-card">
      {/* Header */}
      <div className="px-4 py-4 border-b border-border bg-gradient-to-b from-card to-transparent">
        <div className="flex items-center justify-between mb-3">
          <Link
            href="/problems"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <FileText className="h-4 w-4" />
            All Problems
          </Link>
          <div className="flex items-center gap-1">
            {prevQuestionId && (
              <Link href={`/problems/${prevQuestionId}`}>
                <Button variant="ghost" size="icon" className="h-8 w-8" title="Previous problem">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              </Link>
            )}
            {nextQuestionId && (
              <Link href={`/problems/${nextQuestionId}`}>
                <Button variant="ghost" size="icon" className="h-8 w-8" title="Next problem">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            )}
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary font-bold text-lg shrink-0">
            {question.id}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-semibold text-foreground leading-tight">{question.title}</h1>
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <DifficultyBadge difficulty={question.difficulty} />
              {question.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 text-xs bg-secondary text-secondary-foreground rounded font-mono"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Description */}
        <div className="p-4 border-b border-border/50">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">Problem Description</h3>
          </div>
          <div className="prose prose-invert prose-sm max-w-none">
            <ReactMarkdown
              components={{
                h3: ({ children }) => (
                  <h3 className="text-sm font-semibold text-foreground mt-4 mb-2">{children}</h3>
                ),
                p: ({ children }) => (
                  <p className="text-sm text-foreground/80 leading-relaxed mb-3">{children}</p>
                ),
                code: ({ children }) => (
                  <code className="px-1.5 py-0.5 bg-primary/10 text-primary font-mono text-xs rounded">
                    {children}
                  </code>
                ),
                table: ({ children }) => (
                  <div className="overflow-x-auto my-3 rounded-lg border border-border">
                    <table className="w-full text-sm">{children}</table>
                  </div>
                ),
                th: ({ children }) => (
                  <th className="px-3 py-2 text-left font-medium text-foreground bg-secondary/50 border-b border-border text-xs">
                    {children}
                  </th>
                ),
                td: ({ children }) => (
                  <td className="px-3 py-2 text-foreground/80 border-b border-border/50 font-mono text-xs">
                    {children}
                  </td>
                ),
                strong: ({ children }) => (
                  <strong className="font-semibold text-foreground">{children}</strong>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc list-inside space-y-1 text-sm text-foreground/80">
                    {children}
                  </ul>
                ),
                li: ({ children }) => <li className="text-foreground/80">{children}</li>,
              }}
            >
              {question.description}
            </ReactMarkdown>
          </div>
        </div>

        {/* Constraints */}
        {question.constraints && question.constraints.length > 0 && (
          <div className="p-4 border-b border-border/50">
            <div className="flex items-center gap-2 mb-3">
              <Target className="h-4 w-4 text-warning" />
              <h4 className="text-sm font-semibold text-foreground">Constraints</h4>
            </div>
            <ul className="space-y-2">
              {question.constraints.map((constraint, idx) => (
                <li
                  key={`constraint-${idx}`}
                  className="text-sm text-muted-foreground flex items-start gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-warning rounded-full mt-2 shrink-0" />
                  {constraint}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Hints */}
        <div className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="h-4 w-4 text-warning" />
            <h4 className="text-sm font-semibold text-foreground">Hints</h4>
            {!showHints && (
              <span className="text-xs text-muted-foreground ml-auto">
                Unlocks after {2 - attempts} more attempt{2 - attempts !== 1 ? "s" : ""}
              </span>
            )}
          </div>

          {showHints ? (
            <ul className="space-y-2">
              {question.hints.map((hint, idx) => (
                <li
                  key={`hint-${idx}`}
                  className="text-sm text-muted-foreground bg-warning/5 border border-warning/10 px-3 py-2.5 rounded-lg flex items-start gap-2"
                >
                  <span className="text-warning font-medium shrink-0">{idx + 1}.</span>
                  {hint}
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex items-center gap-3 text-sm text-muted-foreground bg-secondary/30 px-4 py-3 rounded-lg border border-border">
              <Lock className="h-4 w-4 shrink-0" />
              <span>Submit your solution to unlock hints</span>
            </div>
          )}
        </div>

        {/* Tags */}
        {question.tags.length > 3 && (
          <div className="px-4 pb-4">
            <div className="flex items-center gap-2 mb-3">
              <Trophy className="h-4 w-4 text-primary" />
              <h4 className="text-sm font-semibold text-foreground">Related Topics</h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {question.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 text-xs bg-secondary text-secondary-foreground rounded-md font-mono"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function DifficultyBadge({ difficulty }: { difficulty: Question["difficulty"] }) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-md",
        difficulty === "Easy" && "bg-success/15 text-success",
        difficulty === "Medium" && "bg-warning/15 text-warning",
        difficulty === "Hard" && "bg-destructive/15 text-destructive"
      )}
    >
      {difficulty}
    </span>
  )
}
