import { useState } from 'react'
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

import ThemedView from '../../components/ThemedView'
import ThemedText from '../../components/ThemedText'
import ThemedCard from '../../components/ThemedCard'
import dashboard from '../../assets/data/mock.dashboard.json'

const RelationDetails = () => {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('structural')

  const relations = dashboard.relations ?? {
    structural: 0,
    temporal: 0,
    interaction: 0,
    semantic: 0,
  }

  const relationTypes = [
    { key: 'structural', label: 'Structural', icon: 'git-branch-outline' },
    { key: 'temporal', label: 'Temporal', icon: 'time-outline' },
    { key: 'interaction', label: 'Interaction', icon: 'git-compare-outline' },
    { key: 'semantic', label: 'Semantic', icon: 'link-outline' },
  ]

  const getRelationDetails = (type) => {
    const mockDetails = {
      structural: ['Artifact A → Artifact B', 'Artifact C → Artifact D'],
      temporal: ['Artifact A after Artifact B', 'Artifact C concurrent Artifact D'],
      interaction: ['Artifact A calls Artifact B', 'Artifact C depends on Artifact D'],
      semantic: ['Artifact A related to Artifact B', 'Artifact C similar to Artifact D'],
    }
    return mockDetails[type] || []
  }

  const details = getRelationDetails(activeTab)

  return (
    <ThemedView style={styles.container} safe>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons 
            name="chevron-back" 
            size={28}
          />
        </TouchableOpacity>
        <ThemedText style={styles.title}>Chi tiết Quan hệ</ThemedText>
      </View>

      {/* TABS */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabScroll}>
        {relationTypes.map(type => (
          <TouchableOpacity
            key={type.key}
            onPress={() => setActiveTab(type.key)}
            style={[
              styles.tab,
              activeTab === type.key && styles.tabActive,
            ]}
          >
            <Ionicons name={type.icon} size={18} />
            <ThemedText style={styles.tabLabel}>{type.label}</ThemedText>
            <ThemedText style={styles.tabCount}>
              {relations[type.key]}
            </ThemedText>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* DETAILS LIST */}
      <ScrollView style={styles.detailsList} contentContainerStyle={{ paddingBottom: 32 }}>
        {details.length === 0 ? (
          <ThemedCard style={styles.emptyCard}>
            <ThemedText>Không có dữ liệu cho loại quan hệ này</ThemedText>
          </ThemedCard>
        ) : (
          details.map((item, idx) => (
            <ThemedCard key={idx} style={styles.detailCard}>
              <ThemedText style={styles.detailText}>{item}</ThemedText>
            </ThemedCard>
          ))
        )}
      </ScrollView>
    </ThemedView>
  )
}

export default RelationDetails

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 24,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    paddingTop: 16,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 12,
  },

  tabScroll: {
    marginBottom: 20,
    marginHorizontal: -18,
    paddingHorizontal: 18,
  },

  tab: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 10,
    alignItems: 'center',
    borderRadius: 12,
    opacity: 0.6,
  },

  tabActive: {
    opacity: 1,
    borderWidth: 2,
    borderColor: '#7FB3FF',
  },

  tabLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
  },

  tabCount: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 2,
  },

  detailsList: {
    flex: 1,
  },

  detailCard: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
  },

  detailText: {
    fontSize: 14,
    lineHeight: 20,
  },

  emptyCard: {
    padding: 32,
    alignItems: 'center',
    borderRadius: 12,
  },
})