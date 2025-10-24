import { Image, ImageStyle, TouchableOpacity, View } from "react-native"

import { IconProps, IconTypes } from "./props"

const iconRegistry: Record<IconTypes, any> = {
  back: require("@assets/icons/back.png"),
  bell: require("@assets/icons/bell.png"),
  caretLeft: require("@assets/icons/caretLeft.png"),
  caretRight: require("@assets/icons/caretRight.png"),
  check: require("@assets/icons/check.png"),
  hidden: require("@assets/icons/hidden.png"),
  ladybug: require("@assets/icons/ladybug.png"),
  lock: require("@assets/icons/lock.png"),
  menu: require("@assets/icons/menu.png"),
  more: require("@assets/icons/more.png"),
  settings: require("@assets/icons/settings.png"),
  view: require("@assets/icons/view.png"),
  x: require("@assets/icons/x.png"),
}

/**
 * A component to render a registered icon.
 * It is wrapped in a <TouchableOpacity /> if `onPress` is provided, otherwise a <View />.
 */
export function Icon(props: IconProps) {
  const {
    icon,
    color,
    size,
    style: $imageStyleOverride,
    containerStyle: $containerStyleOverride,
    ...WrapperProps
  } = props

  const isPressable = !!WrapperProps.onPress
  const Wrapper = isPressable
    ? TouchableOpacity
    : ({ children, style }: any) => <View style={style}>{children}</View>

  const $imageStyle: ImageStyle = {
    resizeMode: "contain",
    tintColor: color,
    width: size,
    height: size,
    ...$imageStyleOverride,
  }

  return (
    <Wrapper
      accessibilityRole={isPressable ? "imagebutton" : undefined}
      {...WrapperProps}
      style={$containerStyleOverride}
    >
      <Image style={$imageStyle} source={iconRegistry[icon]} />
    </Wrapper>
  )
}
