import { memo, useMemo } from "react"
import { XStack } from "tamagui"

import { ChipProps, ChipStatus } from "./props"
import { Text } from "../../components/Text"

/**
 * ===========================
 * HELPERS
 * ===========================
 */
const getStatusColors = (status: ChipStatus) => {
  switch (status) {
    case "pending":
      return {
        backgroundColor: "$orange2",
        borderColor: "$orange7",
        textColor: "$orange11",
      }
    case "in progress":
      return {
        backgroundColor: "$blue2",
        borderColor: "$blue7",
        textColor: "$blue11",
      }
    case "completed":
      return {
        backgroundColor: "$green2",
        borderColor: "$green7",
        textColor: "$green11",
      }
    default:
      return {
        backgroundColor: "$gray2",
        borderColor: "$gray7",
        textColor: "$gray11",
      }
  }
}

/**
 * ===========================
 * MAIN
 * ===========================
 */
const ChipView: React.FC<ChipProps> = ({ status, label, ...rest }) => {
  const colors = useMemo(() => getStatusColors(status), [status])

  return (
    <XStack
      alignItems="center"
      paddingHorizontal="$2"
      paddingVertical="$1"
      backgroundColor={colors.backgroundColor}
      borderColor={colors.borderColor}
      borderWidth={1}
      borderRadius="$6"
      gap="$1"
      {...rest}
    >
      <Text fontSize="$sm" color={colors.textColor} fontWeight="500" textTransform="capitalize">
        {label}
      </Text>
    </XStack>
  )
}

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export const Chip = memo(ChipView)
export default Chip

export * from "./props"
