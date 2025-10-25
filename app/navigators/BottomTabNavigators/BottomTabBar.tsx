import { memo, useCallback, useMemo } from "react"
import { TouchableOpacity } from "react-native"
import { BottomTabBarProps } from "@react-navigation/bottom-tabs"
import { getTokens, XStack } from "tamagui"

import HomepageIcon from "@assets/icons/bottomTab/homepage.svg"
import OrderIcon from "@assets/icons/bottomTab/order.svg"

import { BottomTabParamList } from "./props"

/**
 * ===========================
 * MAIN
 * ===========================
 */
const BottomTabBarView: React.FC<BottomTabBarProps> = (props) => {
  const { descriptors, insets, navigation, state } = props

  // =============== VARIABLES

  const tamaguiTokens = getTokens()

  const tabItems = useMemo(
    () => [
      {
        name: "Dashboard",
        Icon: HomepageIcon,
      },
      {
        name: "NewOrder",
        Icon: OrderIcon,
      },
    ],
    [],
  )

  // =============== RENDERER
  const renderIcon = useCallback(
    (focused: boolean, name: string) => {
      const tab = tabItems.find((t) => t.name === name)
      if (!tab) return null
      const Icon = tab.Icon

      return (
        <Icon
          color={
            focused ? tamaguiTokens.color.$primaryText.val : tamaguiTokens.color.$secondaryText.val
          }
          fill={focused ? tamaguiTokens.color.$primaryText.val : "white"}
        />
      )
    },
    [tabItems, tamaguiTokens],
  )

  // =============== VIEWS
  return (
    <XStack
      style={{
        elevation: 10,
        shadowColor: "black",
        shadowOffset: { width: 0, height: -1 },
        shadowRadius: 6,
        shadowOpacity: 0.05,
      }}
      backgroundColor={"white"}
      paddingTop={"$2xs"}
      paddingBottom={insets?.bottom + 4}
      zIndex={2}
    >
      {state?.routes?.map((route, index) => {
        const { options } = descriptors?.[route.key]

        const isFocused = state.index === index
        const routeName = route?.name as keyof BottomTabParamList

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          })

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name)
          }
        }

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          })
        }

        return (
          <TouchableOpacity
            key={route?.key}
            disabled={isFocused}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: tamaguiTokens?.space?.["2xs"]?.val,
            }}
          >
            {renderIcon(isFocused, routeName)}
          </TouchableOpacity>
        )
      })}
    </XStack>
  )
}

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export const BottomTabBar = memo(BottomTabBarView)
export default BottomTabBar

export { BottomTabBarProps }
