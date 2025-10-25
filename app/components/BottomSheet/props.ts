import { ReactElement } from "react"
import { BottomSheetModal, BottomSheetProps as BaseProps } from "@gorhom/bottom-sheet"
import { EasingFunction, EasingFunctionFactory, ReduceMotion } from "react-native-reanimated"

/**
 * ===========================
 * MAIN
 * ===========================
 */
interface TimingConfig {
  duration?: number
  easing?: EasingFunction | EasingFunctionFactory
  reduceMotion?: ReduceMotion
}

export type BottomSheetProps = BaseProps & {
  title?: ReactElement | string

  showHeader?: boolean

  extraHeader?: ReactElement

  customWrapper?: boolean
  defaultOpen?: boolean
  showHandler?: boolean
  timingConfig?: TimingConfig

  includeToast?: boolean

  /**
   * Control whether the bottom sheet is closable
   * by pressing hardware back button and backdrop component
   */
  closable?: boolean

  onOpenChange?: (state: boolean) => void

  /**
   * Called when modal closed by pressing
   * hardware back button and backdrop component
   * @returns
   */
  onModalClose?: () => void
}

export type BottomSheetRef = BottomSheetModal & {
  isOpen: boolean
}

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export default BottomSheetProps
