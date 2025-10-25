import { BottomTabScreenProps } from "../../navigators/BottomTabNavigators"

/**
 * ===========================
 * MAIN
 * ===========================
 */
export type NewOrderScreenProps = BottomTabScreenProps<"NewOrder">

export type NewOrderFormData = {
  finished_goods: string
  produced_quantity: number
  raw_materials: string
  due_date: Date | null
  storage_location: string
}

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export default NewOrderScreenProps
