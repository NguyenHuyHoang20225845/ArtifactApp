import { StyleSheet, View, useColorScheme } from 'react-native'
import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons'
import { LineChart } from 'react-native-chart-kit'
import { Dimensions } from 'react-native'
import { Colors } from '../../constants/Colors'
import dashboard from '../../assets/data/mock.dashboard.json'

import ThemedView from '../../components/ThemedView'
import ThemedText from '../../components/ThemedText'
import ThemedCard from '../../components/ThemedCard' 
import Spacer from '../../components/Spacer'

// Lấy commit từ mock.dashboard
const allCommits = dashboard.artifacts.flatMap(a => a.commits)

const commitsByDate = {}
allCommits.forEach(c => {
  const d = c.date.slice(0, 10)
  commitsByDate[d] = (commitsByDate[d] || 0) + 1
})

const labels = Object.keys(commitsByDate).map(date => date.slice(8, 10) + '/' + date.slice(5, 7))
const data = Object.values(commitsByDate)

const linesChangedByDate = {}
allCommits.forEach(c => {
  const d = c.date.slice(0, 10)
  const lines = (c.additions || 0) + (c.deletions || 0)
  linesChangedByDate[d] = (linesChangedByDate[d] || 0) + lines
})

const last7DaysCommits = Object.entries(commitsByDate)
  .sort((a, b) => b[0].localeCompare(a[0]))
  .slice(0, 7)
  .reduce((sum, [, count]) => sum + count, 0)

const last7DaysLinesChanged = Object.entries(linesChangedByDate)
  .sort((a, b) => b[0].localeCompare(a[0]))
  .slice(0, 7)
  .map(([, count]) => count)
const avgLinesPerDay = last7DaysLinesChanged.length
  ? Math.round(last7DaysLinesChanged.reduce((a, b) => a + b, 0) / last7DaysLinesChanged.length)
  : 0

const metrics = [
  {
    icon: <Ionicons name="git-branch-outline" size={36} color="#fff" />,
    label: "Commits / Tuần",
    value: last7DaysCommits.toString(),
  },
  {
    icon: <Feather name="clock" size={36} color="#fff" />,
    label: "Dòng code / Ngày",
    value: avgLinesPerDay.toLocaleString(),
  },
  {
    icon: <MaterialCommunityIcons name="layers-outline" size={36} color="#fff" />,
    label: "Artifacts",
    value: dashboard.artifacts.length.toString(),
  },
  {
    icon: <Feather name="cloud" size={36} color="#fff" />,
    label: "Triển khai",
    value: dashboard.deployments[dashboard.deployments.length - 1]?.deployments?.toString() || "0",
  },
]

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

const screenWidth = Dimensions.get('window').width

const Home = () => {
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme] ?? Colors.light
  const backgroundColor = theme.background

  return (
    <ThemedView style={styles.container} safe>
      <Spacer />
      <View style={styles.headerRow}>
        <ThemedText style={styles.heading} title={true}>DevOps Dashboard</ThemedText>
        <Ionicons name="notifications-outline" size={28}  />
      </View>

      <View style={styles.grid}>
        {metrics.map((item, idx) => (
          <ThemedCard key={idx} style={styles.card}>
            {item.icon}
            <ThemedText style={styles.cardLabel}>{item.label}</ThemedText>
            <ThemedText style={styles.cardValue}>{item.value}</ThemedText>
          </ThemedCard>
        ))}
      </View>

      {/* Biểu đồ */}
      <ThemedCard style={styles.chartCard}>
        <ThemedText style={styles.cardLabel}>Commit / Ngày</ThemedText>
        <LineChart
          data={chartData}
          width={screenWidth - 18}
          height={180}
          chartConfig={{
            backgroundColor: backgroundColor,
            backgroundGradientFrom: backgroundColor,
            backgroundGradientTo: backgroundColor,
            decimalPlaces: 0,
            color: () => "#7FB3FF",
            labelColor: () => "#B6C6E3",
            propsForDots: {
              r: "5",
              strokeWidth: "2",
              stroke: "#7FB3FF",
            },
          }}
          bezier
          style={{ borderRadius: 18 }}
        />
      </ThemedCard>
    </ThemedView>
  )
}

export default Home

// Giữ nguyên phần styles như cũ

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 36,
  },
  heading: {
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "center",
    marginBottom: 16,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontWeight: "bold",
    fontSize: 28,
    color: "#fff",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 18,
  },
  card: {
    width: "48%",
    borderRadius: 18,
    padding: 20,
    marginBottom: 18,
    alignItems: "center",
  },
  cardLabel: {
    fontSize: 15,
    marginTop: 10,
    marginBottom: 6,
    textAlign: "center",
  },
  cardValue: {
    fontWeight: "bold",
    fontSize: 28,
    textAlign: "center",
  },
  chartCard: {
  borderRadius: 18,
  padding: 16,
  marginBottom: 18,
  marginTop: 4,
  alignItems: "center",      // Thêm dòng này để căn giữa nội dung trong card
  alignSelf: "center",       // Thêm dòng này để căn giữa chính card
},
})