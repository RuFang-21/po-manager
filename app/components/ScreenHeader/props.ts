import { StackProps, XStackProps } from "tamagui"

import { TextProps } from "../Text"

export type ScreenHeaderProps = {
  containerProps?: StackProps
  innerContainerProps?: XStackProps
  children?: React.ReactNode
  left?: false | React.ReactElement
  title?: string | React.ReactElement
  right?: false | React.ReactElement
  extra?: React.ReactElement
  unsafe?: boolean
  titleProps?: TextProps
  onPressBack?: () => void
}
