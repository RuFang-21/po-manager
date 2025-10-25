import { SvgProps } from "react-native-svg"

import { AppStackScreenProps } from "../../navigators/AppNavigator/index"

/**
 * ===========================
 * MAIN
 * ===========================
 */
export type SignInScreenProps = AppStackScreenProps<"Signin">

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
