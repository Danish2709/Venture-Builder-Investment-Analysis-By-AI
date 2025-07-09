import { redirect } from "next/navigation"

export default function DashboardPage() {
  // Redirect to main dashboard for better UX
  redirect("/dashboard/main")
}
