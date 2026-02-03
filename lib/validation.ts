import type { QueryResult } from "@/hooks/use-sql"
import type { ValidationResult } from "@/lib/workspace-store"

function normalizeRow(row: (string | number | null)[]): string {
  return JSON.stringify(row.map((v) => (v === null ? null : String(v).toLowerCase().trim())))
}

function normalizeColumns(columns: string[]): string[] {
  return columns.map((c) => c.toLowerCase().trim())
}

export function validateResults(
  userResult: QueryResult,
  expectedResult: QueryResult,
  orderMatters: boolean = false
): ValidationResult {
  const expectedColumns = normalizeColumns(expectedResult.columns)
  const actualColumns = normalizeColumns(userResult.columns)

  // Check columns match
  const columnsMatch =
    expectedColumns.length === actualColumns.length &&
    expectedColumns.every((col, idx) => col === actualColumns[idx])

  // Check row count
  const rowCountMatch = userResult.values.length === expectedResult.values.length

  // Check values
  let valuesMatch = false

  if (columnsMatch && rowCountMatch) {
    if (orderMatters) {
      // Direct comparison
      valuesMatch = expectedResult.values.every((expectedRow, rowIdx) => {
        const actualRow = userResult.values[rowIdx]
        return normalizeRow(expectedRow) === normalizeRow(actualRow)
      })
    } else {
      // Order-insensitive comparison
      const expectedNormalized = expectedResult.values.map(normalizeRow).sort()
      const actualNormalized = userResult.values.map(normalizeRow).sort()

      valuesMatch =
        expectedNormalized.length === actualNormalized.length &&
        expectedNormalized.every((row, idx) => row === actualNormalized[idx])
    }
  }

  return {
    columnsMatch,
    rowCountMatch,
    valuesMatch,
    expectedColumns: expectedResult.columns,
    actualColumns: userResult.columns,
    expectedRowCount: expectedResult.values.length,
    actualRowCount: userResult.values.length,
  }
}
