import { Fragment, memo, useCallback, useMemo } from "react"
import { TouchableOpacity } from "react-native"
import { BottomTabBarProps } from "@react-navigation/bottom-tabs"
import { NavigationProp } from "@react-navigation/native"
import { Plus } from "@tamagui/lucide-icons"
import { getTokens, Stack, XStack } from "tamagui"

import HomepageIcon from "@assets/icons/bottomTab/homepage.svg"


import { BottomTabParamList } from "./props"
import { AppStackParamList } from "../navigationTypes"

/**
 * ===========================
 * MAIN
 * ===========================
 */
const BottomTabBarView: React.FC<BottomTabBarProps> = (props) => {
  const { descriptors, insets, navigation, state } = props

  // =============== HOOKS
  const parentNav: NavigationProp<AppStackParamList> = navigation.getParent()

  // =============== VARIABLES

  const tamaguiTokens = getTokens()

  const tabItems = useMemo(
    () => [
      {
        name: "Homepage",
        Icon: HomepageIcon,
      },
      // {
      //   name: "Discover",
      //   Icon: DiscoverIcon,
      // },
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
          <Fragment key={route?.key}>
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

            {/* Render a create session button right behind discover tab button */}
            {routeName === "Discover" && (
              <TouchableOpacity
                key={`create-session-button`}
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  paddingVertical: tamaguiTokens?.space?.["2xs"]?.val,
                }}
                onPress={() => {
                  parentNav.navigate("CreateSession")
                }}
              >
                <Stack
                  aspectRatio={1}
                  height={"$4xl"}
                  justifyContent="center"
                  alignItems="center"
                  borderRadius={"$common"}
                  backgroundColor={"$primary500"}
                >
                  <Plus color={"white"} />
                </Stack>
              </TouchableOpacity>
            )}
          </Fragment>
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
