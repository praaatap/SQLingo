"use client"

import { useRef, useEffect } from "react"
import Editor, { type OnMount, type Monaco } from "@monaco-editor/react"
import type { editor } from "monaco-editor"

interface SqlEditorProps {
  value: string
  onChange: (value: string) => void
  onRun?: () => void
}

export function SqlEditor({ value, onChange, onRun }: SqlEditorProps) {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null)
  const monacoRef = useRef<Monaco | null>(null)

  const handleEditorMount: OnMount = (editor, monaco) => {
    editorRef.current = editor
    monacoRef.current = monaco

    // Define custom dark theme matching our app
    monaco.editor.defineTheme("sql-dark", {
      base: "vs-dark",
      inherit: true,
      rules: [
        { token: "keyword", foreground: "3dd68c", fontStyle: "bold" },
        { token: "string", foreground: "fbbf24" },
        { token: "number", foreground: "60a5fa" },
        { token: "comment", foreground: "6b7280", fontStyle: "italic" },
        { token: "operator", foreground: "f472b6" },
        { token: "identifier", foreground: "e5e7eb" },
      ],
      colors: {
        "editor.background": "#0f1117",
        "editor.foreground": "#e5e7eb",
        "editor.lineHighlightBackground": "#1f2937",
        "editor.selectionBackground": "#3dd68c30",
        "editorCursor.foreground": "#3dd68c",
        "editorLineNumber.foreground": "#6b7280",
        "editorLineNumber.activeForeground": "#e5e7eb",
        "editor.inactiveSelectionBackground": "#3dd68c20",
      },
    })

    monaco.editor.setTheme("sql-dark")

    // Add keyboard shortcut for running query
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      onRun?.()
    })

    // Focus editor
    editor.focus()
  }

  useEffect(() => {
    if (editorRef.current && monacoRef.current) {
      editorRef.current.addCommand(
        monacoRef.current.KeyMod.CtrlCmd | monacoRef.current.KeyCode.Enter,
        () => {
          onRun?.()
        }
      )
    }
  }, [onRun])

  return (
    <div className="h-full w-full rounded-md overflow-hidden border border-border">
      <Editor
        height="100%"
        defaultLanguage="sql"
        value={value}
        onChange={(val) => onChange(val || "")}
        onMount={handleEditorMount}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          fontFamily: "Geist Mono, monospace",
          lineNumbers: "on",
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
          wordWrap: "on",
          padding: { top: 16, bottom: 16 },
          renderLineHighlight: "all",
          cursorBlinking: "smooth",
          cursorSmoothCaretAnimation: "on",
          smoothScrolling: true,
          bracketPairColorization: { enabled: true },
          scrollbar: {
            verticalScrollbarSize: 8,
            horizontalScrollbarSize: 8,
          },
        }}
        loading={
          <div className="flex items-center justify-center h-full bg-background">
            <span className="text-muted-foreground text-sm">Loading editor...</span>
          </div>
        }
      />
    </div>
  )
}
