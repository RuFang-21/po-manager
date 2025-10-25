import { NavigatorScreenParams } from "@react-navigation/native"

import { BottomTabParamList } from "../BottomTabNavigators"

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 *   https://reactnavigation.org/docs/typescript/#organizing-types
 */

export type AppStackParamList = {
  // 🔥 Your screens go here
  // IGNITE_GENERATOR_ANCHOR_APP_STACK_PARAM_LIST
  Welcome: undefined
  BottomTab: NavigatorScreenParams<BottomTabParamList>
  MainTabs: NavigatorScreenParams<BottomTabParamList>
  Signin: undefined
  OrderDetail: { id: string }
  NewOrder: undefined
}
