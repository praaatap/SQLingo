import { useParams, Navigate } from "react-router-dom"
import { getQuestionById } from "@/lib/questions"
import { Workspace } from "@/components/workspace"

export default function ProblemPage() {
    const { id } = useParams<{ id: string }>()
    const question = id ? getQuestionById(id) : undefined

    if (!question) {
        return <Navigate to="/404" replace />
    }

    return <Workspace question={question} />
}

