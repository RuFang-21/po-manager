import { memo, useCallback, useRef, useState } from "react"
import { BottomSheetTextInput } from "@gorhom/bottom-sheet"
import { TextInput as GHTextInput } from "react-native-gesture-handler"
import { Input as TamaguiInput, Stack, XStack, getTokens } from "tamagui"

import TextNode from "../TextNode"
import { TextInputProps } from "./props"
import Text from "../Text"

/**
 * ===========================
 * MAIN
 * ===========================
 */
const TextInputView: React.FC<TextInputProps> = (props) => {
  const {
    value: controlledValue,
    onChange: controlledOnChange,
    onChangeCallback,
    isControlled = true,
    prefix,
    postfix,
    inputContainerProps,
    parentContainerProps,
    extra,
    placeholder = "Please enter",
    isMultiline = false,
    maxLength = 500,
    useBottomSheetInput,
    ...restProps
  } = props

  // =============== HOOKS
  const [uncontrolledValue, uncontrolledOnChange] = useState(controlledValue)

  const textInputRef = useRef<TamaguiInput>(null)
  const sheetTextInputRef = useRef<GHTextInput>(null)

  // =============== VARIABLES
  const tamaguiTokens = getTokens()
  const [value, onChange] = isControlled
    ? [controlledValue, controlledOnChange]
    : [uncontrolledValue, uncontrolledOnChange]

  // =============== EVENTS
  const onChangeText = useCallback(
    (text: string) => {
      onChange?.(text)
      onChangeCallback?.(text)
    },
    [onChange, onChangeCallback],
  )

  // =============== VIEWS
  return (
    <Stack gap={"$sm"} {...parentContainerProps}>
      <XStack
        onPress={() => {
          textInputRef.current?.focus()
        }}
        paddingHorizontal={"$xl"}
        alignItems="center"
        gap={"$sm"}
        borderRadius={"$common"}
        backgroundColor={restProps?.disabled ? "$disabled" : "$inputBg"}
        {...inputContainerProps}
      >
        {prefix && <TextNode>{prefix}</TextNode>}

        {useBottomSheetInput ? (
          <BottomSheetTextInput
            ref={sheetTextInputRef}
            value={value}
            scrollEnabled={isMultiline}
            placeholder={placeholder}
            placeholderTextColor={tamaguiTokens.color?.placeholderText?.val}
            maxLength={maxLength}
            {...(isMultiline
              ? {
                  multiline: true,
                  textContentType: "none",
                }
              : {})}
            onChangeText={onChangeText}
            // {...(restProps as any)}
            style={{
              flex: 1,
              backgroundColor: "transparent",
              paddingHorizontal: 0,
              borderWidth: 0,
              fontWeight: "400",
              fontSize: tamaguiTokens?.fontSize?.md?.val,
              fontFamily: "Poppins-Regular",
              // letterSpacing:'$1'
              ...(isMultiline
                ? {
                    minHeight: 120,
                    maxHeight: 250,
                    paddingVertical: tamaguiTokens?.space?.xl?.val,
                    verticalAlign: "top",
                  }
                : {
                    paddingVertical: tamaguiTokens?.space?.xl?.val,
                  }),
              ...(restProps?.style as any),
            }}
          />
        ) : (
          <TamaguiInput
            ref={textInputRef}
            flex={1}
            value={value}
            placeholderTextColor={"$placeholderText"}
            onChangeText={onChangeText}
            backgroundColor={"transparent"}
            paddingHorizontal={0}
            borderWidth={0}
            fontWeight={"$400"}
            fontSize={"$md"}
            letterSpacing={"$1"}
            scrollEnabled={isMultiline}
            placeholder={placeholder}
            {...(isMultiline
              ? {
                  multiline: true,
                  textContentType: "none",
                  minHeight: 120,
                  maxHeight: 250,
                  paddingVertical: "$xl",
                  verticalAlign: "top",
                }
              : {
                  paddingVertical: 0,
                })}
            maxLength={maxLength}
            {...restProps}
          />
        )}
        {postfix && <TextNode>{postfix}</TextNode>}
      </XStack>
      {extra
        ? extra
        : isMultiline && (
            <Text
              fontSize={"$sm"}
              color={"$secondaryText"}
            >{`${value?.length ?? 0}/${maxLength} characters`}</Text>
          )}
    </Stack>
  )
}

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export * from "./props"
export const TextInput = memo(TextInputView)
export default TextInput
