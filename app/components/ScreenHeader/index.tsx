import { memo } from "react"
import { Platform, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Stack, XStack } from "tamagui"

import LeftIcon from "@assets/icons/arrow_left.svg"

import { ScreenHeaderProps } from "./props"
import { Text } from "../Text"

/**
 * ===========================
 * MAIN
 * ===========================
 */
const ScreenHeaderView: React.FC<ScreenHeaderProps> = (props) => {
  const {
    right,
    left,
    title = "",
    titleProps,
    extra,
    containerProps,
    innerContainerProps,
    unsafe: disableScreenPaddingTop = false,
    onPressBack,
  } = props

  // #region ============== HOOKS
  const insets = useSafeAreaInsets()
  const navigation = useNavigation()
  // #endregion

  // #region ============== VARIABLES
  const isIos = Platform.OS === "ios"
  // #endregion

  // #region ============== EVENTS
  const onPressBackInner = () => {
    if (navigation?.canGoBack()) {
      navigation?.goBack()
    }
  }
  // #endregion

  // #region ============== VIEWS
  return (
    <Stack
      backgroundColor={"white"}
      paddingHorizontal={"$screenPadding"}
      paddingTop={(disableScreenPaddingTop ? 0 : insets?.top) + (isIos ? 0 : 8)}
      paddingBottom={"$sm"}
      borderBottomColor={"$line"}
      borderBottomWidth={0.5}
      {...containerProps}
    >
      <XStack
        paddingTop={"$xl"}
        paddingBottom={"$md"}
        gap={"$xl"}
        alignItems="center"
        {...innerContainerProps}
      >
        <XStack flex={1} gap={"$screenPadding"} alignItems="center">
          {left === false
            ? null
            : (left ?? (
                <TouchableOpacity onPress={onPressBack ?? onPressBackInner} hitSlop={18}>
                  <LeftIcon />
                </TouchableOpacity>
              ))}
          {typeof title === "string" ? (
            <Text fontWeight={"$600"} fontSize={"$lg"} {...titleProps}>
              {title}
            </Text>
          ) : (
            title
          )}
        </XStack>
        {right}
      </XStack>
      {extra && <Stack>{extra}</Stack>}
    </Stack>
  )
  // #endregion
}

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export const ScreenHeader = memo(ScreenHeaderView)
export default ScreenHeader

export * from "./props"
