import { FC, useState } from "react"
import { Image } from "react-native"
import { useForm, Controller } from "react-hook-form"
import { Stack, Text, YStack } from "tamagui"

import { Button } from "@/components/Button"
import { Screen } from "@/components/Screen"
import { TextInput } from "@/components/TextInput"
import { useAuth } from "@/context/AuthContext"

import SignInScreenProps, { SignInFormFieldValues } from "./props"

/**
 * ===========================
 * MAIN
 * ===========================
 */
export const SignInScreen: FC<SignInScreenProps> = ({ navigation: _navigation }) => {
  const [isLoading, setIsLoading] = useState(false)
  const { setAuthToken, setAuthEmail } = useAuth()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormFieldValues>({
    defaultValues: {
      email: "test@gmail.com",
      password: "123455",
    },
  })

  const onSubmit = async (data: SignInFormFieldValues) => {
    setIsLoading(true)
    try {
      // Simulate a brief loading time
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Set authentication - no matter what email/password is entered
      setAuthEmail(data.email)
      setAuthToken("mock-auth-token-12345")

      // Navigation will be handled automatically by the app when isAuthenticated becomes true
    } catch (error) {
      console.error("Sign in error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // =============== VIEWS
  return (
    <Screen preset="scroll" backgroundColor="$background">
      <Image
        source={require("@assets/images/login/login_background.jpg")}
        style={{
          width: "100%",
          height: 250,
        }}
        resizeMode="cover"
      />
      <YStack
        flex={1}
        paddingHorizontal="$lg"
        paddingTop="$lg"
        gap="$4"
        backgroundColor="white"
        borderTopLeftRadius="$6"
        borderTopRightRadius="$6"
        marginTop={-30}
      >
        {/* App Logo */}

        <Stack paddingTop={"$xl"}>
          <Text fontSize={"$3xl"} fontWeight="bold" color="$color" textAlign="center">
            Production Order Management
          </Text>
        </Stack>

        {/* Login Form */}
        <YStack gap="$4" paddingTop={"$4xl"}>
          <YStack gap="$2">
            <Text fontSize="$md" fontWeight="600" color="$color">
              Email
            </Text>
            <Controller
              control={control}
              name="email"
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Enter your email"
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  isControlled
                />
              )}
            />
            {errors.email && (
              <Text fontSize="$md" color="$red10">
                {errors.email.message}
              </Text>
            )}
          </YStack>

          <YStack gap="$2">
            <Text fontSize="$md" fontWeight="600" color="$color">
              Password
            </Text>
            <Controller
              control={control}
              name="password"
              rules={{
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Enter your password"
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                  secureTextEntry
                  isControlled
                />
              )}
            />
            {errors.password && (
              <Text fontSize="$2" color="$red10">
                {errors.password.message}
              </Text>
            )}
          </YStack>

          <Button
            onPress={handleSubmit(onSubmit)}
            variant="contained"
            title={isLoading ? "Signing In..." : "Sign In"}
            loading={isLoading}
            marginTop="$4"
          />
        </YStack>
      </YStack>
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
export default SignInScreen
