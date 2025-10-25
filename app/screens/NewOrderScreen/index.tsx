import { FC, useState } from "react"
import { ScrollView } from "react-native"
import dayjs from "dayjs"
import { useForm, Controller } from "react-hook-form"
import Toast from "react-native-toast-message"
import { Stack, YStack } from "tamagui"

import { NewOrderFormData, NewOrderScreenProps } from "./props"
import { Button, Screen, ScreenHeader, Text, TextInput } from "../../components"
import DateInput from "../../components/DateInput"
import { databaseService } from "../../database/database"
import { ProductionOrder } from "../../database/schema"

/**
 * ===========================
 * MAIN
 * ===========================
 */
export const NewOrderScreen: FC<NewOrderScreenProps> = (props) => {
  const { navigation } = props
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<NewOrderFormData>({
    defaultValues: {
      finished_goods: "",
      produced_quantity: 0,
      raw_materials: "",
      due_date: null,
      storage_location: "",
    },
    mode: "onChange",
  })

  const onSubmit = async (data: NewOrderFormData) => {
    try {
      setIsSubmitting(true)

      const newOrder: Omit<ProductionOrder, "id"> = {
        ...data,
        due_date: data.due_date ? dayjs(data.due_date).format("YYYY-MM-DD") : "",
        status: "pending" as const,
      }

      await databaseService.createProductionOrder(newOrder)

      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Production order created successfully!",
        position: "top",
      })

      setTimeout(() => {
        reset()
        navigation?.navigate("Dashboard")
      }, 1500)
    } catch (error) {
      console.error("Error creating order:", error)
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to create production order. Please try again.",
        position: "top",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // =============== VIEWS
  return (
    <Screen>
      <ScreenHeader
        unsafe
        left={false}
        title="New Order"
        titleProps={{
          fontSize: "$lg",
          fontWeight: "bold",
        }}
      />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 16 }}
        keyboardShouldPersistTaps="handled"
      >
        <Stack gap="$4">
          {/* Finished Goods */}
          <Stack gap="$2">
            <Text fontWeight="bold">Finished Goods </Text>
            <Controller
              name="finished_goods"
              control={control}
              rules={{
                required: "Finished goods is required",
                minLength: {
                  value: 2,
                  message: "Finished goods must be at least 2 characters",
                },
              }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  placeholder="Enter finished goods name"
                  value={value}
                  onChange={onChange}
                />
              )}
            />
            {errors.finished_goods && (
              <Text color="$red10" fontSize="$sm">
                {errors.finished_goods.message}
              </Text>
            )}
          </Stack>

          {/* Produced Quantity */}
          <Stack gap="$2">
            <Text fontWeight="bold">Produced Quantity </Text>
            <Controller
              name="produced_quantity"
              control={control}
              rules={{
                required: "Quantity is required",
                min: {
                  value: 1,
                  message: "Quantity must be at least 1",
                },
              }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  placeholder="Enter quantity"
                  value={value.toString()}
                  onChange={(text: string) => {
                    const numValue = parseInt(text) || 0
                    onChange(numValue)
                  }}
                  keyboardType="numeric"
                />
              )}
            />
            {errors.produced_quantity && (
              <Text color="$red10" fontSize="$sm">
                {errors.produced_quantity.message}
              </Text>
            )}
          </Stack>

          {/* Raw Materials */}
          <Stack gap="$2">
            <Text fontWeight="bold">Raw Materials </Text>
            <Controller
              name="raw_materials"
              control={control}
              rules={{
                required: "Raw materials is required",
                minLength: {
                  value: 3,
                  message: "Raw materials must be at least 3 characters",
                },
              }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  placeholder="Enter raw materials (comma separated)"
                  value={value}
                  onChange={onChange}
                  isMultiline={true}
                />
              )}
            />
            {errors.raw_materials && (
              <Text color="$red10" fontSize="$sm">
                {errors.raw_materials.message}
              </Text>
            )}
          </Stack>

          {/* Due Date with DateInput Component */}
          <Stack gap="$2">
            <Text fontWeight="bold">Due Date </Text>
            <Controller
              name="due_date"
              control={control}
              rules={{
                required: "Due date is required",
              }}
              render={({ field: { onChange, value } }) => (
                <DateInput onChange={onChange} value={value} />
              )}
            />
            {errors.due_date && (
              <Text color="$red10" fontSize="$sm">
                {errors.due_date.message}
              </Text>
            )}
          </Stack>

          {/* Storage Location */}
          <Stack gap="$2">
            <Text fontWeight="bold">Storage Location </Text>
            <Controller
              name="storage_location"
              control={control}
              rules={{
                required: "Storage location is required",
                minLength: {
                  value: 2,
                  message: "Storage location must be at least 2 characters",
                },
              }}
              render={({ field: { onChange, value } }) => (
                <TextInput placeholder="Enter storage location" value={value} onChange={onChange} />
              )}
            />
            {errors.storage_location && (
              <Text color="$red10" fontSize="$sm">
                {errors.storage_location.message}
              </Text>
            )}
          </Stack>

          {/* Submit Button */}
          <YStack gap="$3" marginTop="$4" width="100%">
            <Button width="100%" variant="outlined" onPress={() => reset()} disabled={isSubmitting}>
              Reset Form
            </Button>
            <Button
              width="100%"
              onPress={handleSubmit(onSubmit)}
              disabled={!isValid || isSubmitting}
              opacity={!isValid || isSubmitting ? 0.5 : 1}
            >
              {isSubmitting ? "Creating..." : "Create Order"}
            </Button>
          </YStack>
        </Stack>
      </ScrollView>
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
export default NewOrderScreen
