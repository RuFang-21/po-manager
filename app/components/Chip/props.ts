import { GetProps } from "tamagui"
import { XStack } from "tamagui"

export type ChipStatus = "pending" | "in progress" | "completed"

export interface ChipProps extends GetProps<typeof XStack> {
  /**
   * The status of the chip which determines the color and appearance
   */
  status: ChipStatus

  /**
   * The text label to display in the chip
   */
  label: string

  /**
   * Custom size for the chip
   * @default "medium"
   */
  size?: "small" | "medium" | "large"
}
