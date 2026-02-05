"use client"

import { useRef, useEffect, forwardRef, useImperativeHandle } from "react"
import Editor, { type OnMount, type Monaco } from "@monaco-editor/react"
import type { editor, languages } from "monaco-editor"
import { SQL_SNIPPETS } from "@/lib/sql-snippets"

export interface SqlEditorRef {
  format: () => void
}

interface SqlEditorProps {
  value: string
  onChange: (value: string) => void
  onRun?: () => void
  schema?: { name: string; columns: { name: string; type: string; pk: boolean }[] }[]
}

export const SqlEditor = forwardRef<SqlEditorRef, SqlEditorProps>(({ value, onChange, onRun, schema }, ref) => {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null)
  const monacoRef = useRef<Monaco | null>(null)
  const completionProviderRef = useRef<IDisposable | null>(null)
  const schemaRef = useRef(schema)

  // Update schema ref when schema changes
  useEffect(() => {
    schemaRef.current = schema
  }, [schema])

  useImperativeHandle(ref, () => ({
    format: () => {
      editorRef.current?.getAction("editor.action.formatDocument")?.run()
    },
  }))

  const handleEditorMount: OnMount = (editor, monaco) => {
    editorRef.current = editor
    monacoRef.current = monaco

    // Use default VS Code dark theme
    monaco.editor.setTheme("vs-dark")

    // Register completion provider for SQL
    if (!completionProviderRef.current) {
      completionProviderRef.current = monaco.languages.registerCompletionItemProvider("sql", {
        provideCompletionItems: (model: editor.ITextModel, position: any) => {
          const word = model.getWordUntilPosition(position);
          const range = {
            startLineNumber: position.lineNumber,
            endLineNumber: position.lineNumber,
            startColumn: word.startColumn,
            endColumn: word.endColumn,
          };

          const suggestions: languages.CompletionItem[] = [
            // Add fixed snippets
            ...SQL_SNIPPETS.map(snippet => ({
              label: snippet.label,
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: snippet.insertText,
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              detail: snippet.detail,
              range: range,
            })),

            // Add table names
            ...(schemaRef.current || []).map(table => ({
              label: table.name,
              kind: monaco.languages.CompletionItemKind.Class,
              insertText: table.name,
              detail: 'Table',
              range: range,
            })),

            // Add column names
            ...(schemaRef.current || []).flatMap(table =>
              table.columns.map(col => ({
                label: col.name,
                kind: monaco.languages.CompletionItemKind.Field,
                insertText: col.name,
                detail: `Column (${table.name})`,
                range: range,
              }))
            )
          ];

          return { suggestions };
        },
      });
    }

    // Add keyboard shortcut for running query
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      onRun?.()
    })

    // Focus editor
    editor.focus()
  }

  // Effect to clean up completion provider
  useEffect(() => {
    return () => {
      if (completionProviderRef.current) {
        completionProviderRef.current.dispose();
        completionProviderRef.current = null;
      }
    };
  }, []);

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
            verticalScrollbarSize: 10,
            horizontalScrollbarSize: 10,
          },
          // Mobile improvements
          mouseWheelZoom: true,
          contextmenu: true,
          quickSuggestions: {
            other: true,
            comments: false,
            strings: true
          },
          suggestOnTriggerCharacters: true,
          acceptSuggestionOnEnter: "on",
          tabCompletion: "on",
          wordBasedSuggestions: "allDocuments",
          parameterHints: {
            enabled: true
          }
        }}
        loading={
          <div className="flex items-center justify-center h-full bg-background">
            <span className="text-muted-foreground text-sm">Loading editor...</span>
          </div>
        }
      />
    </div>
  )
})

SqlEditor.displayName = "SqlEditor"

// Type for monaco disposable (optional, for better TS support if needed)
interface IDisposable {
  dispose(): void;
}
