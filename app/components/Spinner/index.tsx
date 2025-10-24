import { memo } from "react"
// eslint-disable-next-line no-restricted-imports
import { getTokens, Spinner as TamaguiSpinner } from "tamagui"

import { SpinnerProps } from "./props"

/**
 * ===========================
 * MAIN
 * ===========================
 */
const SpinnerView: React.FC<SpinnerProps> = (props) => {
  // const {} = props;

  // =============== HOOKS

  // =============== APIs

  // =============== VARIABLES
  const tamaguiTokens = getTokens()

  // =============== EVENTS

  // =============== RENDERER

  // =============== VIEWS
  return <TamaguiSpinner color={tamaguiTokens.color.$primary500.val} {...props} />
}

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export const Spinner = memo(SpinnerView)
export default Spinner

export * from "./props"
