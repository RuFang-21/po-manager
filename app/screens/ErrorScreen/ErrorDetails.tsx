import { ErrorInfo } from "react"
import { ScrollView } from "react-native"
import { Button } from "@tamagui/button"
import { YStack } from "@tamagui/stacks"
import { Paragraph, H3 } from "@tamagui/text"

import { Screen } from "../../components/Screen"

export interface ErrorDetailsProps {
  error: Error
  errorInfo: ErrorInfo | null
  onReset(): void
}

/**
 * Renders the error details screen.
 * @param {ErrorDetailsProps} props - The props for the `ErrorDetails` component.
 * @returns {JSX.Element} The rendered `ErrorDetails` component.
 */
export function ErrorDetails(props: ErrorDetailsProps) {
  return (
    <Screen preset="fixed" safeAreaEdges={["top", "bottom"]}>
      <YStack flex={1} alignItems="center" paddingHorizontal="$lg" paddingTop="$xl">
        <YStack flex={1} alignItems="center">
          <Paragraph fontSize={64}>🐞</Paragraph>
          <H3 color="$error" marginBottom="$md">
            Error Screen Title
          </H3>
          <Paragraph>Something went wrong</Paragraph>
        </YStack>

        <YStack
          flex={2}
          backgroundColor="$backgroundStrong"
          marginVertical="$md"
          borderRadius={6}
          width="100%"
        >
          <ScrollView>
            <YStack padding="$md">
              <Paragraph fontWeight="bold" color="$error">
                {`${props.error}`.trim()}
              </Paragraph>
              <Paragraph marginTop="$md" color="$colorPress" fontSize="$2">
                {`${props.errorInfo?.componentStack ?? ""}`.trim()}
              </Paragraph>
            </YStack>
          </ScrollView>
        </YStack>

        <Button
          backgroundColor="$error"
          paddingHorizontal="$xxl"
          onPress={props.onReset}
          marginBottom="$md"
        >
          <Paragraph color="white">Reset</Paragraph>
        </Button>
      </YStack>
    </Screen>
  )
}
