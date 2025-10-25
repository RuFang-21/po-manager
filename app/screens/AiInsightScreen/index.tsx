import { FC, useCallback, useEffect, useRef, useState } from "react"
import { FlatList, TouchableOpacity } from "react-native"
import { useFocusEffect } from "@react-navigation/native"
import LottieView from "lottie-react-native"
import { Stack, XStack } from "tamagui"

import { getProductionInsight } from "@/services/openAI/aiAssistant"

import { AiInsightResponse, AiInsightScreenProps, InsightItem } from "./props"
import { Chip, Screen, ScreenHeader, Text } from "../../components"
import { useOrders } from "../../hooks/useOrder"

/**
 * ===========================
 * MAIN
 * ===========================
 */
export const AiInsightScreen: FC<AiInsightScreenProps> = (props) => {
  const { navigation } = props
  const { orders, loading, error, searchOrders, loadOrders } = useOrders()
  const [searchQuery] = useState("")
  const [aiMessage, setAiMessage] = useState<AiInsightResponse | null>(null)
  const [aiLoading, setAiLoading] = useState(false)

  // refetch data when returning to dashboard
  useFocusEffect(
    useCallback(() => {
      if (searchQuery.trim() === "") {
        loadOrders()
      } else {
        searchOrders(searchQuery)
      }
    }, [loadOrders, searchOrders, searchQuery]),
  )

  // =============== EVENTS

  // ============== AI MODEL OUTPUT
  const hasCalledRef = useRef(false)

  const handleFetchInsight = useCallback(async () => {
    if (hasCalledRef.current) return // prevent rerendeer
    hasCalledRef.current = true

    if (orders.length === 0) {
      return
    }

    try {
      setAiLoading(true)
      const aiResponse = await getProductionInsight(orders)

      const parsedMessage: AiInsightResponse =
        typeof aiResponse === "string" ? JSON.parse(aiResponse) : aiResponse

      setAiMessage(parsedMessage)
    } catch (error) {
      console.error("Error fetching AI insight:", error)
    } finally {
      setAiLoading(false)
    }
  }, [orders])

  useEffect(() => {
    if (orders.length > 0) {
      handleFetchInsight()
    }
  }, [orders, handleFetchInsight])

  // =============== COMPONENTS

  const renderInsightCard = useCallback(
    ({ item }: { item: InsightItem }) => {
      return (
        <TouchableOpacity
          onPress={() => {
            navigation?.getParent()?.navigate("OrderDetail", { id: item?.id })
          }}
        >
          <Stack
            style={{ borderWidth: 1, borderColor: "#E0E0E0", borderRadius: 8 }}
            padding="$4"
            gap="$2"
            marginBottom="$4"
          >
            <XStack justifyContent="space-between" alignItems="center">
              <Text fontSize={"$lg"} fontWeight="bold">
                {item.finished_goods}
              </Text>
              <Chip status={item.status as any} label={item.status} size="small" />
            </XStack>
            <Text fontSize="$sm" color="$gray11" marginBottom="$2">
              Due: {item.due_date}
            </Text>
            <Text>{item.suggestion}</Text>
          </Stack>
        </TouchableOpacity>
      )
    },
    [navigation],
  )

  const renderListEmptyComponent = useCallback(
    () => (
      <XStack justifyContent="center" paddingVertical="$8">
        <Text>
          {searchQuery ? `No orders found for "${searchQuery}"` : "No production orders found"}
        </Text>
      </XStack>
    ),
    [searchQuery],
  )

  const renderListHeaderCompoent = () => {
    return (
      <Stack paddingBottom="$4">
        {aiMessage && (
          <Stack gap="$3">
            <Stack>
              <Text fontWeight="bold" marginBottom="$2">
                Summary:
              </Text>
              <Text>{aiMessage.summary}</Text>
            </Stack>

            {aiMessage.insights && aiMessage.insights.length > 0 && (
              <Stack gap="$2">
                <Text fontWeight="bold">Actions Requires:</Text>
              </Stack>
            )}
          </Stack>
        )}
      </Stack>
    )
  }

  if (aiLoading || loading) {
    return (
      <XStack justifyContent="center" alignItems="center" flex={1}>
        <Stack alignItems="center" gap="$4">
          <LottieView
            source={require("@assets/lottie/inventory.json")}
            autoPlay
            loop
            style={{ width: 200, height: 200 }}
          />
          <Text fontSize="$lg" fontWeight="bold">
            AI is analyzing your production data...
          </Text>
          <Text color="$gray11" textAlign="center">
            Please wait while we generate insights for your orders
          </Text>
        </Stack>
      </XStack>
    )
  }

  // =============== VIEWS
  return (
    <Screen>
      <ScreenHeader
        unsafe
        left={false}
        title={"AI Insight"}
        titleProps={{
          fontSize: "$lg",
          fontWeight: "bold",
        }}
      />

      {/* Listing of order section */}

      <Stack flex={1}>
        {error ? (
          <XStack justifyContent="center" paddingVertical="$8">
            <Text color="$red10">Error: {error}</Text>
          </XStack>
        ) : (
          <FlatList
            data={aiMessage?.insights || []}
            renderItem={renderInsightCard}
            keyExtractor={(item, index) => `insight-${index}`}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20, paddingHorizontal: 16, paddingTop: 16 }}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="none"
            removeClippedSubviews={false}
            ListEmptyComponent={renderListEmptyComponent}
            ListHeaderComponent={renderListHeaderCompoent}
          />
        )}
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
export default AiInsightScreen
