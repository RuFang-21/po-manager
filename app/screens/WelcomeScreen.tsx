import { FC } from "react"
import { Stack, Text } from "tamagui"

import { Button } from "../components"
import { Screen } from "../components/Screen"
import type { AppStackScreenProps } from "../navigators/AppNavigator"

interface WelcomeScreenProps extends AppStackScreenProps<"Welcome"> {}

export const WelcomeScreen: FC<WelcomeScreenProps> = function WelcomeScreen(_props) {
  return (
    <Screen preset="fixed">
      <Stack flex={1} justifyContent="center" alignItems="center" gap={12} paddingHorizontal="$4">
        <Text fontSize={24} fontWeight={700} textAlign="center">
          Production Order Management App
        </Text>
        <Button variant="contained" style={{ padding: 12, width: 200 }} onPress={() => {}}>
          Get Started
        </Button>
      </Stack>
    </Screen>
  )
}
