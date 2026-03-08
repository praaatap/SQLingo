import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const API_KEY = process.env.GEMINI_API_KEY
if (!API_KEY) {
    console.error("Error: GEMINI_API_KEY environment variable is not set.")
    process.exit(1)
}

const QUESTIONS_FILE = path.join(__dirname, "../src/lib/questions.ts")

async function generateQuestion(topic = "", difficulty = "Medium") {
    const prompt = `You are an expert SQL curriculum designer. Generate a new, high-quality SQL practice question.
Topic: ${topic || "Any common SQL task"}
Difficulty: ${difficulty}
Indian context names and scenarios.

Respond ONLY with a JSON object following this structure:
{
  "id": "new-id",
  "title": "Title",
  "difficulty": "${difficulty}",
  "description": "Markdown description",
  "datasetSQL": "CREATE and INSERT",
  "starterSQL": "-- Starter",
  "expectedQuerySQL": "Solution",
  "tags": ["tag1"],
  "hints": ["hint1"]
}`

    const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
            }),
        }
    )

    const data = await response.json()
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || ""
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) throw new Error("Could not parse JSON from AI response")
    return JSON.parse(jsonMatch[0])
}

async function main() {
    const topic = process.argv[2] || ""
    const difficulty = process.argv[3] || "Medium"

    console.log(`Generating a ${difficulty} question about ${topic || "random topic"}...`)

    try {
        const question = await generateQuestion(topic, difficulty)

        // Read existing file to get the last ID
        const content = fs.readFileSync(QUESTIONS_FILE, "utf-8")
        const idMatches = content.match(/id: "(\d+)"/g)
        const lastId = idMatches ? Math.max(...idMatches.map(m => parseInt(m.match(/\d+/)[0]))) : 0
        question.id = (lastId + 1).toString()

        const questionString = `  {
    id: "${question.id}",
    title: "${question.title}",
    difficulty: "${question.difficulty}",
    description: \`${question.description}\`,
    datasetSQL: \`${question.datasetSQL}\`,
    starterSQL: \`${question.starterSQL}\`,
    expectedQuerySQL: \`${question.expectedQuerySQL}\`,
    tags: ${JSON.stringify(question.tags)},
    hints: ${JSON.stringify(question.hints)},
  },`

        const updatedContent = content.replace(
            /export const questions: Question\[] = \[/,
            `export const questions: Question[] = [\n${questionString}`
        )

        fs.writeFileSync(QUESTIONS_FILE, updatedContent)
        console.log(`Successfully added question #${question.id}: ${question.title}`)
    } catch (error) {
        console.error("Failed to generate or save question:", error)
    }
}

main()
