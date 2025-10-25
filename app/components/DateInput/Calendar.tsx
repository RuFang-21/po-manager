import { memo } from "react"
import { TextStyle, ViewStyle } from "react-native"
import DateTimePicker, {
  CalendarComponents,
  CalendarDay,
  DateType,
} from "react-native-ui-datepicker"
import { getTokens, Stack } from "tamagui"

import ChevronLeft from "@assets/icons/chevron_left.svg"
import ChevronRight from "@assets/icons/chevron_right.svg"

import { fontTokens } from "../../theme/font"
import Text from "../Text"

export type CalendarProps = React.ComponentProps<typeof DateTimePicker>

/**
 * ===========================
 * MAIN
 * ===========================
 */
const CalendarView = ({ components, ...props }: CalendarProps) => {
  // =================== VARIABLES
  const tamaguiTokens = getTokens()
  const fontSizeToken = tamaguiTokens?.fontSize || {}
  const colorTokens = tamaguiTokens?.color || {}
  const spaceTokens = tamaguiTokens?.space || {}

  const icons: Partial<CalendarComponents> = {
    IconPrev: <ChevronLeft />,
    IconNext: <ChevronRight />,
  }

  const disabledStyles = {
    color: "rgba(141, 141, 141, 0.3)",
    fontFamily: fontTokens?.face?.[400]?.normal || "System",
  }

  const labelStyle: ViewStyle | TextStyle = {
    color: colorTokens?.$secondaryText?.val || "#333",
    textAlign: "center" as const,
    textAlignVertical: "center" as const,
    fontFamily: fontTokens?.face?.[400]?.normal || "System",
    fontSize: fontSizeToken?.$md?.val || 16,
  }

  const containerStyle: ViewStyle | TextStyle = {
    backgroundColor: colorTokens?.$primary500?.val || "#007AFF",
    borderRadius: tamaguiTokens?.radius?.$full?.val || 20,
  }

  // =================== VIEWS
  return (
    <DateTimePicker
      showOutsideDays={true}
      styles={{
        // ========== DAY
        selected: {
          backgroundColor: colorTokens?.$primary500?.val || "#007AFF",
          borderRadius: tamaguiTokens?.radius?.$full?.val || 20,
          aspectRatio: 1,
          height: "100%",
          alignSelf: "center",
        },
        selected_label: {
          color: "#FFF",
          fontWeight: "600",
          fontFamily: fontTokens?.face?.[600]?.normal || "System",
        },
        day_label: labelStyle,
        outside_label: {
          ...disabledStyles,
          opacity: 1,
          color: "rgba(141, 141, 141, 0.5)",
        },
        disabled_label: { ...disabledStyles },
        // ========== MONTH
        month: {
          minHeight: 40,
        },
        selected_month: containerStyle,
        month_label: labelStyle,
        selected_month_label: {
          color: "#FFF",
          fontFamily: fontTokens?.face?.[600]?.normal || "System",
          fontWeight: "600",
        },
        // ========== TODAY
        today: {},
        today_label: {
          fontFamily: fontTokens?.face?.[600]?.normal || "System",
          color: colorTokens?.$primary500?.val || "#007AFF",
          fontWeight: "600",
        },
        // ========== YEAR
        year_label: labelStyle,
        year: {
          minHeight: 40,
        },
        selected_year: {},
        selected_year_label: {},
        active_year: containerStyle,
        active_year_label: {
          color: "#FFF",
          fontFamily: fontTokens?.face?.[600]?.normal || "System",
          fontWeight: "600",
        },
        // ========== RANGE
        range_fill: {
          // backgroundColor: colorTokens?.$primary50?.val,
        },
        range_start: {},
        range_end: {},
        range_end_label: {},
        range_start_label: {
          borderRadius: tamaguiTokens?.radius?.$full?.val || 20,
        },
        range_middle_label: {
          ...labelStyle,
          // backgroundColor: colorTokens?.$primary50?.val,
          color: colorTokens?.$primaryText?.val || "#000",
          fontFamily: fontTokens?.face?.[500]?.normal || "System",
          fontWeight: "500",
        },
        // ========== WEEKDAY
        weekday: {},
        weekdays: {
          backgroundColor: colorTokens?.$greyBg?.val || "#F5F5F5",
          height: 40,
        },
        weekday_label: {
          // color: colorTokens?.$secondary700?.val,
          fontSize: fontSizeToken?.$md?.val || 16,
          fontFamily: fontTokens?.face?.[600]?.normal || "System",
          fontWeight: "600",
        },
        // ========== SELECTOR LABEL
        month_selector_label: {
          fontSize: fontSizeToken?.$md?.val || 16,
          fontFamily: fontTokens?.face?.[600]?.normal || "System",
          fontWeight: "600",
        },
        year_selector_label: {
          fontSize: fontSizeToken?.$md?.val || 16,
          fontFamily: fontTokens?.face?.[600]?.normal || "System",
          fontWeight: "600",
        },
        header: {
          paddingVertical: spaceTokens?.$sm?.val || 8,
        },
      }}
      timePicker={false}
      monthCaptionFormat="short"
      navigationPosition="right"
      components={{
        ...icons,
        ...components,

        Weekday: (weekday) => {
          return (
            <Stack flex={1} justifyContent="center">
              <Text fontWeight={"$600"}>{weekday.name.min.charAt(0)}</Text>
            </Stack>
          )
        },
      }}
      {...props}
    />
  )
}

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export const Calendar = memo(CalendarView)
export { DateType, CalendarDay }

export default Calendar
