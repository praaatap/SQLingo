import { notFound } from "next/navigation"
import { getQuestionById, questions } from "@/lib/questions"
import { Workspace } from "@/components/workspace"

export function generateStaticParams() {
  return questions.map((q) => ({ id: q.id }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const question = getQuestionById(id)

  if (!question) {
    return { title: "Problem Not Found" }
  }

  return {
    title: `${question.title} - SQL Practice`,
    description: `Practice SQL with this ${question.difficulty.toLowerCase()} problem: ${question.title}`,
  }
}

export default async function ProblemPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const question = getQuestionById(id)

  if (!question) {
    notFound()
  }

  return <Workspace question={question} />
}
