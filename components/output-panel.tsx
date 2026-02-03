"use client"

import React from "react"

import { cn } from "@/lib/utils"
import {
  Clock,
  AlertCircle,
  CheckCircle,
  XCircle,
  Info,
  Table2,
  Terminal,
  TestTube,
  Sparkles,
} from "lucide-react"
import type { QueryResult } from "@/hooks/use-sql"
import type { SubmitStatus, ValidationResult } from "@/lib/workspace-store"

interface OutputPanelProps {
  activeTab: "results" | "error" | "tests"
  onTabChange: (tab: "results" | "error" | "tests") => void
  result: QueryResult | null
  error: string | null
  executionTime: number
  rowCount: number
  submitStatus: SubmitStatus
  validationResult: ValidationResult | null
}

export function OutputPanel({
  activeTab,
  onTabChange,
  result,
  error,
  executionTime,
  rowCount,
  submitStatus,
  validationResult,
}: OutputPanelProps) {
  return (
    <div className="flex flex-col h-full bg-card border-t border-border">
      {/* Tabs */}
      <div className="flex items-center gap-1 px-3 py-2 border-b border-border bg-card/80">
        <TabButton
          icon={Table2}
          active={activeTab === "results"}
          onClick={() => onTabChange("results")}
          hasContent={result !== null}
        >
          Results
          {rowCount > 0 && (
            <span className="ml-1.5 text-xs text-muted-foreground">({rowCount})</span>
          )}
        </TabButton>
        <TabButton
          icon={Terminal}
          active={activeTab === "error"}
          onClick={() => onTabChange("error")}
          hasContent={error !== null}
          isError
        >
          Error
        </TabButton>
        <TabButton
          icon={TestTube}
          active={activeTab === "tests"}
          onClick={() => onTabChange("tests")}
          hasContent={submitStatus !== "idle"}
          status={submitStatus}
        >
          Tests
        </TabButton>

        {executionTime > 0 && (
          <div className="ml-auto flex items-center gap-1.5 text-xs text-muted-foreground px-2 py-1 bg-secondary/50 rounded">
            <Clock className="h-3.5 w-3.5" />
            {executionTime.toFixed(2)}ms
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">{activeTab === "results" && <ResultsTab result={result} rowCount={rowCount} />}
        {activeTab === "error" && <ErrorTab error={error} />}
        {activeTab === "tests" && <TestsTab status={submitStatus} validation={validationResult} />}
      </div>
    </div>
  )
}

function TabButton({
  children,
  icon: Icon,
  active,
  onClick,
  hasContent,
  isError,
  status,
}: {
  children: React.ReactNode
  icon: React.ComponentType<{ className?: string }>
  active: boolean
  onClick: () => void
  hasContent?: boolean
  isError?: boolean
  status?: SubmitStatus
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors",
        active
          ? "bg-secondary text-foreground"
          : "text-muted-foreground hover:text-foreground hover:bg-secondary/50",
        hasContent && isError && !active && "text-destructive",
        hasContent && status === "accepted" && !active && "text-success",
        hasContent && status === "wrong-answer" && !active && "text-destructive"
      )}
    >
      <Icon className="h-4 w-4" />
      {children}
    </button>
  )
}

function ResultsTab({ result, rowCount }: { result: QueryResult | null; rowCount: number }) {
  if (!result) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-muted-foreground p-8">
        <div className="w-16 h-16 rounded-full bg-secondary/50 flex items-center justify-center mb-4">
          <Table2 className="h-8 w-8 text-muted-foreground/50" />
        </div>
        <p className="text-sm font-medium">No results yet</p>
        <p className="text-xs text-muted-foreground/70 mt-1">Run a query to see results</p>
      </div>
    )
  }

  if (result.columns.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-muted-foreground p-8">
        <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mb-4">
          <CheckCircle className="h-8 w-8 text-success" />
        </div>
        <p className="text-sm font-medium text-foreground">Query executed successfully</p>
        <p className="text-xs text-muted-foreground/70 mt-1">0 rows returned</p>
      </div>
    )
  }

  const displayRows = result.values.slice(0, 200)
  const hasMore = result.values.length > 200

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Table2 className="h-4 w-4" />
          <span>
            {rowCount} row{rowCount !== 1 ? "s" : ""} returned
          </span>
        </div>
        {hasMore && (
          <span className="text-xs text-warning bg-warning/10 px-2 py-1 rounded">
            Showing first 200 rows
          </span>
        )}
      </div>

      <div className="overflow-auto max-h-[400px] rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead className="sticky top-0 bg-secondary">
            <tr>
              <th className="px-3 py-2 text-left font-medium text-muted-foreground border-b border-border text-xs w-10">
                #
              </th>
              {result.columns.map((col, idx) => (
                <th
                  key={`header-${col}-${idx}`}
                  className="px-4 py-2 text-left font-medium text-foreground border-b border-border whitespace-nowrap"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {displayRows.map((row, rowIdx) => (
              <tr key={`row-${rowIdx}`} className="border-b border-border/50 hover:bg-secondary/30">
                <td className="px-3 py-2 text-muted-foreground text-xs">{rowIdx + 1}</td>
                {row.map((cell, cellIdx) => (
                  <td
                    key={`cell-${rowIdx}-${cellIdx}`}
                    className="px-4 py-2 text-foreground whitespace-nowrap font-mono text-xs"
                  >
                    {cell === null ? (
                      <span className="text-muted-foreground/50 italic">NULL</span>
                    ) : (
                      String(cell)
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function ErrorTab({ error }: { error: string | null }) {
  if (!error) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-muted-foreground p-8">
        <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mb-4">
          <CheckCircle className="h-8 w-8 text-success" />
        </div>
        <p className="text-sm font-medium text-foreground">No errors</p>
        <p className="text-xs text-muted-foreground/70 mt-1">Your query ran successfully</p>
      </div>
    )
  }

  return (
    <div className="p-4">
      <div className="flex items-start gap-3 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
        <div className="w-10 h-10 rounded-full bg-destructive/20 flex items-center justify-center shrink-0">
          <AlertCircle className="h-5 w-5 text-destructive" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-destructive mb-1">SQL Error</p>
          <p className="text-sm text-destructive/80 font-mono break-all">{error}</p>
        </div>
      </div>
    </div>
  )
}

function TestsTab({ status, validation }: { status: SubmitStatus; validation: ValidationResult | null }) {
  if (status === "idle") {
    return (
      <div className="flex flex-col items-center justify-center h-full text-muted-foreground p-8">
        <div className="w-16 h-16 rounded-full bg-secondary/50 flex items-center justify-center mb-4">
          <TestTube className="h-8 w-8 text-muted-foreground/50" />
        </div>
        <p className="text-sm font-medium">No tests run yet</p>
        <p className="text-xs text-muted-foreground/70 mt-1">Submit your solution to run tests</p>
      </div>
    )
  }

  return (
    <div className="p-4 space-y-4">
      {/* Status Banner */}
      <StatusBanner status={status} />

      {/* Validation Details */}
      {validation && (
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <TestTube className="h-4 w-4 text-primary" />
            Test Results
          </h4>

          <div className="space-y-2">
            <ValidationRow
              label="Columns Match"
              passed={validation.columnsMatch}
              detail={
                validation.columnsMatch
                  ? `${validation.expectedColumns.length} columns`
                  : `Expected: [${validation.expectedColumns.join(", ")}]\nGot: [${validation.actualColumns.join(", ")}]`
              }
            />

            <ValidationRow
              label="Row Count Match"
              passed={validation.rowCountMatch}
              detail={
                validation.rowCountMatch
                  ? `${validation.expectedRowCount} rows`
                  : `Expected: ${validation.expectedRowCount} rows, Got: ${validation.actualRowCount} rows`
              }
            />

            <ValidationRow
              label="Values Match"
              passed={validation.valuesMatch}
              detail={validation.valuesMatch ? "All values correct" : "Some values differ from expected"}
            />
          </div>
        </div>
      )}
    </div>
  )
}

function StatusBanner({ status }: { status: SubmitStatus }) {
  const config = {
    accepted: {
      icon: Sparkles,
      title: "Accepted!",
      description: "Your solution is correct. Well done!",
      className: "bg-success/10 border-success/20",
      iconClass: "bg-success/20 text-success",
      textClass: "text-success",
    },
    "wrong-answer": {
      icon: XCircle,
      title: "Wrong Answer",
      description: "Your output doesn't match the expected result.",
      className: "bg-destructive/10 border-destructive/20",
      iconClass: "bg-destructive/20 text-destructive",
      textClass: "text-destructive",
    },
    "runtime-error": {
      icon: AlertCircle,
      title: "Runtime Error",
      description: "Your query encountered an error during execution.",
      className: "bg-destructive/10 border-destructive/20",
      iconClass: "bg-destructive/20 text-destructive",
      textClass: "text-destructive",
    },
    "empty-output": {
      icon: Info,
      title: "Empty Output",
      description: "Your query returned no results.",
      className: "bg-warning/10 border-warning/20",
      iconClass: "bg-warning/20 text-warning",
      textClass: "text-warning",
    },
    idle: {
      icon: Info,
      title: "",
      description: "",
      className: "",
      iconClass: "",
      textClass: "",
    },
  }

  const { icon: Icon, title, description, className, iconClass, textClass } = config[status]

  if (status === "idle") return null

  return (
    <div className={cn("flex items-start gap-3 p-4 border rounded-lg", className)}>
      <div className={cn("w-10 h-10 rounded-full flex items-center justify-center shrink-0", iconClass)}>
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className={cn("font-semibold", textClass)}>{title}</p>
        <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
      </div>
    </div>
  )
}

function ValidationRow({ label, passed, detail }: { label: string; passed: boolean; detail: string }) {
  return (
    <div
      className={cn(
        "flex items-start gap-3 p-3 rounded-lg border",
        passed ? "bg-success/5 border-success/10" : "bg-destructive/5 border-destructive/10"
      )}
    >
      {passed ? (
        <CheckCircle className="h-5 w-5 text-success shrink-0 mt-0.5" />
      ) : (
        <XCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
      )}
      <div className="flex-1 min-w-0">
        <p className={cn("text-sm font-medium", passed ? "text-success" : "text-destructive")}>
          {label}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5 whitespace-pre-wrap break-all">{detail}</p>
      </div>
    </div>
  )
}
