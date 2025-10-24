import { FC } from "react"
import { TouchableOpacity } from "react-native"
import Logout from "@assets/icons/logout.svg"

import { Screen, ScreenHeader } from "@/components"

import { DashboardScreenProps } from "./props"

/**
 * ===========================
 * MAIN
 * ===========================
 */
export const DashboardScreen: FC<DashboardScreenProps> = () => {
  // =============== VIEWS
  return (
    <Screen>
      <ScreenHeader
        unsafe
        left={false}
        title={"Dashboard"}
        titleProps={{
          fontSize: "$lg",
        }}
        right={
          <TouchableOpacity>
            <Logout width={24} height={24} />
          </TouchableOpacity>
        }
      />
    </Screen>
  )
}

/**
 * ===========================
 *
 * EXPORTS
 * ===========================
 */
export * from "./props"
export default DashboardScreen
