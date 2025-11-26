import { StyleSheet, View, useColorScheme, Dimensions, ScrollView } from 'react-native'
import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons'
import { LineChart } from 'react-native-chart-kit'

import { Colors } from '../../constants/Colors'
import dashboard from '../../assets/data/mock.dashboard.json'

import ThemedView from '../../components/ThemedView'
import ThemedText from '../../components/ThemedText'
import ThemedCard from '../../components/ThemedCard'
import Spacer from '../../components/Spacer'

/* ---------------------------------------------
    1. XỬ LÝ DỮ LIỆU TỪ JSON
----------------------------------------------*/

// Commits
const allCommits = dashboard.artifacts.flatMap(a => a.commits)

const commitsByDate = {}
const linesChangedByDate = {}

allCommits.forEach(c => {
  const d = c.date.slice(0, 10)
  const lines = (c.additions || 0) + (c.deletions || 0)

  commitsByDate[d] = (commitsByDate[d] || 0) + 1
  linesChangedByDate[d] = (linesChangedByDate[d] || 0) + lines
})

// Labels
const labels = Object.keys(commitsByDate).map(date => date.slice(8, 10) + '/' + date.slice(5, 7))
const data = Object.values(commitsByDate)

// Last 7 days summary
const last7 = Object.entries(commitsByDate)
  .sort((a, b) => b[0].localeCompare(a[0]))
  .slice(0, 7)

const last7DaysCommits = last7.reduce((sum, [, count]) => sum + count, 0)

const last7Lines = Object.entries(linesChangedByDate)
  .sort((a, b) => b[0].localeCompare(a[0]))
  .slice(0, 7)
  .map(([, count]) => count)

const avgLinesPerDay = last7Lines.length
  ? Math.round(last7Lines.reduce((a, b) => a + b, 0) / last7Lines.length)
  : 0

// Test & Security summaries
// ...existing code...
// Test & Security summaries (safe defaults)
const testSummary = dashboard.testing ?? { passRate: 0 }
const securitySummary = dashboard.security ?? { totalVulns: 0 }

// Relationship summary (safe default)
const relations = dashboard.relations ?? {
  structural: 0,
  temporal: 0,
  interaction: 0,
  semantic: 0,
}

// Alerts (already guarded, normalize)
const alerts = dashboard.alerts ?? []

// Latest deployments (safe)
const latestDeployments = dashboard.deployments?.[dashboard.deployments.length - 1]?.deployments ?? 0
// ...existing code...
const artifactsCount = dashboard.artifacts?.length ?? 0
const safeLatestDeployments = dashboard.deployments?.[dashboard.deployments.length - 1]?.deployments ?? 0
const safePassRate = testSummary?.passRate ?? 0
const safeTotalVulns = securitySummary?.totalVulns ?? 0
const safeLast7DaysCommits = last7DaysCommits ?? 0
const safeAvgLinesPerDay = avgLinesPerDay ?? 0

const metrics = [
  {
    icon: <Ionicons name="git-branch-outline" size={36} color="#fff" />,
    label: 'Commits / Tuần',
    value: String(safeLast7DaysCommits),
  },
  {
    icon: <Feather name="clock" size={36} color="#fff" />,
    label: 'Dòng code / Ngày',
    value: String(safeAvgLinesPerDay),
  },
  {
    icon: <MaterialCommunityIcons name="layers-outline" size={36} color="#fff" />,
    label: 'Artifacts',
    value: String(artifactsCount),
  },
  {
    icon: <Feather name="cloud" size={36} color="#fff" />,
    label: 'Triển khai',
    value: String(safeLatestDeployments),
  },
  {
    icon: <Ionicons name="shield-checkmark-outline" size={36} color="#fff" />,
    label: 'Test Pass (%)',
    value: String(safePassRate) + '%',
  },
  {
    icon: <Ionicons name="warning-outline" size={36} color="#fff" />,
    label: 'Lỗ hổng (CVE)',
    value: String(safeTotalVulns),
  },
]


/* ---------------------------------------------
    3. COMPONENT HOME
----------------------------------------------*/

const screenWidth = Dimensions.get('window').width


// ...existing code...

const Home = () => {
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme] ?? Colors.light
  const bgColor = theme.background

  const chartData = {
    labels,
    datasets: [
      {
        data,
        color: () => '#7FB3FF',
        strokeWidth: 2,
      },
    ],
  }

  return (
    <ThemedView style={styles.container} safe>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        <View style={styles.headerRow}>
          <ThemedText style={styles.heading} title={true}>
            DevOps Dashboard
          </ThemedText>
          <Ionicons name="notifications-outline" size={26} />
        </View>

        {/* METRICS GRID */}
        <View style={styles.grid}>
          {metrics.map((item, idx) => (
            <ThemedCard key={idx} style={styles.card}>
              {item.icon}
              <ThemedText style={styles.cardLabel}>{item.label}</ThemedText>
              <ThemedText style={styles.cardValue}>{item.value}</ThemedText>
            </ThemedCard>
          ))}
        </View>

        {/* CHART */}
        <ThemedCard style={styles.chartCard}>
          <ThemedText style={styles.cardLabel}>Commit / Ngày</ThemedText>
          <LineChart
            data={chartData}
            width={screenWidth - 32}
            height={180}
            chartConfig={{
              backgroundColor: bgColor,
              backgroundGradientFrom: bgColor,
              backgroundGradientTo: bgColor,
              decimalPlaces: 0,
              color: () => '#7FB3FF',
              labelColor: () => '#B6C6E3',
              propsForDots: {
                r: '5',
                strokeWidth: '2',
                stroke: '#7FB3FF',
              },
            }}
            bezier
            style={{ borderRadius: 16 }}
          />
        </ThemedCard>

        {/* RELATIONSHIPS SUMMARY - Compact */}
        <ThemedCard style={styles.relationCard}>
          <ThemedText style={styles.cardLabel}>Quan hệ Artifacts</ThemedText>
          <View style={styles.relationGrid}>
            <View style={styles.relationItem}>
              <ThemedText style={styles.relationValue}>{relations.structural}</ThemedText>
              <ThemedText style={styles.relationLabel}>Structural</ThemedText>
            </View>
            <View style={styles.relationItem}>
              <ThemedText style={styles.relationValue}>{relations.temporal}</ThemedText>
              <ThemedText style={styles.relationLabel}>Temporal</ThemedText>
            </View>
            <View style={styles.relationItem}>
              <ThemedText style={styles.relationValue}>{relations.interaction}</ThemedText>
              <ThemedText style={styles.relationLabel}>Interaction</ThemedText>
            </View>
            <View style={styles.relationItem}>
              <ThemedText style={styles.relationValue}>{relations.semantic}</ThemedText>
              <ThemedText style={styles.relationLabel}>Semantic</ThemedText>
            </View>
          </View>
        </ThemedCard>

        {/* ALERTS */}
        <ThemedCard style={styles.alertCard}>
          <ThemedText style={styles.cardLabel}>Cảnh báo</ThemedText>
          {alerts.length === 0 ? (
            <ThemedText style={styles.alertItem}>Không có cảnh báo nào</ThemedText>
          ) : (
            alerts.slice(0, 3).map((a, i) => (
              <ThemedText key={i} style={styles.alertItem}>
                • {a}
              </ThemedText>
            ))
          )}
          {alerts.length > 3 && (
            <ThemedText style={styles.moreAlerts}>+{alerts.length - 3} cảnh báo khác</ThemedText>
          )}
        </ThemedCard>
      </ScrollView>
    </ThemedView>
  )
}

export default Home


/* UPDATED STYLES */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 32,
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  heading: {
    fontSize: 24,
    fontWeight: 'bold',
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
  },

  card: {
    width: '48%',
    padding: 16,
    borderRadius: 18,
    marginBottom: 12,
    alignItems: 'center',
  },

  cardLabel: {
    fontSize: 12,
    marginTop: 8,
    opacity: 0.8,
  },

  cardValue: {
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 4,
  },

  chartCard: {
    borderRadius: 18,
    padding: 16,
    marginVertical: 16,
    alignItems: 'center',
  },

  relationCard: {
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
  },

  relationGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 12,
  },

  relationItem: {
    width: '48%',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
  },

  relationValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  relationLabel: {
    fontSize: 11,
    marginTop: 4,
    opacity: 0.7,
  },

  alertCard: {
    borderRadius: 18,
    padding: 16,
    marginBottom: 32,
  },

  alertItem: {
    fontSize: 13,
    marginTop: 6,
  },

  moreAlerts: {
    fontSize: 12,
    marginTop: 8,
    fontWeight: '600',
    opacity: 0.7,
  },
})
