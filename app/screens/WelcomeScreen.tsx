import { FC } from "react"
import { Stack, Text } from "tamagui"

import { Screen } from "@/components/Screen"
import type { AppStackScreenProps } from "@/navigators/navigationTypes"

interface WelcomeScreenProps extends AppStackScreenProps<"Welcome"> {}

export const WelcomeScreen: FC<WelcomeScreenProps> = function WelcomeScreen(_props) {
  return (
    <Screen preset="fixed">
      <Stack>
        <Text color={"$black"}>Welcome</Text>
      </Stack>
    </Screen>
  )
}
