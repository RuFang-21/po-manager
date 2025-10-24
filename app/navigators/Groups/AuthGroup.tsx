import { SignInScreen } from "@/screens"

import { CommonGroupProps } from "./props"

/**
 * ===========================
 * MAIN
 * ===========================
 */
export const createAuthGroup = (props: CommonGroupProps) => {
  const { Stack } = props

  // =============== VIEWS
  return (
    <Stack.Group>
      <Stack.Screen name="Signin" component={SignInScreen} />
    </Stack.Group>
  )
}

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export default createAuthGroup
