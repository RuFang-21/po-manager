import { CommonGroupProps } from "./props"
import { OrderDetailScreen } from "../../screens"

/**
 * ===========================
 * MAIN
 * ===========================
 */
export const createOrderGroup = (props: CommonGroupProps) => {
  const { Stack } = props

  // =============== VIEWS
  return (
    <Stack.Group>
      <Stack.Screen name="OrderDetail" component={OrderDetailScreen} />
    </Stack.Group>
  )
}

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export default createOrderGroup
