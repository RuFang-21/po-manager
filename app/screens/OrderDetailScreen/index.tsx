import { FC } from "react"
import { Stack, XStack, Spinner } from "tamagui"

import { OrderDetailScreenProps } from "./props"
import { Button, Chip, Screen, ScreenFooter, ScreenHeader } from "../../components"
import { Text } from "../../components/Text"
import { useOrderById } from "../../hooks/useOrder"

/**
 * ===========================
 * MAIN`
 * ===========================
 */
export const OrderDetailScreen: FC<OrderDetailScreenProps> = (props) => {
  const { id } = props.route.params
  const { order, loading, updateStatus } = useOrderById(id)

  const orderGood = order ? order.finished_goods : "Order Details"

  const detailData = [
    {
      title: "Finished Goods:",
      data: order?.finished_goods,
    },
    {
      title: "Quantity:",
      data: order?.produced_quantity,
    },
    {
      title: "Raw Materials:",
      data: order?.raw_materials,
    },
    {
      title: "Due Date:",
      data: order?.due_date,
    },
    {
      title: "Storage Location:",
      data: order?.storage_location,
    },
    {
      title: "Status:",
      data: order?.status ? (
        <Chip status={order.status} label={order.status} size="small" />
      ) : (
        "N/A"
      ),
    },
  ]

  const getNextStatus = (currentStatus: string) => {
    switch (currentStatus) {
      case "pending":
        return "in progress"
      case "in progress":
        return "completed"
      default:
        return currentStatus
    }
  }

  const getButtonTitle = (currentStatus: string) => {
    switch (currentStatus) {
      case "pending":
        return "Start Progress"
      case "in progress":
        return "Mark Complete"
      case "completed":
        return "Completed"
      default:
        return "Update Status"
    }
  }

  const handleStatusUpdate = async () => {
    if (!order || order.status === "completed") return

    const nextStatus = getNextStatus(order.status) as "pending" | "in progress" | "completed"
    await updateStatus(nextStatus)
  }

  const renderDetailList = ({
    title,
    data,
  }: {
    title: string
    data: string | number | React.ReactNode
  }) => {
    return (
      <XStack
        key={title}
        justifyContent="space-between"
        paddingVertical="$2"
        alignItems="flex-start"
      >
        <Text flex={0.4}>{title}</Text>
        {typeof data === "string" || typeof data === "number" ? (
          <Text fontWeight="bold" flex={0.6} textAlign="right" numberOfLines={2} flexWrap="wrap">
            {data || "N/A"}
          </Text>
        ) : (
          data
        )}
      </XStack>
    )
  }

  if (loading) {
    return (
      <Stack flex={1} justifyContent="center" alignItems="center" gap="$4">
        <Spinner size="large" />
        <Text fontSize="$md" color="$gray11">
          Searching for order #{id}...
        </Text>
      </Stack>
    )
  }

  if (!order) {
    return (
      <Screen>
        <ScreenHeader
          unsafe
          title="Order Not Found"
          titleProps={{
            fontSize: "$lg",
            fontWeight: "bold",
          }}
        />
        <Stack flex={1} justifyContent="center" alignItems="center" gap="$4" padding="$4">
          <Text fontSize="$lg" color="$orange10" textAlign="center">
            Order #{id} not found
          </Text>
          <Text fontSize="$md" color="$gray11" textAlign="center">
            The order you&apos;re looking for doesn&apos;t exist or may have been deleted.
          </Text>
        </Stack>
      </Screen>
    )
  }

  return (
    <Screen
      StickyFooter={
        <ScreenFooter>
          <Button
            title={order ? getButtonTitle(order.status) : "Status"}
            onPress={handleStatusUpdate}
            disabled={order?.status === "completed"}
          />
        </ScreenFooter>
      }
    >
      <ScreenHeader
        unsafe
        title={orderGood}
        titleProps={{
          fontSize: "$lg",
          fontWeight: "bold",
        }}
      />
      <Stack flex={1} padding="$4">
        {detailData.map((item) => renderDetailList(item))}
      </Stack>
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
export default OrderDetailScreen
