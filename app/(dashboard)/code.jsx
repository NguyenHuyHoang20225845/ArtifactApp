import { StyleSheet, View, useColorScheme } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { BarChart } from 'react-native-chart-kit'
import { Dimensions } from 'react-native'
import { Colors } from '../../constants/Colors'
import dashboard from '../../assets/data/mock.dashboard.json'




import Spacer from "../../components/Spacer"
import ThemedText from "../../components/ThemedText"
import ThemedView from "../../components/ThemedView"
import ThemedCard from "../../components/ThemedCard"

const complexityLabels = dashboard.artifacts.map(a => a.name)
const complexityData = dashboard.artifacts.map(a => a.complexity)
const allCommits = dashboard.artifacts.flatMap(a => a.commits)
const totalCommits = allCommits.length
const totalLinesChanged = allCommits.reduce(
  (sum, c) => sum + (c.additions || 0) + (c.deletions || 0),
  0
)

const vulnerableModules = [
  ...new Set(dashboard.artifacts.flatMap(a => a.vulnerableModules))
]


const screenWidth = Dimensions.get('window').width

const Code = () => {

  const colorScheme = useColorScheme()
    const theme = Colors[colorScheme] ?? Colors.light
    const backgroundColor = theme.background

  return (
    <ThemedView style={styles.container} safe>
      <Spacer />
      <ThemedText title={true} style={styles.heading}>
        Code Metrics
      </ThemedText>

<View style={styles.row}>
  <ThemedCard style={[styles.card, { flex: 1, marginRight: 7 }]}>
  <ThemedText style={styles.label}>Dòng code thay đổi</ThemedText>
  <ThemedText style={styles.value}>{totalLinesChanged.toLocaleString()}</ThemedText>
</ThemedCard>
<ThemedCard style={[styles.card, { flex: 1, marginLeft: 7 }]}>
  <ThemedText style={styles.label}>Số commit</ThemedText>
  <ThemedText style={styles.value}>{totalCommits.toLocaleString()}</ThemedText>
</ThemedCard>
</View>

 <ThemedCard style={styles.chartCard}>
  <ThemedText style={styles.cardLabel}>Độ phức tạp</ThemedText>
  <ThemedText style={styles.subLabel}>Cyclomatic Complexity</ThemedText>
  <BarChart
    data={{
      labels: complexityLabels,
      datasets: [{ data: complexityData }]
    }}
    width={screenWidth - 54}
    height={170} 
    fromZero
    chartConfig={{
      backgroundColor: backgroundColor,
      backgroundGradientFrom: backgroundColor,
      backgroundGradientTo: backgroundColor,
      decimalPlaces: 0,
      color: () => "#7FB3FF",
      labelColor: () => "#B6C6E3",
      style: { borderRadius: 12 }
    }}
    style={{ borderRadius: 18, marginTop: 8, paddingBottom: 24 }} // thêm paddingBottom
    withInnerLines={false}
    withHorizontalLabels={true}
    showBarTops={false}
  />
</ThemedCard>

      <ThemedCard style={styles.card}>
        <ThemedText style={styles.label}>Module dễ bị tấn công</ThemedText>
        {vulnerableModules.map((m, idx) => (
          <View
            key={m}
            style={[
              styles.moduleRow,
              idx === vulnerableModules.length - 1 && { borderBottomWidth: 0 },
            ]}
          >
            <Ionicons name="warning" size={18} color="#EF4444" style={{ marginRight: 8 }} />
            <ThemedText style={[ styles.label, {fontSize: 15, fontWeight: "normal"}]}>{m}</ThemedText>
          </View>
        ))}
      </ThemedCard>
    </ThemedView>
  )
}

export default Code

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "center",
    marginBottom: 16,
  },
  card: {
    borderRadius: 16,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,        
    borderColor: "#000",   
    // elevation: 1,       
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  subLabel: {
    fontSize: 13,
    color: "#888",
  },
  value: {
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 2,
  },
  moduleRow: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#eee",
    paddingVertical: 8,
  },
  moduleText: {
    fontSize: 15,
    color: "#222",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  chartCard: {
    borderRadius: 18,
    padding: 16,
    marginBottom: 18,
    marginTop: 4,
    alignItems: "center",
    alignSelf: "center",
  },
  cardLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    textAlign: "center",
  },
})