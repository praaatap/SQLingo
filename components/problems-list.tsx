"use client"

import React from "react"

import { useState, useMemo } from "react"
import Link from "next/link"
import {
  Search,
  CheckCircle2,
  Circle,
  Filter,
  Database,
  ChevronLeft,
  ChevronRight,
  Trophy,
  Target,
  Flame,
  Sparkles,
  ArrowRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { questions, type Question } from "@/lib/questions"
import { useWorkspaceStore } from "@/lib/workspace-store"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

type DifficultyFilter = "all" | "Easy" | "Medium" | "Hard"
type StatusFilter = "all" | "solved" | "unsolved"

const ITEMS_PER_PAGE = 20

export function ProblemsList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [difficultyFilter, setDifficultyFilter] = useState<DifficultyFilter>("all")
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all")
  const [currentPage, setCurrentPage] = useState(1)
  const progress = useWorkspaceStore((state) => state.progress)

  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      const matchesSearch =
        q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        q.id === searchQuery

      const matchesDifficulty = difficultyFilter === "all" || q.difficulty === difficultyFilter

      const isSolved = progress[q.id]?.solved || false
      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "solved" && isSolved) ||
        (statusFilter === "unsolved" && !isSolved)

      return matchesSearch && matchesDifficulty && matchesStatus
    })
  }, [searchQuery, difficultyFilter, statusFilter, progress])

  const paginatedQuestions = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredQuestions.slice(start, start + ITEMS_PER_PAGE)
  }, [filteredQuestions, currentPage])

  const totalPages = Math.ceil(filteredQuestions.length / ITEMS_PER_PAGE)

  const stats = useMemo(() => {
    const solved = Object.values(progress).filter((p) => p.solved).length
    const total = questions.length
    const easy = questions.filter((q) => q.difficulty === "Easy").length
    const medium = questions.filter((q) => q.difficulty === "Medium").length
    const hard = questions.filter((q) => q.difficulty === "Hard").length
    const easySolved = questions.filter(
      (q) => q.difficulty === "Easy" && progress[q.id]?.solved
    ).length
    const mediumSolved = questions.filter(
      (q) => q.difficulty === "Medium" && progress[q.id]?.solved
    ).length
    const hardSolved = questions.filter(
      (q) => q.difficulty === "Hard" && progress[q.id]?.solved
    ).length

    return { solved, total, easy, medium, hard, easySolved, mediumSolved, hardSolved }
  }, [progress])

  // Reset to page 1 when filters change
  const handleFilterChange = (newFilter: DifficultyFilter | StatusFilter, type: "difficulty" | "status") => {
    setCurrentPage(1)
    if (type === "difficulty") {
      setDifficultyFilter(newFilter as DifficultyFilter)
    } else {
      setStatusFilter(newFilter as StatusFilter)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Enhanced Header with Gradient */}
      <header className="relative border-b border-border overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-blue-500/5" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] -translate-y-1/2" />

        <div className="relative max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity group">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-emerald-500 flex items-center justify-center shadow-lg shadow-primary/25">
                  <Database className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <span className="text-xl font-bold text-foreground block">SQL Practice</span>
                  <span className="text-xs text-muted-foreground">Master with AI hints</span>
                </div>
              </Link>
            </div>

            <div className="flex items-center gap-4">
              {/* AI Feature Badge */}
              <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 border border-primary/20 backdrop-blur-sm">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">AI-Powered Hints</span>
              </div>

              {/* Progress Badge */}
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-success/10 border border-success/20 backdrop-blur-sm">
                <Trophy className="h-4 w-4 text-success" />
                <span className="text-sm font-semibold text-success">
                  {stats.solved}/{stats.total}
                </span>
                <span className="text-xs text-success/80">solved</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            icon={Trophy}
            label="Overall Progress"
            value={stats.solved}
            total={stats.total}
            percentage={Math.round((stats.solved / stats.total) * 100)}
            gradient="from-primary/20 to-emerald-500/10"
          />
          <StatCard
            icon={Target}
            label="Easy"
            value={stats.easySolved}
            total={stats.easy}
            color="success"
            gradient="from-emerald-500/20 to-emerald-500/5"
          />
          <StatCard
            icon={Flame}
            label="Medium"
            value={stats.mediumSolved}
            total={stats.medium}
            color="warning"
            gradient="from-amber-500/20 to-amber-500/5"
          />
          <StatCard
            icon={Flame}
            label="Hard"
            value={stats.hardSolved}
            total={stats.hard}
            color="destructive"
            gradient="from-red-500/20 to-red-500/5"
          />
        </div>

        {/* Quick Start Banner */}
        {stats.solved === 0 && (
          <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-primary/10 via-background to-blue-500/10 border border-primary/20 backdrop-blur-sm">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">New to SQL Practice?</h3>
                  <p className="text-sm text-muted-foreground">Start with easy problems and use AI hints when stuck!</p>
                </div>
              </div>
              <Link href="/problems/1">
                <Button className="gap-2">
                  Start First Problem
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        )}

        {/* Search and Filters */}
        <div className="flex flex-col gap-4 mb-6">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search problems by title, tag, or number..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setCurrentPage(1)
              }}
              className="pl-12 h-12 bg-card text-base"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Difficulty:</span>
              <div className="flex items-center gap-1">
                {(["all", "Easy", "Medium", "Hard"] as const).map((diff) => (
                  <Button
                    key={diff}
                    variant={difficultyFilter === diff ? "default" : "ghost"}
                    size="sm"
                    onClick={() => handleFilterChange(diff, "difficulty")}
                    className={cn(
                      "h-8",
                      difficultyFilter === diff &&
                      diff === "Easy" &&
                      "bg-success text-success-foreground hover:bg-success/90",
                      difficultyFilter === diff &&
                      diff === "Medium" &&
                      "bg-warning text-warning-foreground hover:bg-warning/90",
                      difficultyFilter === diff &&
                      diff === "Hard" &&
                      "bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    )}
                  >
                    {diff === "all" ? "All" : diff}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Status:</span>
              <div className="flex items-center gap-1">
                {(["all", "solved", "unsolved"] as const).map((status) => (
                  <Button
                    key={status}
                    variant={statusFilter === status ? "default" : "ghost"}
                    size="sm"
                    onClick={() => handleFilterChange(status, "status")}
                    className="h-8 capitalize"
                  >
                    {status}
                  </Button>
                ))}
              </div>
            </div>

            <div className="ml-auto text-sm text-muted-foreground">
              {filteredQuestions.length} problems found
            </div>
          </div>
        </div>

        {/* Problems Table */}
        <div className="border border-border rounded-xl overflow-hidden bg-card">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-secondary/30">
                  <th className="w-14 px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    #
                  </th>
                  <th className="w-14 px-4 py-3 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">
                    Tags
                  </th>
                  <th className="w-28 px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Difficulty
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {paginatedQuestions.map((question) => (
                  <ProblemRow
                    key={question.id}
                    question={question}
                    solved={progress[question.id]?.solved || false}
                  />
                ))}
              </tbody>
            </table>
          </div>

          {filteredQuestions.length === 0 && (
            <div className="px-4 py-16 text-center">
              <Database className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground">No problems found matching your criteria</p>
              <Button
                variant="ghost"
                size="sm"
                className="mt-4"
                onClick={() => {
                  setSearchQuery("")
                  setDifficultyFilter("all")
                  setStatusFilter("all")
                }}
              >
                Clear filters
              </Button>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-6">
            <p className="text-sm text-muted-foreground">
              Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{" "}
              {Math.min(currentPage * ITEMS_PER_PAGE, filteredQuestions.length)} of{" "}
              {filteredQuestions.length}
            </p>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="bg-transparent"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum: number
                  if (totalPages <= 5) {
                    pageNum = i + 1
                  } else if (currentPage <= 3) {
                    pageNum = i + 1
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i
                  } else {
                    pageNum = currentPage - 2 + i
                  }
                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setCurrentPage(pageNum)}
                      className="w-9"
                    >
                      {pageNum}
                    </Button>
                  )
                })}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="bg-transparent"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

function StatCard({
  icon: Icon,
  label,
  value,
  total,
  percentage,
  color,
  gradient,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: number
  total?: number
  percentage?: number
  color?: "success" | "warning" | "destructive"
  gradient?: string
}) {
  return (
    <div className={cn(
      "relative overflow-hidden bg-card border border-border rounded-xl p-4",
      gradient && "border-0"
    )}>
      {/* Gradient background */}
      {gradient && (
        <div className={cn("absolute inset-0 bg-gradient-to-br opacity-50", gradient)} />
      )}

      <div className="relative">
        <div className="flex items-center gap-2 mb-2">
          <Icon
            className={cn(
              "h-4 w-4",
              color === "success" && "text-success",
              color === "warning" && "text-warning",
              color === "destructive" && "text-destructive",
              !color && "text-primary"
            )}
          />
          <span className="text-sm text-muted-foreground">{label}</span>
        </div>
        <div className="flex items-baseline gap-1">
          <span
            className={cn(
              "text-2xl font-bold",
              color === "success" && "text-success",
              color === "warning" && "text-warning",
              color === "destructive" && "text-destructive",
              !color && "text-foreground"
            )}
          >
            {value}
          </span>
          {total !== undefined && (
            <span className="text-sm text-muted-foreground">/ {total}</span>
          )}
          {percentage !== undefined && (
            <span className="text-sm text-muted-foreground ml-1">({percentage}%)</span>
          )}
        </div>
        {total !== undefined && (
          <div className="mt-2 h-1.5 bg-secondary rounded-full overflow-hidden">
            <div
              className={cn(
                "h-full rounded-full transition-all",
                color === "success" && "bg-success",
                color === "warning" && "bg-warning",
                color === "destructive" && "bg-destructive",
                !color && "bg-primary"
              )}
              style={{ width: `${(value / total) * 100}%` }}
            />
          </div>
        )}
      </div>
    </div>
  )
}

function ProblemRow({ question, solved }: { question: Question; solved: boolean }) {
  return (
    <tr className="hover:bg-secondary/20 transition-colors group">
      <td className="px-4 py-3.5 text-sm text-muted-foreground font-mono">{question.id}</td>
      <td className="px-4 py-3.5 text-center">
        {solved ? (
          <CheckCircle2 className="h-5 w-5 text-success mx-auto" />
        ) : (
          <Circle className="h-5 w-5 text-muted-foreground/30 mx-auto" />
        )}
      </td>
      <td className="px-4 py-3.5">
        <Link
          href={`/problems/${question.id}`}
          className="font-medium text-foreground hover:text-primary transition-colors group-hover:text-primary"
        >
          {question.title}
        </Link>
      </td>
      <td className="px-4 py-3.5 hidden md:table-cell">
        <div className="flex flex-wrap gap-1.5">
          {question.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-xs bg-secondary text-secondary-foreground rounded font-mono"
            >
              {tag}
            </span>
          ))}
          {question.tags.length > 4 && (
            <span className="px-2 py-0.5 text-xs text-muted-foreground">
              +{question.tags.length - 4}
            </span>
          )}
        </div>
      </td>
      <td className="px-4 py-3.5">
        <DifficultyBadge difficulty={question.difficulty} />
      </td>
    </tr>
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
