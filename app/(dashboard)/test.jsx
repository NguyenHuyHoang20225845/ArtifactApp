import { StyleSheet, View, Dimensions } from 'react-native'
import { ProgressChart } from 'react-native-chart-kit'

import Spacer from "../../components/Spacer"
import ThemedText from "../../components/ThemedText"
import ThemedView from "../../components/ThemedView"
import ThemedCard from "../../components/ThemedCard"
import dashboard from '../../assets/data/mock.dashboard.json'



const screenWidth = Dimensions.get('window').width

const today = "2025-05-21" // hoặc: new Date().toISOString().slice(0, 10)
const todayRuns = dashboard.testRuns.filter(r => r.date === today)
const testCasesToday = todayRuns.reduce((sum, r) => sum + r.cases.length, 0)
const pass = todayRuns.reduce((sum, r) => sum + r.cases.filter(c => c.status === "pass").length, 0)
const fail = todayRuns.reduce((sum, r) => sum + r.cases.filter(c => c.status === "fail").length, 0)
const total = pass + fail
const passRate = total ? Math.round((pass / total) * 100) : 0
const failRate = total ? 100 - passRate : 0

// Lấy commit chưa peer review từ tất cả artifacts
const notReviewed = dashboard.artifacts
  .flatMap(a => a.commits)
  .filter(c => c.peerReviewed === false)
  .map(c => c.message)
const Test = () => {
  return (
    <ThemedView style={styles.container} safe>
      <Spacer />
      <ThemedText title={true} style={styles.heading}>
        Testing Metrics
      </ThemedText>

      <ThemedCard style={styles.card}>
  <ThemedText style={styles.label}>Test cases run today: {testCasesToday}</ThemedText>
</ThemedCard>

<ThemedCard style={styles.card}>
  <ThemedText style={styles.label}>Pass/fail rate</ThemedText>
  <View style={styles.row}>
    <View style={{ flex: 1 }}>
      <ThemedText style={styles.pass}>● Pass</ThemedText>
      <View style={styles.barBg}>
        <View style={[styles.bar, { width: `${passRate}%`, backgroundColor: "#4ade80" }]} />
      </View>
      <ThemedText style={styles.fail}>● Fail</ThemedText>
      <View style={styles.barBg}>
        <View style={[styles.bar, { width: `${failRate}%`, backgroundColor: "#f87171" }]} />
      </View>
    </View>
    <View style={styles.percentBox}>
      <ThemedText style={styles.percent}>{passRate}%</ThemedText>
      <ThemedText style={styles.percentLabel}>Branch</ThemedText>
    </View>
  </View>
</ThemedCard>

<ThemedCard style={styles.card}>
  <ThemedText style={styles.label}>Commits not peer-reviewed</ThemedText>
  {notReviewed.map(item => (
    <View key={item} style={styles.bulletRow}>
      <ThemedText style={styles.bullet}>•</ThemedText>
      <ThemedText style={styles.bulletText}>{item}</ThemedText>
    </View>
  ))}
</ThemedCard>
    </ThemedView>
  )
}

export default Test

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
    borderRadius: 24, // Tăng giá trị này để góc card tròn hơn
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,        
    borderColor: "#000",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  pass: {
    color: "#22c55e",
    fontWeight: "500",
    marginBottom: 2,
  },
  fail: {
    color: "#ef4444",
    fontWeight: "500",
    marginTop: 8,
    marginBottom: 2,
  },
  barBg: {
    height: 8,
    backgroundColor: "#e5e7eb",
    borderRadius: 4,
    marginBottom: 2,
    marginTop: 2,
    width: "90%",
  },
  bar: {
    height: 8,
    borderRadius: 4,
  },
  percentBox: {
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 16,
  },
  percent: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#2563eb",
  },
  percentLabel: {
    fontSize: 14,
    color: "#888",
    marginTop: -4,
  },
  bulletRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 4,
  },
  bullet: {
    fontSize: 18,
    marginRight: 8,
    lineHeight: 22,
  },
  bulletText: {
    fontSize: 15,
    flex: 1,
    lineHeight: 22,
  },
})