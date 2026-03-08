"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

interface AISettings {
    geminiApiKey: string | null
    setGeminiApiKey: (key: string | null) => void
}

export const useAISettings = create<AISettings>()(
    persist(
        (set) => ({
            geminiApiKey: null,
            setGeminiApiKey: (key) => set({ geminiApiKey: key }),
        }),
        {
            name: "sql-ai-settings",
        }
    )
)

export interface AIResponse {
    suggestion: string
    explanation: string
}

export async function generateSQLSuggestion(
    apiKey: string,
    questionTitle: string,
    questionDescription: string,
    schema: { name: string; columns: { name: string; type: string }[] }[],
    currentQuery: string,
    errorMessage?: string
): Promise<AIResponse> {
    const schemaText = schema
        .map(
            (table) =>
                `Table: ${table.name}\nColumns: ${table.columns
                    .map((c) => `${c.name} (${c.type})`)
                    .join(", ")}`
        )
        .join("\n\n")

    const prompt = `You are an expert SQL tutor helping a student learn SQL. 

**Problem:** ${questionTitle}

**Description:** ${questionDescription}

**Database Schema:**
${schemaText}

**Current Query (student's attempt):**
\`\`\`sql
${currentQuery || "-- No query written yet"}
\`\`\`

${errorMessage ? `**Error Message:** ${errorMessage}` : ""}

**Your Task:**
1. Provide a helpful hint or suggestion to guide the student
2. Do NOT give the complete solution directly
3. If there's an error, explain what's wrong
4. Give the student direction on what concept or approach to try next

Respond in JSON format:
{
  "suggestion": "A brief hint or partial SQL code suggestion (do not give full answer)",
  "explanation": "A 2-3 sentence explanation of the approach to take"
}

Remember: Guide, don't solve. Help them learn!`

    const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [{ text: prompt }],
                    },
                ],
                generationConfig: {
                    temperature: 0.7,
                    topP: 0.8,
                    topK: 40,
                    maxOutputTokens: 1024,
                },
            }),
        }
    )

    if (!response.ok) {
        const error = await response.text()
        throw new Error(`Gemini API error: ${response.status} - ${error}`)
    }

    const data = await response.json()

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || ""

    // Parse JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
        try {
            return JSON.parse(jsonMatch[0])
        } catch {
            // If JSON parsing fails, return text as is
            return {
                suggestion: text,
                explanation: "Here's a helpful tip for solving this problem.",
            }
        }
    }

    return {
        suggestion: text,
        explanation: "Here's a helpful tip for solving this problem.",
    }
}

export async function generateNewSQLQuestion(
    apiKey: string,
    topic?: string,
    difficulty: "Easy" | "Medium" | "Hard" = "Medium",
    existingSchemas?: string
): Promise<any> {
    const prompt = `You are an expert SQL curriculum designer. Your task is to generate a new, high-quality SQL practice question.

${topic ? `**Topic/Focus:** ${topic}` : "**Topic:** Any common SQL task (joins, aggregations, window functions, etc.)"}
**Difficulty:** ${difficulty}

${existingSchemas ? `**Database Context (Schema):**\n${existingSchemas}` : "**Note:** Create a realistic scenario with an Indian context (names, places, businesses)."}

**Your Task:**
Create a question that follows this exact JSON structure:
{
  "id": "generated-unique-id",
  "title": "Clear, concise title",
  "difficulty": "${difficulty}",
  "description": "Markdwon description with example output table",
  "datasetSQL": "CREATE TABLE and INSERT INTO statements to set up the data",
  "starterSQL": "-- Starter code for the student",
  "expectedQuerySQL": "The correct answer SQL query",
  "tags": ["SQL keywords", "topic"],
  "hints": ["Hint 1", "Hint 2"],
  "constraints": ["Constraint 1 (optional)"]
}

Respond ONLY with the JSON object. Ensure the SQL is valid and matches the scenario.`

    const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [{ text: prompt }],
                    },
                ],
                generationConfig: {
                    temperature: 0.8,
                    maxOutputTokens: 2048,
                },
            }),
        }
    )

    if (!response.ok) {
        const error = await response.text()
        throw new Error(`Gemini API error: ${response.status} - ${error}`)
    }

    const data = await response.json()
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || ""

    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
        return JSON.parse(jsonMatch[0])
    }

    throw new Error("Failed to parse generated question JSON")
}
