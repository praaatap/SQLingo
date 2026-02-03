"use client"

import React, { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import {
  ArrowRight,
  Database,
  Code2,
  CheckCircle,
  Zap,
  Trophy,
  Users,
  BookOpen,
  Terminal,
  Play,
  ChevronRight,
  Layers,
  Target,
  TrendingUp,
  Star,
  Command,
  Sparkles,
  MessageSquare,
  Lightbulb,
  Rocket,
  Quote,
  Github,
  Twitter,
  Heart,
  Shield,
  Clock,
  Brain,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { questions } from "@/lib/questions"
import { useWorkspaceStore } from "@/lib/workspace-store"


import { FadeIn } from "@/components/fade-in"

// Animated typing effect component
function TypeWriter({ texts, className }: { texts: string[]; className?: string }) {
  // ... existing code ...
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentFullText = texts[currentTextIndex]
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < currentFullText.length) {
            setDisplayText(currentFullText.slice(0, displayText.length + 1))
          } else {
            setTimeout(() => setIsDeleting(true), 2000)
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(displayText.slice(0, -1))
          } else {
            setIsDeleting(false)
            setCurrentTextIndex((prev) => (prev + 1) % texts.length)
          }
        }
      },
      isDeleting ? 30 : 80
    )
    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, currentTextIndex, texts])

  return (
    <span className={className}>
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  )
}

// Animated counter component
function AnimatedCounter({ target, duration = 2000 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      setCount(Math.floor(progress * target))
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [target, duration])

  return <span>{count}</span>
}

// Floating particles component
function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-primary/30 rounded-full animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 4}s`,
          }}
        />
      ))}
    </div>
  )
}

// Animated code block component
function AnimatedCodeBlock() {
  const codeLines = [
    { text: "SELECT", color: "text-blue-400" },
    { text: "  e.name,", color: "text-foreground" },
    { text: "  d.department_name,", color: "text-foreground" },
    { text: "  e.salary", color: "text-foreground" },
    { text: "FROM", color: "text-blue-400" },
    { text: "  employees e", color: "text-emerald-400" },
    { text: "INNER JOIN", color: "text-blue-400" },
    { text: "  departments d", color: "text-emerald-400" },
    { text: "ON", color: "text-blue-400" },
    { text: "  e.dept_id = d.id", color: "text-amber-400" },
    { text: "WHERE", color: "text-blue-400" },
    { text: "  e.salary > 50000", color: "text-amber-400" },
    { text: "ORDER BY", color: "text-blue-400" },
    { text: "  e.salary DESC;", color: "text-foreground" },
  ]

  const [visibleLines, setVisibleLines] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev >= codeLines.length) {
          setTimeout(() => setVisibleLines(0), 2000)
          return prev
        }
        return prev + 1
      })
    }, 200)
    return () => clearInterval(interval)
  }, [codeLines.length])

  return (
    <div className="relative">
      {/* Glow effect */}
      <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-blue-500/20 to-primary/20 rounded-2xl blur-xl opacity-50" />

      <div className="relative bg-[#0d1117] rounded-xl border border-white/10 overflow-hidden shadow-2xl">
        {/* Window controls */}
        <div className="flex items-center gap-2 px-4 py-3 bg-[#161b22] border-b border-white/5">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <span className="text-xs text-muted-foreground ml-4 font-mono">query.sql</span>
        </div>

        {/* Code content */}
        <div className="p-6 font-mono text-sm leading-relaxed">
          {codeLines.map((line, i) => (
            <div
              key={i}
              className={`transition-all duration-300 ${i < visibleLines ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                }`}
            >
              <span className="text-muted-foreground/50 select-none mr-4 inline-block w-4 text-right">
                {i + 1}
              </span>
              <span className={line.color}>{line.text}</span>
            </div>
          ))}
          {visibleLines >= codeLines.length && (
            <div className="mt-4 pt-4 border-t border-white/5">
              <div className="flex items-center gap-2 text-emerald-400">
                <CheckCircle className="w-4 h-4" />
                <span className="text-xs">Query executed successfully - 847 rows returned</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Glassmorphism feature card
function GlassCard({
  icon: Icon,
  title,
  description,
  delay = 0,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  delay?: number
}) {
  return (
    <div
      className="group relative p-6 rounded-2xl backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] hover:border-primary/30 transition-all duration-500 hover:shadow-lg hover:shadow-primary/5"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Hover glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative">
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
          <Icon className="h-7 w-7 text-primary" />
        </div>
        <h3 className="font-semibold text-lg text-foreground mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  )
}

// Stats card with animation
function StatCard({
  value,
  label,
  icon: Icon,
  color,
}: {
  value: number
  label: string
  icon: React.ComponentType<{ className?: string }>
  color: string
}) {
  return (
    <div className="relative group">
      <div className={`absolute inset-0 bg-gradient-to-br ${color} rounded-2xl opacity-10 group-hover:opacity-20 transition-opacity duration-300`} />
      <div className="relative p-6 rounded-2xl border border-white/[0.08] backdrop-blur-sm">
        <Icon className="w-8 h-8 text-muted-foreground mb-4" />
        <p className="text-4xl font-bold text-foreground">
          <AnimatedCounter target={value} />
          <span className="text-primary">+</span>
        </p>
        <p className="text-sm text-muted-foreground mt-1">{label}</p>
      </div>
    </div>
  )
}

// Topic pill component
function TopicPill({ children, active = false }: { children: React.ReactNode; active?: boolean }) {
  return (
    <span
      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${active
        ? "bg-primary text-primary-foreground"
        : "bg-white/[0.03] text-muted-foreground border border-white/[0.08] hover:border-primary/30"
        }`}
    >
      {children}
    </span>
  )
}

// Testimonial card component
function TestimonialCard({
  quote,
  author,
  role,
  avatar,
}: {
  quote: string
  author: string
  role: string
  avatar: string
}) {
  return (
    <div className="group relative p-6 rounded-2xl backdrop-blur-xl bg-white/[0.02] border border-white/[0.08] hover:border-primary/30 transition-all duration-500">
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative">
        <Quote className="h-8 w-8 text-primary/30 mb-4" />
        <p className="text-foreground/90 leading-relaxed mb-6">{quote}</p>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-emerald-500 flex items-center justify-center text-primary-foreground font-semibold">
            {avatar}
          </div>
          <div>
            <p className="font-medium text-foreground">{author}</p>
            <p className="text-sm text-muted-foreground">{role}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function HomePage() {
  const progress = useWorkspaceStore((state) => state.progress)

  const stats = useMemo(() => {
    const solved = Object.values(progress).filter((p) => p.solved).length
    const easy = questions.filter((q) => q.difficulty === "Easy").length
    const medium = questions.filter((q) => q.difficulty === "Medium").length
    const hard = questions.filter((q) => q.difficulty === "Hard").length
    return { solved, total: questions.length, easy, medium, hard }
  }, [progress])

  const sqlTopics = [
    "SELECT", "WHERE", "JOIN", "GROUP BY", "HAVING", "ORDER BY",
    "Subqueries", "Window Functions", "CTEs", "Aggregations"
  ]

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* Background effects */}
        <div className="absolute inset-0">
          {/* Main gradient */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,200,180,0.15),transparent)]" />

          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: "100px 100px",
            }}
          />

          {/* Gradient orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[128px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: "1s" }} />
        </div>

        <FloatingParticles />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] mb-8 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              <span className="text-sm text-muted-foreground">
                <span className="text-primary font-semibold">{stats.total}</span> Problems Available
              </span>
            </div>

            {/* Main heading */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
              <span className="text-foreground">Master</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-emerald-400 to-teal-400">
                <TypeWriter texts={["SQL Queries", "Data Analysis", "Database Skills", "JOIN Operations"]} />
              </span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-xl leading-relaxed">
              Practice SQL in your browser with instant feedback. Real-world datasets with Indian context.
              From basics to advanced - no setup required.
            </p>

            {/* CTA buttons */}
            <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 lg:justify-start justify-center">
              <Link href="/problems">
                <Button
                  size="lg"
                  className="gap-2 px-8 h-14 text-base font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-shadow"
                >
                  <Play className="h-5 w-5" />
                  Start Practicing
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/problems/1">
                <Button
                  variant="outline"
                  size="lg"
                  className="gap-2 h-14 text-base bg-transparent border-white/10 hover:bg-white/[0.03] hover:border-white/20"
                >
                  <Terminal className="h-5 w-5" />
                  Try First Problem
                </Button>
              </Link>
            </div>

            {/* Quick stats bar */}
            <div className="mt-12 flex items-center gap-8 justify-center lg:justify-start">
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">{stats.easy}</p>
                <p className="text-xs text-emerald-400 font-medium">Easy</p>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">{stats.medium}</p>
                <p className="text-xs text-amber-400 font-medium">Medium</p>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">{stats.hard}</p>
                <p className="text-xs text-red-400 font-medium">Hard</p>
              </div>
              {stats.solved > 0 && (
                <>
                  <div className="w-px h-8 bg-white/10" />
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">{stats.solved}</p>
                    <p className="text-xs text-primary font-medium">Solved</p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Right content - Animated code block */}
          <div className="hidden lg:block">
            <AnimatedCodeBlock />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-xs text-muted-foreground">Scroll to explore</span>
          <ChevronRight className="w-4 h-4 text-muted-foreground rotate-90" />
        </div>
      </section>

      {/* Features Section - Enhanced with 6 cards */}
      <section className="relative py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />

        <div className="relative max-w-7xl mx-auto px-6">
          <FadeIn>
            <div className="text-center max-w-3xl mx-auto mb-20">
              <span className="text-primary font-medium text-sm tracking-wide uppercase">Features</span>
              <h2 className="mt-4 text-4xl sm:text-5xl font-bold text-foreground">
                Everything you need to
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400"> learn SQL</span>
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                A complete platform designed for developers who want to master database queries
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <GlassCard
                icon={Database}
                title="In-Browser Database"
                description="SQLite runs entirely in your browser via WebAssembly. No server setup needed."
                delay={0}
              />
              <GlassCard
                icon={Code2}
                title="Monaco Editor"
                description="The same editor that powers VS Code with full SQL syntax highlighting."
                delay={100}
              />
              <GlassCard
                icon={CheckCircle}
                title="Instant Validation"
                description="Get immediate feedback with detailed test cases and expected results."
                delay={200}
              />
              <GlassCard
                icon={Sparkles}
                title="AI-Powered Hints"
                description="Stuck? Get intelligent hints from Gemini AI to guide your learning journey."
                delay={300}
              />
              <GlassCard
                icon={Shield}
                title="No Sign-up Required"
                description="Start learning immediately. Your progress saves locally in your browser."
                delay={400}
              />
              <GlassCard
                icon={Zap}
                title="100+ Problems"
                description="From basic SELECT to complex window functions - problems for every skill level."
                delay={500}
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* AI Features Showcase Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-blue-500/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px]" />

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left - Content */}
            <FadeIn delay={0} direction="right">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-primary">AI-Powered Learning</span>
                </div>

                <h2 className="text-4xl sm:text-5xl font-bold text-foreground">
                  Get unstuck with
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400"> AI hints</span>
                </h2>

                <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                  When you're stuck, our AI assistant provides contextual hints based on the problem,
                  your current query, and any errors. It guides you without giving away the answer.
                </p>

                <div className="mt-8 space-y-4">
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-primary/20 transition-colors duration-300">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Brain className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">Context-Aware Suggestions</h4>
                      <p className="text-sm text-muted-foreground mt-1">AI understands the problem, schema, and your attempt</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-amber-500/20 transition-colors duration-300">
                    <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                      <Lightbulb className="h-5 w-5 text-amber-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">Learn, Don't Copy</h4>
                      <p className="text-sm text-muted-foreground mt-1">Hints guide you to the solution without spoiling it</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-blue-500/20 transition-colors duration-300">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                      <Shield className="h-5 w-5 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">Your API Key, Your Control</h4>
                      <p className="text-sm text-muted-foreground mt-1">Use your own Gemini API key - stored locally, never shared</p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Right - Visual Demo */}
            <FadeIn delay={200} direction="left">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-blue-500/10 to-primary/20 rounded-3xl blur-2xl opacity-50" />
                <div className="relative bg-[#0d1117] rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
                  <div className="flex items-center gap-2 px-4 py-3 bg-[#161b22] border-b border-white/5">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/80" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                      <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    </div>
                    <span className="text-xs text-muted-foreground ml-4">AI Assistant</span>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <Sparkles className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 p-4 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                        <p className="text-sm text-foreground">💡 <strong>Hint:</strong> You're close! Try using a <code className="px-1.5 py-0.5 bg-primary/20 rounded text-primary text-xs">LEFT JOIN</code> instead of <code className="px-1.5 py-0.5 bg-primary/20 rounded text-primary text-xs">INNER JOIN</code> to include employees without departments.</p>
                        <p className="text-xs text-muted-foreground mt-3">📝 This will preserve all rows from the employees table, even when there's no match.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/[0.02] to-transparent" />

        <div className="relative max-w-7xl mx-auto px-6">
          <FadeIn>
            <div className="text-center max-w-3xl mx-auto mb-20">
              <span className="text-primary font-medium text-sm tracking-wide uppercase">How It Works</span>
              <h2 className="mt-4 text-4xl sm:text-5xl font-bold text-foreground">
                Three steps to
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400"> SQL mastery</span>
              </h2>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <FadeIn delay={0} direction="up" className="h-full">
              <div className="relative group h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative p-8 rounded-2xl border border-white/[0.08] bg-white/[0.02] text-center h-full hover:border-primary/30 transition-colors duration-300">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Terminal className="h-8 w-8 text-primary" />
                  </div>
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm flex items-center justify-center shadow-lg shadow-primary/25">1</div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Write Your Query</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Use our Monaco-powered editor with syntax highlighting and auto-completion
                  </p>
                </div>
                {/* Connector line */}
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
              </div>
            </FadeIn>

            {/* Step 2 */}
            <FadeIn delay={200} direction="up" className="h-full">
              <div className="relative group h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-500" />
                <div className="relative p-8 rounded-2xl border border-white/[0.08] bg-white/[0.02] text-center h-full hover:border-blue-500/30 transition-colors duration-300">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-500/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Play className="h-8 w-8 text-blue-400" />
                  </div>
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-blue-500 text-white font-bold text-sm flex items-center justify-center shadow-lg shadow-blue-500/25">2</div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Run & Test</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Execute instantly in your browser and see results compared against expected output
                  </p>
                </div>
                {/* Connector line */}
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-blue-500/50 to-transparent" />
              </div>
            </FadeIn>

            {/* Step 3 */}
            <FadeIn delay={400} direction="up" className="h-full">
              <div className="relative group h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-500" />
                <div className="relative p-8 rounded-2xl border border-white/[0.08] bg-white/[0.02] text-center h-full hover:border-emerald-500/30 transition-colors duration-300">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Rocket className="h-8 w-8 text-emerald-400" />
                  </div>
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-emerald-500 text-white font-bold text-sm flex items-center justify-center shadow-lg shadow-emerald-500/25">3</div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Learn & Level Up</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Get hints when stuck, track progress, and advance from easy to hard problems
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Stats Section - Enhanced */}
      <section className="py-24">
        <FadeIn className="w-full"><div className="max-w-7xl mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard value={100} label="Practice Problems" icon={Layers} color="from-primary to-emerald-500" />
            <StatCard value={8} label="Database Schemas" icon={Database} color="from-blue-500 to-cyan-500" />
            <StatCard value={10} label="SQL Topics" icon={Target} color="from-amber-500 to-orange-500" />
            <StatCard value={3} label="Difficulty Levels" icon={TrendingUp} color="from-pink-500 to-rose-500" />
          </div>
        </div></FadeIn>
      </section>

      {/* Topics Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/[0.02] to-transparent" />

        <FadeIn className="w-full"><div className="relative max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-primary font-medium text-sm tracking-wide uppercase">SQL Topics</span>
              <h2 className="mt-4 text-4xl sm:text-5xl font-bold text-foreground">
                From basics to
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400"> advanced</span>
              </h2>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                Progress through carefully structured problems covering all essential SQL concepts.
                Start with simple SELECT queries and work your way up to complex analytics.
              </p>

              <div className="mt-8 flex flex-wrap gap-2">
                {sqlTopics.map((topic, i) => (
                  <TopicPill key={topic} active={i < 3}>
                    {topic}
                  </TopicPill>
                ))}
              </div>

              <div className="mt-10">
                <Link href="/problems">
                  <Button className="gap-2" size="lg">
                    Browse All Problems
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Difficulty cards */}
            <div className="space-y-4">
              <DifficultyRow
                difficulty="Easy"
                count={stats.easy}
                color="emerald"
                description="Basic SELECT, WHERE, ORDER BY, simple aggregations"
                percentage={Math.round((stats.easy / stats.total) * 100)}
              />
              <DifficultyRow
                difficulty="Medium"
                count={stats.medium}
                color="amber"
                description="JOINs, GROUP BY, HAVING, subqueries"
                percentage={Math.round((stats.medium / stats.total) * 100)}
              />
              <DifficultyRow
                difficulty="Hard"
                count={stats.hard}
                color="red"
                description="Window functions, CTEs, complex analytics"
                percentage={Math.round((stats.hard / stats.total) * 100)}
              />
            </div>
          </div>
        </div></FadeIn>
      </section>

      {/* Datasets Section */}
      <section className="py-24">
        <FadeIn className="w-full"><div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-primary font-medium text-sm tracking-wide uppercase">Datasets</span>
            <h2 className="mt-4 text-4xl sm:text-5xl font-bold text-foreground">
              Real-world
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400"> Indian context</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Practice with realistic data featuring Indian names, businesses, and scenarios
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <DatasetCard
              icon={Users}
              title="HR & Employees"
              tables={["employees", "departments", "salaries"]}
              color="from-blue-500/20 to-transparent"
            />
            <DatasetCard
              icon={BookOpen}
              title="E-Commerce"
              tables={["customers", "orders", "products"]}
              color="from-emerald-500/20 to-transparent"
            />
            <DatasetCard
              icon={Database}
              title="Education"
              tables={["students", "marks", "subjects"]}
              color="from-amber-500/20 to-transparent"
            />
            <DatasetCard
              icon={Star}
              title="Healthcare"
              tables={["doctors", "patients", "appointments"]}
              color="from-pink-500/20 to-transparent"
            />
            <DatasetCard
              icon={BookOpen}
              title="Library System"
              tables={["books", "members", "borrowings"]}
              color="from-purple-500/20 to-transparent"
            />
            <DatasetCard
              icon={Star}
              title="Restaurants"
              tables={["restaurants", "menu_items", "reviews"]}
              color="from-orange-500/20 to-transparent"
            />
            <DatasetCard
              icon={Database}
              title="Banking"
              tables={["accounts", "transactions"]}
              color="from-cyan-500/20 to-transparent"
            />
            <DatasetCard
              icon={Trophy}
              title="Cricket IPL"
              tables={["teams", "players", "match_stats"]}
              color="from-red-500/20 to-transparent"
            />
          </div>
        </div></FadeIn>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />

        <FadeIn className="w-full"><div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-primary font-medium text-sm tracking-wide uppercase">What People Say</span>
            <h2 className="mt-4 text-4xl sm:text-5xl font-bold text-foreground">
              Loved by
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400"> developers</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <TestimonialCard
              quote="The AI hints are game-changing! They guide you without giving away the answer. Perfect for learning."
              author="Priya S."
              role="Full Stack Developer"
              avatar="P"
            />
            <TestimonialCard
              quote="Finally a SQL practice platform that runs in the browser. No setup, just start coding. Love the Indian datasets!"
              author="Rahul M."
              role="Data Analyst"
              avatar="R"
            />
            <TestimonialCard
              quote="The Monaco editor and instant validation make it feel like a real development environment. Highly recommended!"
              author="Ananya K."
              role="Backend Engineer"
              avatar="A"
            />
          </div>
        </div></FadeIn>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <FadeIn className="w-full"><div className="max-w-5xl mx-auto px-6">
          <div className="relative overflow-hidden rounded-3xl">
            {/* Background effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-blue-500/20" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px]" />

            <div className="relative border border-white/[0.08] rounded-3xl p-12 sm:p-16 text-center backdrop-blur-sm">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-8">
                <Command className="w-8 h-8 text-primary" />
              </div>

              <h2 className="text-4xl sm:text-5xl font-bold text-foreground">
                Ready to start your
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400"> SQL journey?</span>
              </h2>

              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Begin with easy problems and progress to advanced queries. Track your growth and become a SQL expert.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/problems">
                  <Button size="lg" className="gap-2 px-10 h-14 text-base font-semibold shadow-lg shadow-primary/25">
                    <Play className="h-5 w-5" />
                    Start Now - It's Free
                  </Button>
                </Link>
              </div>

              {/* Keyboard shortcut hint */}
              <div className="mt-8 inline-flex items-center gap-2 text-sm text-muted-foreground">
                <kbd className="px-2 py-1 rounded bg-white/[0.05] border border-white/10 font-mono text-xs">Ctrl</kbd>
                <span>+</span>
                <kbd className="px-2 py-1 rounded bg-white/[0.05] border border-white/10 font-mono text-xs">Enter</kbd>
                <span>to run queries</span>
              </div>
            </div>
          </div>
        </div></FadeIn>
      </section>

      {/* Enhanced Footer */}
      <footer className="border-t border-white/[0.05] py-16">
        <FadeIn className="w-full"><div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-emerald-500 flex items-center justify-center">
                  <Database className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <span className="font-bold text-foreground text-lg">SQL Practice</span>
                  <p className="text-xs text-muted-foreground">Master SQL interactively</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
                A free, browser-based SQL learning platform with AI-powered hints.
                Practice with 100+ problems and real-world Indian datasets.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/problems" className="text-muted-foreground hover:text-primary transition-colors">
                    All Problems
                  </Link>
                </li>
                <li>
                  <Link href="/problems?difficulty=Easy" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    Easy Problems
                  </Link>
                </li>
                <li>
                  <Link href="/problems?difficulty=Medium" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    Medium Problems
                  </Link>
                </li>
                <li>
                  <Link href="/problems?difficulty=Hard" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500" />
                    Hard Problems
                  </Link>
                </li>
              </ul>
            </div>

            {/* Tech Stack */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Built With</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Code2 className="h-4 w-4" />
                  Next.js 15
                </li>
                <li className="flex items-center gap-2">
                  <Database className="h-4 w-4" />
                  sql.js (WebAssembly)
                </li>
                <li className="flex items-center gap-2">
                  <Terminal className="h-4 w-4" />
                  Monaco Editor
                </li>
                <li className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  Gemini AI
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              Made with <Heart className="h-4 w-4 text-red-500" /> for SQL learners
            </p>
            <div className="flex items-center gap-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div></FadeIn>
      </footer>

      {/* Custom styles for animations */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100vh) rotate(720deg); opacity: 0; }
        }
        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </div>
  )
}

function DifficultyRow({
  difficulty,
  count,
  color,
  description,
  percentage,
}: {
  difficulty: string
  count: number
  color: "emerald" | "amber" | "red"
  description: string
  percentage: number
}) {
  const colors = {
    emerald: {
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
      text: "text-emerald-400",
      bar: "bg-emerald-500",
    },
    amber: {
      bg: "bg-amber-500/10",
      border: "border-amber-500/20",
      text: "text-amber-400",
      bar: "bg-amber-500",
    },
    red: {
      bg: "bg-red-500/10",
      border: "border-red-500/20",
      text: "text-red-400",
      bar: "bg-red-500",
    },
  }

  const c = colors[color]

  return (
    <div className={`p-5 rounded-xl border ${c.border} ${c.bg} backdrop-blur-sm`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${c.bg} ${c.text} border ${c.border}`}>
            {difficulty}
          </span>
          <span className="text-2xl font-bold text-foreground">{count}</span>
          <span className="text-muted-foreground text-sm">problems</span>
        </div>
        <span className={`text-sm font-medium ${c.text}`}>{percentage}%</span>
      </div>
      <p className="text-sm text-muted-foreground mb-3">{description}</p>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <div className={`h-full ${c.bar} rounded-full transition-all duration-1000`} style={{ width: `${percentage}%` }} />
      </div>
    </div>
  )
}

function DatasetCard({
  icon: Icon,
  title,
  tables,
  color,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  tables: string[]
  color: string
}) {
  return (
    <div className="group relative p-5 rounded-xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300 hover:border-white/[0.12]">
      <div className={`absolute inset-0 bg-gradient-to-br ${color} rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

      <div className="relative">
        <div className="flex items-center gap-3 mb-4">
          <Icon className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-foreground">{title}</h3>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {tables.map((table) => (
            <span
              key={table}
              className="px-2 py-1 text-xs bg-white/[0.03] text-muted-foreground rounded-md font-mono border border-white/[0.05]"
            >
              {table}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
