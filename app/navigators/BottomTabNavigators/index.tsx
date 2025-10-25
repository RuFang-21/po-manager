import { useCallback } from "react"
import { BottomTabBarProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import BottomTabBar from "./BottomTabBar"
import { BottomTabParamList } from "./props"
import { DashboardScreen } from "../../screens/DashboardScreen"
import { NewOrderScreen } from "../../screens/NewOrderScreen"

/**
 * ===========================
 * MAIN
 * ===========================
 */
const Tab = createBottomTabNavigator<BottomTabParamList>()

export const BottomTabNavigator = () => {
  const renderBottomTab = useCallback((props: BottomTabBarProps) => {
    return <BottomTabBar {...props} />
  }, [])

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={renderBottomTab}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="NewOrder" component={NewOrderScreen} />
    </Tab.Navigator>
  )
}

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export * from "./props"
export default BottomTabNavigator
