import { SvgProps } from "react-native-svg"

import { AppStackScreenProps } from "@/navigators/navigationTypes"

/**
 * ===========================
 * MAIN
 * ===========================
 */
export type SignInScreenProps = AppStackScreenProps<"SignIn">

export type SignInFormFieldValues = {
  email: string
  password: string
}

export type SocialLoginItemType = {
  key: string
  Icon: React.FC<SvgProps>
  onPress: () => void
}

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export default SignInScreenProps
