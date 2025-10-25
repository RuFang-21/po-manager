import { memo, useEffect, useRef, useState } from "react"
import { TouchableOpacity } from "react-native"
import dayjs from "dayjs"
import { getTokens, Stack } from "tamagui"

import CalendarIcon from "@assets/icons/calendar.svg"

import DateInputProps from "./props"
import BottomSheet, { BottomSheetRef } from "../BottomSheet"
import TextInput from "../TextInput"
import Calendar, { DateType } from "./Calendar"
import Spinner from "../Spinner"

/**
 * ===========================
 * MAIN
 * ===========================
 */
const DateInputView: React.FC<DateInputProps> = (props) => {
  const {
    value,
    onChange,
    onChangeCallback,
    format = "DATE_WEEK",
    loading = false,
    disabled = false,
    bottomSheetProps,
    calendarProps,
    textInputProps,
    renderCustomActivator,
    // render,
  } = props

  // =============== HOOKS

  const [selectedDate, setSelectedDate] = useState<DateType>(() => {
    if (value) {
      // Handle both string and Date types
      if (typeof value === "string") {
        const parsed = dayjs(value)
        return parsed.isValid() ? parsed.toDate() : new Date()
      }
      return value
    }
    return new Date()
  })

  const bottomSheetRef = useRef<BottomSheetRef>(null)

  useEffect(() => {
    if (value) {
      if (typeof value === "string") {
        const parsed = dayjs(value)
        if (parsed.isValid()) {
          setSelectedDate(parsed.toDate())
        }
      } else {
        setSelectedDate(value)
      }
    }
  }, [value])

  // =============== APIs

  // =============== VARIABLES
  const tamaguiTokens = getTokens()

  // =============== EVENTS
  const onChangeHandler = ({ date }: { date: DateType }) => {
    if (date) {
      setSelectedDate(date)
      // Convert to string format for form compatibility
      const dateString = dayjs(date).isValid() ? dayjs(date).format("YYYY-MM-DD") : ""
      onChange?.(dateString as any) // Cast for compatibility with both DateType and string
      onChangeCallback?.(date)
      bottomSheetRef.current?.dismiss()
    }
  }

  const onMonthChangeHandler = (month: number) => {
    if (typeof month === "number" && month >= 0 && month <= 11) {
      setSelectedDate((prev) => {
        const currentDate = prev || new Date()
        return dayjs(currentDate).month(month).toDate()
      })
    }
  }

  const onYearChangeHandler = (year: number) => {
    if (typeof year === "number" && year > 1900 && year < 3000) {
      setSelectedDate((prev) => {
        const currentDate = prev || new Date()
        return dayjs(currentDate).year(year).toDate()
      })
    }
  }

  // =============== RENDERER

  // =============== VIEWS
  return (
    <Stack>
      {/* Calendar Activator */}
      <TouchableOpacity
        onPress={() => {
          bottomSheetRef.current?.present()
        }}
        disabled={loading || disabled}
      >
        {renderCustomActivator ? (
          renderCustomActivator(selectedDate)
        ) : (
          <Stack pointerEvents="none">
            <TextInput
              value={
                selectedDate
                  ? dayjs(selectedDate).isValid()
                    ? dayjs(selectedDate).format(format === "DATE_WEEK" ? "YYYY-MM-DD" : format)
                    : ""
                  : ""
              }
              placeholder={loading ? "Loading..." : "Select a date"}
              postfix={
                loading ? (
                  <Spinner size="small" />
                ) : (
                  <CalendarIcon
                    height={24}
                    width={24}
                    color={tamaguiTokens?.color?.$primaryText?.val || "#000"}
                  />
                )
              }
              disabled={disabled}
              {...textInputProps}
            />
          </Stack>
        )}
      </TouchableOpacity>

      {/* Calendar Bottom Sheet */}
      <BottomSheet
        ref={bottomSheetRef}
        title={"Select a date"}
        enableDynamicSizing={false}
        snapPoints={[450]}
        {...bottomSheetProps}
      >
        <Stack paddingHorizontal={"$screenPadding"}>
          <Calendar
            mode="single"
            {...calendarProps}
            date={selectedDate || new Date()}
            onChange={onChangeHandler}
            onMonthChange={onMonthChangeHandler}
            onYearChange={onYearChangeHandler}
            showOutsideDays={false}
          />
        </Stack>
      </BottomSheet>
    </Stack>
  )
}

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export const DateInput = memo(DateInputView)
export default DateInput

export * from "./props"
