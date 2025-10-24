import { createNativeStackNavigator } from "@react-navigation/native-stack"

import { AppStackParamList } from "../AppNavigator/props"

/**
 * ===========================
 * MAIN
 * ===========================
 */
export type CommonGroupProps = {
  Stack: ReturnType<typeof createNativeStackNavigator<AppStackParamList>>
}

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export default CommonGroupProps
