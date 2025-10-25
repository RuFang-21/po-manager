import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef } from "react"
import { BackHandler, Keyboard, StyleSheet, TouchableOpacity } from "react-native"
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView as GorhomBottomSheetView,
  useBottomSheetTimingConfigs,
} from "@gorhom/bottom-sheet"
import { X } from "@tamagui/lucide-icons"
import { Easing, SharedValue } from "react-native-reanimated"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import Toast from "react-native-toast-message"
import { getTokens, Stack, XStack } from "tamagui"

import { BottomSheetProps, BottomSheetRef } from "./props"
import TextNode from "../TextNode"

/**
 * ===========================
 * MAIN
 * ===========================
 */
const BottomSheetView = (props: BottomSheetProps, ref: React.ForwardedRef<BottomSheetRef>) => {
  const {
    showHeader = true,
    extraHeader,
    title,
    customWrapper = false,
    snapPoints,
    children,
    showHandler = false,
    timingConfig,
    closable = true,
    includeToast = true,
    onChange,
    onOpenChange,
    onModalClose,
    ...bottomSheetProps
  } = props

  // =============== HOOKS
  const localRef = useRef<BottomSheetRef>(null)
  const isOpen = useRef<boolean>(false)

  const animationConfigs = useBottomSheetTimingConfigs({
    duration: 450,
    easing: Easing.elastic(0),
    ...timingConfig,
  })

  useImperativeHandle(ref, () => ({
    ...(localRef.current as BottomSheetRef),
    isOpen: isOpen.current,
  }))

  const sheetSnapPoints: (string | number)[] | SharedValue<(string | number)[]> | undefined =
    useMemo(() => snapPoints, [snapPoints])

  useEffect(() => {
    const backAction = () => {
      if (isOpen.current && closable) {
        localRef.current?.dismiss()
        onModalClose?.()
        return true
      }
      return false
    }

    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction)

    return () => backHandler.remove()
  }, [closable, onModalClose])

  // =============== VARIABLES
  const { space: spaceTokens } = getTokens()
  const insets = useSafeAreaInsets()

  // =============== EVENTS
  const onChangeHandler: BottomSheetProps["onChange"] = (index, position, type) => {
    const open = index !== -1 // -1 means it's fully closed
    isOpen.current = open
    if (open) {
      Keyboard.dismiss()
    }
    onOpenChange?.(open)
    onChange?.(index, position, type)
  }

  // =============== RENDERER
  const _renderHandler = () => {
    if (!showHandler) return null
    return (
      <Stack
        alignSelf="center"
        width="25%"
        height={4}
        marginTop={"$lg"}
        marginBottom={"$lg"}
        borderRadius={"$full"}
        backgroundColor={showHandler ? "#E9ECF3" : "transparent"}
      />
    )
  }

  const renderHeader = useCallback(() => {
    if (!showHeader) return null
    return (
      <Stack>
        <XStack
          padding={"$xl"}
          gap={"$xl"}
          borderBottomWidth={1}
          borderColor={"$line"}
          alignItems="center"
        >
          <TextNode flex={1} fontWeight={"$600"} fontSize={"$lg"}>
            {title}
          </TextNode>

          <TouchableOpacity
            onPress={() => {
              localRef.current?.dismiss()
              onModalClose?.()
            }}
          >
            <X />
          </TouchableOpacity>
        </XStack>
        {extraHeader}
      </Stack>
    )
  }, [extraHeader, onModalClose, showHeader, title])

  // =============== VIEWS
  return (
    <BottomSheetModal
      ref={localRef}
      snapPoints={sheetSnapPoints}
      animationConfigs={animationConfigs}
      enablePanDownToClose
      onChange={onChangeHandler}
      handleComponent={renderHeader}
      backdropComponent={(backdropProps) => (
        <BottomSheetBackdrop
          {...backdropProps}
          pressBehavior={closable ? undefined : "none"}
          enableTouchThrough={true}
          appearsOnIndex={0}
          opacity={1}
          disappearsOnIndex={-1}
          style={[{ backgroundColor: "rgba(0, 0, 0, 0.5)" }, StyleSheet.absoluteFillObject]}
          onPress={onModalClose}
        >
          {includeToast && (
            <Stack>
              <Toast topOffset={insets?.top} />
            </Stack>
          )}
        </BottomSheetBackdrop>
      )}
      {...bottomSheetProps}
    >
      {customWrapper ? (
        children
      ) : (
        <GorhomBottomSheetView>
          <Stack paddingBottom={insets.bottom + spaceTokens.$sm.val}>{children}</Stack>
        </GorhomBottomSheetView>
      )}
    </BottomSheetModal>
  )
}

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export const BottomSheet = forwardRef<BottomSheetRef, BottomSheetProps>(BottomSheetView)
export * from "./props"
export default BottomSheet
