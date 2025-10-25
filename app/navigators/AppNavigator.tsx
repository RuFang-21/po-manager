/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import { ComponentProps } from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack"

import Config from "../config"
import { AppStackParamList } from "./AppNavigator/props"
import BottomTabNavigator from "./BottomTabNavigators"
import { createAuthGroup, createOrderGroup } from "./Groups"
import { navigationRef, useBackButtonHandler } from "./navigationUtilities"
import { useAuth } from "../context/AuthContext"
import { ErrorBoundary } from "../screens/ErrorScreen/ErrorBoundary"

/**
 * This is a list of all the route names that will exit the app if the back button
 * is pressed while in that screen. Only affects Android.
 */
const exitRoutes = Config.exitRoutes

export type AppStackScreenProps<T extends keyof AppStackParamList> = NativeStackScreenProps<
  AppStackParamList,
  T
>

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<AppStackParamList>()

const AppStack = () => {
  const { isAuthenticated } = useAuth()

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        // User is signed in
        <>
          <Stack.Screen name="BottomTab" component={BottomTabNavigator} />
          {/* ============== Order Group */}
          {createOrderGroup({ Stack })}
        </>
      ) : (
        // User is NOT signed in
        <>
          {/* ============== Auth Group */}
          {createAuthGroup({ Stack })}
        </>
      )}
    </Stack.Navigator>
  )
}

export interface NavigationProps
  extends Partial<ComponentProps<typeof NavigationContainer<AppStackParamList>>> {}

export const AppNavigator = (props: NavigationProps) => {
  useBackButtonHandler((routeName) => exitRoutes.includes(routeName))

  return (
    <NavigationContainer ref={navigationRef} {...props}>
      <ErrorBoundary catchErrors={Config.catchErrors}>
        <AppStack />
      </ErrorBoundary>
    </NavigationContainer>
  )
}

export * from "./AppNavigator/props"
