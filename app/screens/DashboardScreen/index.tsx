import { FC, useCallback, useMemo, useState } from "react"
import { FlatList, TouchableOpacity } from "react-native"
import { useFocusEffect } from "@react-navigation/native"
import { debounce } from "lodash"
import { Spinner, Stack, XStack } from "tamagui"

import Logout from "@assets/icons/logout.svg"
import SearchIcon from "@assets/icons/search.svg"

import { DashboardScreenProps } from "./props"
import { Chip, Screen, ScreenHeader, Text, TextInput } from "../../components"
import { useAuth } from "../../context/AuthContext"
import { ProductionOrder } from "../../database/schema"
import { useOrders } from "../../hooks/useOrder"

/**
 * ===========================
 * MAIN
 * ===========================
 */
export const DashboardScreen: FC<DashboardScreenProps> = (props) => {
  const { navigation } = props
  const { orders, loading, error, searchOrders, loadOrders } = useOrders()
  const { logout } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")

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
  const debouncedSearch = useMemo(
    () =>
      debounce(
        (text: string) => {
          if (text.trim() === "") {
            loadOrders()
          } else {
            searchOrders(text)
          }
        },
        300,
        { trailing: true },
      ),
    [searchOrders, loadOrders],
  )

  const handleSearch = useCallback(
    (query: string) => {
      setSearchQuery(query)
      debouncedSearch(query)
    },
    [debouncedSearch],
  )

  // =============== COMPONENTS

  const renderDetailList = ({ title, data }: { title: string; data: string | number }) => {
    return (
      <XStack justifyContent="space-between" flex={1} paddingVertical="$2" alignItems="flex-start">
        <Text flex={0.4}>{title}</Text>
        <Text fontWeight="bold" flex={0.6} textAlign="right" numberOfLines={2} flexWrap="wrap">
          {data}
        </Text>
      </XStack>
    )
  }

  const renderOrderCard = useCallback(
    ({ item }: { item: ProductionOrder }) => {
      const detailData = [
        {
          title: "Quantity:",
          data: item.produced_quantity,
        },
        {
          title: "Raw Materials:",
          data: item.raw_materials,
        },
        {
          title: "Due Date:",
          data: item.due_date,
        },
        {
          title: "Storage Location:",
          data: item.storage_location,
        },
      ]

      return (
        <TouchableOpacity
          onPress={() => {
            navigation?.getParent()?.navigate("OrderDetail", { id: item.id.toString() })
          }}
        >
          <Stack
            style={{ borderWidth: 1, borderColor: "#CACACA", borderRadius: 8 }}
            padding="$4"
            gap="$2"
            marginBottom="$4"
          >
            <XStack justifyContent="space-between" alignItems="center">
              <Text fontSize={"$lg"} fontWeight="bold">
                {`#${item.id} ${item.finished_goods}`}
              </Text>
              <Chip status={item.status} label={item.status} size="small" />
            </XStack>
            {detailData.map((detail, index) => (
              <XStack key={index}>{renderDetailList(detail)}</XStack>
            ))}
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

  // =============== VIEWS
  return (
    <Screen>
      <ScreenHeader
        unsafe
        left={false}
        title={"Dashboard"}
        titleProps={{
          fontSize: "$lg",
          fontWeight: "bold",
        }}
        right={
          <TouchableOpacity onPress={logout}>
            <Logout width={24} height={24} />
          </TouchableOpacity>
        }
      />

      {/* Search input sections */}
      <Stack paddingHorizontal="$4" paddingVertical="$2">
        <TextInput
          placeholder="Search by product name or status..."
          value={searchQuery}
          onChangeCallback={handleSearch}
          isControlled={false}
          prefix={<SearchIcon />}
        />
      </Stack>

      {/* Listing of order section */}

      <Stack flex={1}>
        {loading ? (
          <XStack justifyContent="center" paddingVertical="$8">
            <Spinner />
          </XStack>
        ) : error ? (
          <XStack justifyContent="center" paddingVertical="$8">
            <Text color="$red10">Error: {error}</Text>
          </XStack>
        ) : (
          <FlatList
            data={orders}
            renderItem={renderOrderCard}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20, paddingHorizontal: 16, paddingTop: 16 }}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="none"
            removeClippedSubviews={false}
            ListEmptyComponent={renderListEmptyComponent}
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
export default DashboardScreen
