import { ReactElement } from "react"
import { DateType } from "react-native-ui-datepicker"

import { TextInputProps } from "../TextInput"
import { CalendarProps } from "./Calendar"
import { BottomSheetProps } from "../BottomSheet"

/**
 * ===========================
 * MAIN
 * ===========================
 */
export type CustomRenderProps = {
  disabled?: boolean
  value?: DateType
  label?: string
  onOpen: () => void
  onReset: () => void
}

export type DateInputProps = {
  value?: DateType
  onChange?: (value?: DateType) => void
  onChangeCallback?: (value?: DateType) => void
  loading?: boolean
  format?: string
  disabled?: boolean

  bottomSheetProps?: Omit<BottomSheetProps, "children" | "enableDynamicSizing" | "snapPoints">
  calendarProps?: Omit<CalendarProps, "mode">
  textInputProps?: Omit<TextInputProps, "value" | "onChange">

  renderCustomActivator?: (selectedDate: DateType) => ReactElement
  // render?: (props: CustomRenderProps) => ReactNode;
}

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export default DateInputProps
