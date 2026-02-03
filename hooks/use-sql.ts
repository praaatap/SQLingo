"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import initSqlJs, { type Database, type SqlJsStatic } from "sql.js"

export interface QueryResult {
  columns: string[]
  values: (string | number | null)[][]
}

export interface ExecutionResult {
  result: QueryResult | null
  error: string | null
  executionTime: number
  rowCount: number
}

let sqlPromise: Promise<SqlJsStatic> | null = null

function getSqlJs(): Promise<SqlJsStatic | null> {
  if (!sqlPromise) {
    sqlPromise = initSqlJs({
      locateFile: (file:any) => `https://sql.js.org/dist/${file}`,
    })
  }
  return sqlPromise;
}

export function useSql(datasetSQL: string) {
  const [db, setDb] = useState<Database | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const dbRef = useRef<Database | null>(null)

  const initializeDatabase = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      if (dbRef.current) {
        dbRef.current.close()
      }

      const SQL = await getSqlJs()
      const newDb = new SQL.Database()

      if (datasetSQL) {
        newDb.run(datasetSQL)
      }

      dbRef.current = newDb
      setDb(newDb)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to initialize database")
    } finally {
      setIsLoading(false)
    }
  }, [datasetSQL])

  useEffect(() => {
    initializeDatabase()

    return () => {
      if (dbRef.current) {
        dbRef.current.close()
        dbRef.current = null
      }
    }
  }, [initializeDatabase])

  const executeQuery = useCallback(
    (query: string): ExecutionResult => {
      if (!dbRef.current) {
        return {
          result: null,
          error: "Database not initialized",
          executionTime: 0,
          rowCount: 0,
        }
      }

      const startTime = performance.now()

      try {
        const trimmedQuery = query.trim()
        if (!trimmedQuery) {
          return {
            result: null,
            error: "Empty query",
            executionTime: 0,
            rowCount: 0,
          }
        }

        const results = dbRef.current.exec(trimmedQuery)
        const endTime = performance.now()

        if (results.length === 0) {
          return {
            result: { columns: [], values: [] },
            error: null,
            executionTime: endTime - startTime,
            rowCount: 0,
          }
        }

        const lastResult = results[results.length - 1]
        return {
          result: {
            columns: lastResult.columns,
            values: lastResult.values,
          },
          error: null,
          executionTime: endTime - startTime,
          rowCount: lastResult.values.length,
        }
      } catch (err) {
        const endTime = performance.now()
        return {
          result: null,
          error: err instanceof Error ? err.message : "Query execution failed",
          executionTime: endTime - startTime,
          rowCount: 0,
        }
      }
    },
    []
  )

  const getSchema = useCallback((): { name: string; columns: { name: string; type: string; pk: boolean }[] }[] => {
    if (!dbRef.current) return []

    try {
      const tablesResult = dbRef.current.exec(
        "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'"
      )

      if (tablesResult.length === 0) return []

      const tables = tablesResult[0].values.map((row) => row[0] as string)
      const schema: { name: string; columns: { name: string; type: string; pk: boolean }[] }[] = []

      for (const tableName of tables) {
        const columnsResult = dbRef.current.exec(`PRAGMA table_info("${tableName}")`)

        if (columnsResult.length > 0) {
          const columns = columnsResult[0].values.map((row) => ({
            name: row[1] as string,
            type: row[2] as string,
            pk: row[5] === 1,
          }))

          schema.push({ name: tableName, columns })
        }
      }

      return schema
    } catch {
      return []
    }
  }, [])

  const resetDatabase = useCallback(() => {
    initializeDatabase()
  }, [initializeDatabase])

  return {
    db,
    isLoading,
    error,
    executeQuery,
    getSchema,
    resetDatabase,
  }
}
