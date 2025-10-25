import { BottomTabScreenProps } from "../../navigators/BottomTabNavigators"

/**
 * ===========================
 * MAIN
 * ===========================
 */
export type AiInsightScreenProps = BottomTabScreenProps<"AiInsight">
export interface InsightItem {
  id: string
  finished_goods: string
  due_date: string
  status: string
  suggestion: string
}

export interface AiInsightResponse {
  summary: string
  insights: InsightItem[]
}
/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export default AiInsightScreenProps
