export type IconTypes =
  | "back"
  | "bell"
  | "caretLeft"
  | "caretRight"
  | "check"
  | "hidden"
  | "ladybug"
  | "lock"
  | "menu"
  | "more"
  | "settings"
  | "view"
  | "x"

export interface IconProps {
  /**
   * The name of the icon
   */
  icon: IconTypes
  /**
   * An optional tint color for the icon
   */
  color?: string
  /**
   * An optional size for the icon. If not provided, the icon will be sized to the icon's resolution.
   */
  size?: number
  /**
   * Style overrides for the icon image
   */
  style?: any
  /**
   * Style overrides for the icon container
   */
  containerStyle?: any
  /**
   * An optional function to be called when the icon is pressed
   */
  onPress?: () => void
}
