"use client"

import { useState } from "react"
import { ChevronRight, ChevronDown, Table2, Key, Database, Loader2, MousePointer } from "lucide-react"
import { cn } from "@/lib/utils"

interface Column {
  name: string
  type: string
  pk: boolean
}

interface TableSchema {
  name: string
  columns: Column[]
}

interface SchemaExplorerProps {
  schema: TableSchema[]
  onTableClick?: (tableName: string) => void
  isLoading?: boolean
}

export function SchemaExplorer({ schema, onTableClick, isLoading }: SchemaExplorerProps) {
  const [expandedTables, setExpandedTables] = useState<Set<string>>(
    new Set(schema.map((t) => t.name))
  )

  const toggleTable = (tableName: string) => {
    const newExpanded = new Set(expandedTables)
    if (newExpanded.has(tableName)) {
      newExpanded.delete(tableName)
    } else {
      newExpanded.add(tableName)
    }
    setExpandedTables(newExpanded)
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
          <Loader2 className="h-6 w-6 text-primary animate-spin" />
        </div>
        <p className="text-sm text-muted-foreground">Loading schema...</p>
      </div>
    )
  }

  if (schema.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6">
        <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
          <Database className="h-6 w-6 text-muted-foreground" />
        </div>
        <p className="text-sm text-muted-foreground">No tables found</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-gradient-to-b from-card to-transparent">
        <Database className="h-4 w-4 text-primary" />
        <span className="text-sm font-semibold text-foreground">Schema Explorer</span>
        <span className="ml-auto text-xs text-muted-foreground">{schema.length} tables</span>
      </div>

      {/* Tip */}
      <div className="flex items-center gap-2 px-4 py-2 text-xs text-muted-foreground border-b border-border/50 bg-secondary/30">
        <MousePointer className="h-3 w-3" />
        <span>Click table name to query</span>
      </div>

      {/* Tables */}
      <div className="flex-1 overflow-y-auto p-2">
        {schema.map((table) => (
          <div key={table.name} className="mb-1">
            <div
              className={cn(
                "flex items-center gap-2 w-full px-2 py-2 rounded-lg text-left",
                "hover:bg-secondary/50 transition-colors group cursor-pointer"
              )}
            >
              <button
                onClick={() => toggleTable(table.name)}
                className="flex items-center gap-2 flex-1"
              >
                {expandedTables.has(table.name) ? (
                  <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                ) : (
                  <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                )}
                <div className="w-7 h-7 rounded-md bg-primary/10 flex items-center justify-center">
                  <Table2 className="h-4 w-4 text-primary" />
                </div>
              </button>
              <span
                className="text-sm font-medium text-foreground hover:text-primary transition-colors flex-1 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation()
                  onTableClick?.(table.name)
                }}
              >
                {table.name}
              </span>
              <span className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                {table.columns.length} cols
              </span>
            </div>

            {expandedTables.has(table.name) && (
              <div className="ml-4 mt-1 mb-2 pl-4 border-l-2 border-border space-y-0.5">
                {table.columns.map((column) => (
                  <div
                    key={column.name}
                    className="flex items-center gap-2 px-2 py-1.5 text-sm rounded-md hover:bg-secondary/30 transition-colors"
                  >
                    {column.pk ? (
                      <Key className="h-3.5 w-3.5 text-warning shrink-0" />
                    ) : (
                      <div className="w-3.5 h-3.5 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
                      </div>
                    )}
                    <span className={cn("text-foreground", column.pk && "font-medium")}>
                      {column.name}
                    </span>
                    <span className="text-xs text-muted-foreground font-mono ml-auto bg-secondary/50 px-1.5 py-0.5 rounded">
                      {column.type || "TEXT"}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
