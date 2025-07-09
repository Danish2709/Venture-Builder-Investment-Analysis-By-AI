import {
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Shield,
  Rocket,
  TrendingUp,
  Users,
  Code,
  DollarSign,
  Target,
  Globe,
  Settings,
  Circle,
} from "lucide-react"

export const ASSESSMENT_STEPS = [
  { title: "Setup", description: "Configure assessment" },
  { title: "Scoring", description: "Evaluate criteria" },
  { title: "Risk", description: "Identify red flags" },
  { title: "Results", description: "Review decision" },
] as const

export const SCORE_OPTIONS = [
  { value: "", label: "—" },
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5", label: "5" },
] as const

export const DECISION_THRESHOLDS = {
  "direct-investment": { exceptional: 80, promising: 60 },
  "venture-build": { exceptional: 85, promising: 70 },
} as const

export const RISK_IMPACT_THRESHOLD = 25

export const ICONS = {
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Shield,
  Rocket,
  TrendingUp,
  Users,
  Code,
  DollarSign,
  Target,
  Globe,
  Settings,
  Circle,
} as const
