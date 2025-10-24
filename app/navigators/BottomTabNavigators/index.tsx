import { useCallback } from "react"
import { BottomTabBarProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import { DashboardScreen } from "@/screens"

import BottomTabBar from "./BottomTabBar"
import { BottomTabParamList } from "./props"

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
      {/* <Tab.Screen name="New" component={DiscoverScreen} /> */}
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
