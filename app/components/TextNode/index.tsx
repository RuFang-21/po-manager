import { memo } from "react"

import TextNodeProps from "./props"
import Text from "../Text"

/**
 * ===========================
 * MAIN
 * ===========================
 */
const TextNodeView: React.FC<TextNodeProps> = (props) => {
  const { children } = props

  // =============== VIEWS
  if (children && typeof children !== "string" && typeof children !== "number") return children
  return <Text {...props} />
}

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export * from "./props"
export const TextNode = memo(TextNodeView)
export default TextNode
