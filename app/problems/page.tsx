import { ProblemsList } from "@/components/problems-list"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "SQL Practice - Problems",
  description: "Master SQL with hands-on practice problems. From basic queries to advanced joins and subqueries.",
}

export default function ProblemsPage() {
  return <ProblemsList />
}
