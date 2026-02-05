"use client"

import { Play, Send, RotateCcw, Database, Loader2, Table2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AIAssistButton } from "@/components/ai-assist"
import { cn } from "@/lib/utils"

interface EditorToolbarProps {
  onRun: () => void
  onSubmit: () => void
  onResetQuery: () => void
  onResetDb: () => void
  isRunning?: boolean
  isSubmitting?: boolean
  isDbLoading?: boolean
  schemaOpen?: boolean
  onToggleSchema?: () => void
  // AI Assist props
  questionTitle?: string
  questionDescription?: string
  schema?: { name: string; columns: { name: string; type: string }[] }[]
  currentQuery?: string
  errorMessage?: string
}

export function EditorToolbar({
  onRun,
  onSubmit,
  onResetQuery,
  onResetDb,
  isRunning,
  isSubmitting,
  isDbLoading,
  schemaOpen,
  onToggleSchema,
  onFormat,
  questionTitle = "",
  questionDescription = "",
  schema = [],
  currentQuery = "",
  errorMessage,
}: EditorToolbarProps & { onFormat?: () => void }) {
  return (
    <div className="flex items-center justify-between px-3 py-2 border-b border-border bg-card/80 backdrop-blur-sm">
      <div className="flex items-center gap-2">
        {/* Schema Toggle */}
        {onToggleSchema && (
          <Button
            onClick={onToggleSchema}
            size="sm"
            variant="ghost"
            className={cn(
              "gap-2 text-muted-foreground hover:text-foreground",
              schemaOpen && "bg-secondary text-foreground"
            )}
            title={schemaOpen ? "Hide schema (Ctrl+E)" : "Show schema (Ctrl+E)"}
          >
            <Table2 className="h-4 w-4" />
            <span className="hidden sm:inline">Schema</span>
          </Button>
        )}

        <div className="h-5 w-px bg-border mx-1" />

        {/* Run Button */}
        <Button
          onClick={onRun}
          disabled={isRunning || isDbLoading}
          size="sm"
          className={cn(
            "gap-2 bg-linear-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg shadow-emerald-500/20 border-0 transition-all active:scale-95"
          )}
        >
          {isRunning ? <Loader2 className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4 fill-current" />}
          Run
          <div className="hidden sm:flex items-center gap-1 ml-1 pl-2 border-l border-white/20">
            <kbd className="text-[10px] font-mono">Ctrl</kbd>
            <span className="text-[10px]">+</span>
            <kbd className="text-[10px] font-mono">Enter</kbd>
          </div>
        </Button>

        {/* Format Button */}
        {onFormat && (
          <Button
            onClick={onFormat}
            size="sm"
            variant="ghost"
            className="gap-2 text-muted-foreground hover:text-foreground"
            title="Format SQL query"
          >
            <span className="text-xs font-mono">{"{}"}</span>
            <span className="hidden sm:inline">Format</span>
          </Button>
        )}

        {/* Submit Button */}
        <Button
          onClick={onSubmit}
          disabled={isSubmitting || isDbLoading}
          size="sm"
          variant="secondary"
          className="gap-2 shadow-sm border border-transparent bg-secondary hover:bg-secondary/80 transition-all data-[state=success]:bg-green-500 data-[state=success]:text-white"
        >
          {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          Submit
        </Button>

        <div className="h-5 w-px bg-border mx-1" />

        {/* AI Assist Button */}
        <AIAssistButton
          questionTitle={questionTitle}
          questionDescription={questionDescription}
          schema={schema}
          currentQuery={currentQuery}
          errorMessage={errorMessage}
        />
      </div>

      <div className="flex items-center gap-1">
        <Button
          onClick={onResetQuery}
          size="sm"
          variant="ghost"
          className="gap-2 text-muted-foreground hover:text-foreground"
          title="Reset query to starter code"
        >
          <RotateCcw className="h-4 w-4" />
          <span className="hidden sm:inline">Reset Query</span>
        </Button>

        <Button
          onClick={onResetDb}
          disabled={isDbLoading}
          size="sm"
          variant="ghost"
          className="gap-2 text-muted-foreground hover:text-foreground"
          title="Reload the database"
        >
          {isDbLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Database className="h-4 w-4" />
          )}
          <span className="hidden sm:inline">Reset DB</span>
        </Button>
      </div>
    </div>
  )
}

