"use client"

import { useState, useCallback, useEffect, useMemo, useRef } from "react"
import Link from "next/link"
import { useSql, type ExecutionResult, type QueryResult } from "@/hooks/use-sql"
import { useWorkspaceStore } from "@/lib/workspace-store"
import { validateResults } from "@/lib/validation"
import { SchemaExplorer } from "@/components/schema-explorer"
import { SqlEditor, type SqlEditorRef } from "@/components/sql-editor"
import { EditorToolbar } from "@/components/editor-toolbar"
import { OutputPanel } from "@/components/output-panel"
import { QuestionPanel } from "@/components/question-panel"
import { ResizablePanel } from "@/components/resizable-panel"
import { getNextQuestion, getPreviousQuestion, type Question } from "@/lib/questions"
import { useIsMobile } from "@/hooks/use-mobile"
import {
  PanelLeftClose,
  PanelLeftOpen,
  Database,
  Home,
  List,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  FileText,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface WorkspaceProps {
  question: Question
}

export function Workspace({ question }: WorkspaceProps) {
  const {
    queryText,
    setQueryText,
    activeTab,
    setActiveTab,
    submitStatus,
    setSubmitStatus,
    validationResult,
    setValidationResult,
    hintsUnlocked,
    unlockHints,
    resetSession,
    saveProgress,
    markSolved,
    incrementAttempts,
    getProgress,
    loadSavedQuery,
  } = useWorkspaceStore()

  const { isLoading: dbLoading, executeQuery, getSchema, resetDatabase } = useSql(question.datasetSQL)

  const [executionResult, setExecutionResult] = useState<ExecutionResult | null>(null)
  const [isRunning, setIsRunning] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [schemaOpen, setSchemaOpen] = useState(true)

  const schema = useMemo(() => (dbLoading ? [] : getSchema()), [dbLoading, getSchema])

  const progress = getProgress(question.id)
  const prevQuestion = getPreviousQuestion(question.id)
  const nextQuestion = getNextQuestion(question.id)

  const isMobile = useIsMobile()
  const [mobileView, setMobileView] = useState<"problem" | "editor" | "schema">("editor")
  const editorRef = useRef<SqlEditorRef>(null)

  const handleFormat = useCallback(() => {
    editorRef.current?.format()
  }, [])

  // Initialize query text on mount or question change
  useEffect(() => {
    const savedQuery = loadSavedQuery(question.id)
    setQueryText(savedQuery || question.starterSQL)
    resetSession()
    setExecutionResult(null)
  }, [question.id, question.starterSQL, loadSavedQuery, setQueryText, resetSession])

  const handleRun = useCallback(() => {
    if (dbLoading || isRunning) return

    setIsRunning(true)
    const result = executeQuery(queryText)
    setExecutionResult(result)

    if (result.error) {
      setActiveTab("error")
    } else {
      setActiveTab("results")
    }

    saveProgress(question.id, queryText)
    setIsRunning(false)
  }, [dbLoading, isRunning, executeQuery, queryText, setActiveTab, saveProgress, question.id])

  const handleSubmit = useCallback(() => {
    if (dbLoading || isSubmitting) return

    setIsSubmitting(true)
    incrementAttempts(question.id)

    // Execute user query
    const userResult = executeQuery(queryText)

    if (userResult.error) {
      setSubmitStatus("runtime-error")
      setValidationResult(null)
      setActiveTab("tests")
      setIsSubmitting(false)
      return
    }

    if (!userResult.result || userResult.result.values.length === 0) {
      // Check if expected also has no results
      const expectedResult = executeQuery(question.expectedQuerySQL)
      if (!expectedResult.result || expectedResult.result.values.length === 0) {
        // Both empty - this is correct
        setSubmitStatus("accepted")
        setValidationResult({
          columnsMatch: true,
          rowCountMatch: true,
          valuesMatch: true,
          expectedColumns: [],
          actualColumns: [],
          expectedRowCount: 0,
          actualRowCount: 0,
        })
        markSolved(question.id)
      } else {
        setSubmitStatus("empty-output")
        setValidationResult(null)
      }
      setActiveTab("tests")
      setIsSubmitting(false)
      return
    }

    // Execute expected query
    const expectedResult = executeQuery(question.expectedQuerySQL)

    if (expectedResult.error || !expectedResult.result) {
      // Expected query failed - this shouldn't happen
      console.error("Expected query failed:", expectedResult.error)
      setSubmitStatus("runtime-error")
      setValidationResult(null)
      setActiveTab("tests")
      setIsSubmitting(false)
      return
    }

    // Validate
    const validation = validateResults(userResult.result, expectedResult.result, question.orderMatters)

    setValidationResult(validation)

    if (validation.columnsMatch && validation.rowCountMatch && validation.valuesMatch) {
      setSubmitStatus("accepted")
      markSolved(question.id)
    } else {
      setSubmitStatus("wrong-answer")

      // Unlock hints after 2 failed attempts
      if ((progress?.attempts || 0) + 1 >= 2) {
        unlockHints()
      }
    }

    saveProgress(question.id, queryText)
    setActiveTab("tests")
    setIsSubmitting(false)
  }, [
    dbLoading,
    isSubmitting,
    incrementAttempts,
    question.id,
    question.expectedQuerySQL,
    question.orderMatters,
    executeQuery,
    queryText,
    setSubmitStatus,
    setValidationResult,
    setActiveTab,
    markSolved,
    saveProgress,
    progress,
    unlockHints,
  ])

  const handleResetQuery = useCallback(() => {
    setQueryText(question.starterSQL)
    resetSession()
    setExecutionResult(null)
  }, [question.starterSQL, setQueryText, resetSession])

  const handleResetDb = useCallback(() => {
    resetDatabase()
    resetSession()
    setExecutionResult(null)
  }, [resetDatabase, resetSession])

  const handleTableClick = useCallback(
    (tableName: string) => {
      setQueryText(`SELECT * FROM ${tableName};`)
      if (isMobile) {
        setMobileView("editor")
      }
    },
    [setQueryText, isMobile]
  )

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "b") {
        e.preventDefault()
        setSidebarOpen((prev) => !prev)
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "e") {
        e.preventDefault()
        setSchemaOpen((prev) => !prev)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  if (isMobile) {
    return (
      <div className="flex flex-col h-dvh w-full bg-background overflow-hidden">
        {/* Mobile Header */}
        <div className="flex items-center justify-between px-3 py-2 border-b border-border bg-card shrink-0">
          <div className="flex items-center gap-2 max-w-[70%]">
            <Link
              href="/"
              className="text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => localStorage.removeItem("sqlingo-last-path")}
            >
              <Home className="h-4 w-4" />
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="font-medium text-foreground truncate text-sm">
              #{question.id} {question.title}
            </span>
          </div>
          <DifficultyBadge difficulty={question.difficulty} />
        </div>

        {/* Mobile Content Area */}
        <div className="flex-1 relative overflow-hidden">
          {mobileView === "problem" && (
            <div className="absolute inset-0 z-10 bg-background overflow-y-auto pb-safe">
              <QuestionPanel
                question={question}
                hintsUnlocked={hintsUnlocked}
                attempts={progress?.attempts || 0}
                prevQuestionId={prevQuestion?.id}
                nextQuestionId={nextQuestion?.id}
              />
            </div>
          )}

          {mobileView === "schema" && (
            <div className="absolute inset-0 z-10 bg-background overflow-y-auto pb-safe">
              <SchemaExplorer schema={schema} onTableClick={handleTableClick} isLoading={dbLoading} />
            </div>
          )}

          <div className={cn("flex flex-col h-full", mobileView !== "editor" && "hidden")}>
            <EditorToolbar
              onRun={handleRun}
              onSubmit={handleSubmit}
              onResetQuery={handleResetQuery}
              onResetDb={handleResetDb}
              isRunning={isRunning}
              isSubmitting={isSubmitting}
              isDbLoading={dbLoading}
              schemaOpen={false}
              onToggleSchema={() => setMobileView("schema")}
              onFormat={handleFormat}
              questionTitle={question.title}
              questionDescription={question.description}
              schema={schema}
              currentQuery={queryText}
              errorMessage={executionResult?.error || undefined}
            />

            {/* Split Editor and Output for Mobile Editor View */}
            <div className="flex-1 flex flex-col min-h-0">
              <div className="flex-1 relative min-h-0">
                <SqlEditor
                  ref={editorRef}
                  value={queryText}
                  onChange={setQueryText}
                  onRun={handleRun}
                  schema={schema}
                />
              </div>
              {/* Mobile bottom panel for output */}
              <div className="h-[40%] border-t border-border shrink-0">
                <OutputPanel
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                  result={executionResult?.result || null}
                  error={executionResult?.error || null}
                  executionTime={executionResult?.executionTime || 0}
                  rowCount={executionResult?.rowCount || 0}
                  submitStatus={submitStatus}
                  validationResult={validationResult}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Bar */}
        <div className="flex items-center justify-around border-t border-border bg-card p-1 pb-safe shrink-0">
          <Button
            variant={mobileView === "problem" ? "secondary" : "ghost"}
            className="flex flex-col items-center gap-1 h-auto py-2 px-1 flex-1 rounded-none data-[state=active]:border-t-2 border-primary"
            onClick={() => setMobileView("problem")}
          >
            <FileText className="h-4 w-4" />
            <span className="text-[10px]">Problem</span>
          </Button>
          <Button
            variant={mobileView === "editor" ? "secondary" : "ghost"}
            className="flex flex-col items-center gap-1 h-auto py-2 px-1 flex-1"
            onClick={() => setMobileView("editor")}
          >
            <code className="h-4 w-4 font-bold">{"<>"}</code>
            <span className="text-[10px]">Code</span>
          </Button>
          <Button
            variant={mobileView === "schema" ? "secondary" : "ghost"}
            className="flex flex-col items-center gap-1 h-auto py-2 px-1 flex-1"
            onClick={() => setMobileView("schema")}
          >
            <Database className="h-4 w-4" />
            <span className="text-[10px]">Schema</span>
          </Button>
        </div>
      </div >
    )
  }

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden">
      {/* Left Sidebar - Question Panel */}
      <ResizablePanel
        direction="horizontal"
        defaultSize={380}
        minSize={300}
        maxSize={550}
        className={cn("border-r border-border transition-all", !sidebarOpen && "hidden")}
      >
        <QuestionPanel
          question={question}
          hintsUnlocked={hintsUnlocked}
          attempts={progress?.attempts || 0}
          prevQuestionId={prevQuestion?.id}
          nextQuestionId={nextQuestion?.id}
        />
      </ResizablePanel>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navigation Bar */}
        <div className="flex items-center justify-between px-3 py-2 border-b border-border bg-card">
          <div className="flex items-center gap-2">
            {/* Sidebar toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="h-8 w-8"
              title={sidebarOpen ? "Hide problem (Ctrl+B)" : "Show problem (Ctrl+B)"}
            >
              {sidebarOpen ? (
                <PanelLeftClose className="h-4 w-4" />
              ) : (
                <PanelLeftOpen className="h-4 w-4" />
              )}
            </Button>

            {/* Breadcrumb */}
            <div className="flex items-center gap-1.5 text-sm">
              <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                <Home className="h-4 w-4" />
              </Link>
              <span className="text-muted-foreground">/</span>
              <Link
                href="/problems"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <List className="h-4 w-4" />
              </Link>
              <span className="text-muted-foreground">/</span>
              <span className="font-medium text-foreground truncate max-w-[200px]">
                #{question.id} {question.title}
              </span>
              {progress?.solved && <CheckCircle2 className="h-4 w-4 text-success ml-1" />}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-2">
            <DifficultyBadge difficulty={question.difficulty} />

            <div className="flex items-center gap-1 ml-2">
              {prevQuestion && (
                <Link href={`/problems/${prevQuestion.id}`}>
                  <Button variant="ghost" size="icon" className="h-8 w-8" title="Previous problem">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                </Link>
              )}
              {nextQuestion && (
                <Link href={`/problems/${nextQuestion.id}`}>
                  <Button variant="ghost" size="icon" className="h-8 w-8" title="Next problem">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Editor Area */}
        <div className="flex-1 flex min-h-0">
          {/* Schema Explorer */}
          <ResizablePanel
            direction="horizontal"
            defaultSize={240}
            minSize={200}
            maxSize={400}
            className={cn("border-r border-border bg-card", !schemaOpen && "hidden")}
          >
            <SchemaExplorer schema={schema} onTableClick={handleTableClick} isLoading={dbLoading} />
          </ResizablePanel>

          {/* Editor + Output */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Toolbar */}
            <EditorToolbar
              onRun={handleRun}
              onSubmit={handleSubmit}
              onResetQuery={handleResetQuery}
              onResetDb={handleResetDb}
              isRunning={isRunning}
              isSubmitting={isSubmitting}
              isDbLoading={dbLoading}
              schemaOpen={schemaOpen}
              onToggleSchema={() => setSchemaOpen(!schemaOpen)}
              onFormat={handleFormat}
              questionTitle={question.title}
              questionDescription={question.description}
              schema={schema}
              currentQuery={queryText}
              errorMessage={executionResult?.error || undefined}
            />

            {/* Editor */}
            <div className="flex-1 min-h-0">
              <SqlEditor
                ref={editorRef}
                value={queryText}
                onChange={setQueryText}
                onRun={handleRun}
                schema={schema}
              />
            </div>

            {/* Output Panel */}
            <ResizablePanel direction="vertical" defaultSize={280} minSize={150} maxSize={500}>
              <OutputPanel
                activeTab={activeTab}
                onTabChange={setActiveTab}
                result={executionResult?.result || null}
                error={executionResult?.error || null}
                executionTime={executionResult?.executionTime || 0}
                rowCount={executionResult?.rowCount || 0}
                submitStatus={submitStatus}
                validationResult={validationResult}
              />
            </ResizablePanel>
          </div>
        </div>
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
