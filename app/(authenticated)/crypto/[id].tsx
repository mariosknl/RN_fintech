import { Stack, useLocalSearchParams } from "expo-router"
import { SectionList, Text, View, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native"
import { useHeaderHeight } from '@react-navigation/elements'
import Colors from "@/constants/Colors"
import { defaultStyles } from "@/constants/Styles"
import { useQuery } from "@tanstack/react-query"
import { Ionicons } from "@expo/vector-icons"
import { useState } from "react"

const categories = ['Overview', 'News', 'Orders', 'Transactions']

const DetailsPage = () => {
  const { id } = useLocalSearchParams()
  const headerHeight = useHeaderHeight()
  const [activeIndex, setActiveIndex] = useState(0)

  const { data } = useQuery({
    queryKey: ['info', id],
    queryFn: async () => {
      const info = await fetch(`/api/info?ids=${id}`).then((res) => res.json())
      // const logo = info[+id]
      return info[+id]
    }
  })

  return (
    <>
      <Stack.Screen options={{ title: data?.name }} />
      <SectionList
        keyExtractor={(item) => item.title}
        style={{ marginTop: headerHeight }}
        contentInsetAdjustmentBehavior="automatic"
        sections={[{ data: [{ title: "Chart" }] }]}
        renderSectionHeader={() => (
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              paddingHorizontal: 16,
              paddingBottom: 8,
              backgroundColor: Colors.background,
              borderBottomColor: Colors.lightGray,
              borderBottomWidth: StyleSheet.hairlineWidth
            }}
          >
            {categories.map((item, index) => (
              <TouchableOpacity key={index} style={activeIndex === index ? styles.categoriesBtnActive : styles.categoriesBtn}
                onPress={() => setActiveIndex(index)}
              >
                <Text style={activeIndex === index ? styles.categoryTextActive : styles.categoryText}
                  onPress={() => setActiveIndex(index)}>{item}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
        ListHeaderComponent={() => (
          <>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginHorizontal: 16
              }}
            >
              <Text>{data?.symbol}</Text>
              <Image source={{ uri: data?.logo }} style={{ width: 60, height: 60 }} />
            </View>
            <View style={{ flexDirection: 'row', gap: 10, margin: 12 }}>
              <TouchableOpacity
                style={[
                  defaultStyles.pillButtonSmall,
                  { backgroundColor: Colors.primary, flexDirection: 'row', gap: 16 },
                ]}>
                <Ionicons name="add" size={24} color={'#fff'} />
                <Text style={[defaultStyles.buttonText, { color: '#fff' }]}>Buy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  defaultStyles.pillButtonSmall,
                  { backgroundColor: Colors.primaryMuted, flexDirection: 'row', gap: 16 },
                ]}>
                <Ionicons name="arrow-back" size={24} color={Colors.primary} />
                <Text style={[defaultStyles.buttonText, { color: Colors.primary }]}>Receive</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
        renderItem={({ item }) => (
          <>
            {/* CHART  */}
            <View style={{ height: 500, backgroundColor: 'green' }}>

            </View>
            <View style={[defaultStyles.block, { marginTop: 20 }]}>
              <Text style={styles.subtitle}>Overview</Text>
              <Text style={{ color: Colors.gray }}>
                Bitcoin is a decentralized digital currency, without a central bank or single administrator, that can be sent from user to user on the peer-to-peer bitcoin network without the need for intermediaries.
              </Text>
            </View>
          </>
        )}>

      </SectionList>
    </>
  )
}

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  categoryText: {
    fontSize: 14,
    color: Colors.gray,
  },
  categoryTextActive: {
    fontSize: 14,
    color: '#000',
  },
  categoriesBtn: {
    padding: 10,
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  categoriesBtnActive: {
    padding: 10,
    paddingHorizontal: 14,

    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
  },
})

export default DetailsPage
